// models/HomePageModel.ts
import { types, flow, getEnv } from 'mobx-state-tree';
import Product from '../../Classes/Product';
import Member from '../../Classes/Member';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import { message } from 'antd';
import { rootStore } from '../../Stores/index';
const { model, optional, array, boolean, number, maybeNull } = types;
const API_URL = 'https://easy-purchase-app-ea08da4264c2.herokuapp.com/api';


const HomePageModel = model('HomePageModel', {
  products: array(Product, []),
  cartProducts: array(Product, []),
  showAddMemberModal: optional(boolean, false),
  selectedMemberId: maybeNull(number),
  members: array(Member, []),
})
  .views(self => ({
    get selectedMember() {
      return self.members.find(member => member.member_id === self.selectedMemberId);
    },
    get cartTotal() {
      return self.cartProducts.reduce((acc, product) => acc + product.price, 0);
    },
    get appStore() {
      return getEnv(self).appStore;
    },
    get programId() {
      return self.appStore.programId || sessionStorage.getItem('programId');
    },
    capAndTrim(value) {
      return value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
    },
    normalizedMember(member) {
      const first_name = self.capAndTrim(member.first_name);
      const last_name = self.capAndTrim(member.last_name);
      return {
        member_id: member.member_id,
        first_name: first_name,
        last_name: last_name,
        email: member.email.trim(),
        phone: member.phone.trim(),
      }
    },
  }))
  .actions(self => ({
    afterCreate() {
      if (!self.programId) {
        window.location.href = '/';
        return;
      }
      self.fetchProductsMembers();
    },
    fetchProductsMembers() {
      self.getProducts();
      self.getMembers();
    },
    memberSelect(memberId) {
      self.selectedMemberId = memberId;
    },
    addToCart(product) {
      self.cartProducts.push(cloneDeep(product));
    },
    removeFromCart(product) {
      self.cartProducts.remove(product);
    },
    cancelPurchase() {
      self.cartProducts = [];
      self.selectedMemberId = null;
    },
    setShowAddMemberModal(value) {
      self.showAddMemberModal = value;
    },
    getProducts: flow(function* getProducts() {
      try {
        const { data } = yield axios.get(`${API_URL}/program/${self.programId}/products?program_id=${self.programId}`);
        if (!data.products) {
          message.error('Error fetching products');
        } else {
          self.products = data.products.map(product => Product.create({ name: product.name, price: product.price, product_id: product.product_id, image: product.image || '' }));
        }
      } catch (e) {
        message.error('Error fetching products');
      }
    }),
    getMembers: flow(function* getMembers() {
      try {
        const { data } = yield axios.get(`${API_URL}/program/${self.programId}/members?program_id=${self.programId}`);
        if (!data.members) {
          message.error('Error fetching members');
        } else {
          self.members = data.members.map(member => Member.create(member));
        }
      } catch (e) {
        message.error('Error fetching members');
      }
    }),
    addMember: flow(function* addMember(memberNotNormalized) {
      try {
        const member = self.normalizedMember(memberNotNormalized);
        if (!member?.first_name || !member?.last_name || !member?.email) {
          message.error('Please fill out all required fields');
          return;
        }
        const existingMember = self.members.find(m => m.email === member.email);
        if (existingMember) {
          message.error('Member already exists with that email');
          return;
        }
        const { data } = yield axios.post(`${API_URL}/program/${self.programId}/members?program_id=${self.programId}`, member);
        const newId = data.member_id;
        self.members.push(Member.create({ ...member, member_id: newId }));
        self.showAddMemberModal = false;
        message.success('Member added to the dropdown');
      } catch (e) {
        message.error('Error adding member');
      }
    }),
    processPurchase() {
      if (!self.selectedMemberId) {
        message.error('Please select a member');
        return;
      }
      if (!self.cartProducts.length) {
        message.error('Please add products to the cart');
        return;
      }
      self.finalizeOrder();
    },
    finalizeOrder: flow(function* finalizeOrder() {
      try {
        const memberId = self.selectedMemberId;
        const productIds = self.cartProducts.map(product => product.product_id);
        const { data } = yield axios.post(`${API_URL}/program/${self.programId}/purchases?program_id=${self.programId}`, { memberId, productIds });
        if (data.success) {
          message.success('Purchase processed, Thank you!');
          self.cartProducts = [];
        } else {
          message.error('Error processing purchase');
        }
      } catch (e) {
        message.error('Error processing purchase');
      }
    }),
  }));

const thisModel = {
  model: HomePageModel,
  stores: {
    appStore: rootStore.AppStore,
  }
};
export default thisModel;