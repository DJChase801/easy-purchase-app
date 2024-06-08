import { types, flow, getEnv } from 'mobx-state-tree';
import { rootStore } from '../../Stores/index';
import Member from '../../Classes/Member';
import Product from '../../Classes/Product';
import Purchase from '../../Classes/Purchase';
import Purchases from '../../Classes/Purchases';
import axios from 'axios';
import { message, } from 'antd';
import _cloneDeep from 'lodash/cloneDeep';

const API_URL = 'https://easy-purchase-app-1038835ee929.herokuapp.com/api';
const { model, array, optional, string, boolean, number, maybeNull } = types;

const AdminPageModel = model('AdminPageModel', {
    deletingId: maybeNull(number),
    showConfirmDeleteModal: optional(boolean, false),
    members: array(Member, []),
    memberSearchValue: optional(string, ''),
    showAddMemberModal: optional(boolean, false),
    showEditMemberModal: optional(boolean, false),
    products: array(Product, []),
    showAddProductModal: optional(boolean, false),
    showEditProductModal: optional(boolean, false),
    purchases: array(Purchases, []),
    purchase: array(Purchase, []),
    queryStartDate: optional(string, ''),
    queryEndDate: optional(string, ''),
    groupByMembers: optional(boolean, false),
    showAddPurchaseModal: optional(boolean, false),
    showEditPurchaseModal: optional(boolean, false),
})
    .volatile((self) => ({
        memberToEdit: null,
        productToEdit: null,
        purchaseToEdit: null,
        deleteAction: '',
    }))
    .views((self) => ({
        get appStore() {
            return getEnv(self).appStore;
        },
        get programId() {
            return self.appStore.programId || sessionStorage.getItem('programId');
        },
        get viewMembers() {
            return self.members
                .filter((member) => {
                    return member.fullName.toLowerCase().includes(self.memberSearchValue.toLowerCase())
                })
                .map((member) => ({ ...member, key: member.member_id }))
                .sort((a, b) => a.first_name.localeCompare(b.first_name));
        },
        get viewPurchaseRecords() {
            if (self.groupByMembers) {
                if (self.purchases.length > 0) {
                    return self.purchases;
                } else {
                    return [];
                }
            } else {
                if (self.purchase.length > 0) {
                    return self.purchase;
                } else {
                    return [];
                }
            }
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
        normalizeProduct(product) {
            return {
                product_id: product.product_id,
                name: self.capAndTrim(product.name),
                price: product.price,
                image: product.image.trim(),
            }
        }
    }))
    .actions((self) => ({
        afterCreate() {
            if (!self.programId) {
                window.location.href = '/';
                return;
            }
            self.getMembers()
            self.getProducts()
            self.getPurchases()
        },
        setShowConfirmDeleteModal(value, action) {
            self.showConfirmDeleteModal = value;
        },
        confirmDelete: flow(function* confirmDelete(id) {
            switch (self.deleteAction) {
                case 'member':
                    yield self.confirmDeleteMember(id);
                    break;
                case 'product':
                    yield self.confirmDeleteProduct(id);
                    break;
                case 'purchase':
                    yield self.confirmDeletePurchase(id);
                    break;
                default:
                    break;
            }
        }),
        // members ************************
        setMemberSearchValue(value) {
            self.memberSearchValue = value;
        },
        setShowAddMemberModal(value) {
            self.showAddMemberModal = value;
        },
        setShowEditMemberModal(value) {
            self.showEditMemberModal = value;
        },
        editMember(member) {
            self.memberToEdit = member;
            self.showEditMemberModal = true;
        },
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
            } catch (e) {
                message.error('Error adding member');
            }
        }),
        updateMember: flow(function* updateMember(memberNotNormalized) {
            try {
                const member = self.normalizedMember(memberNotNormalized);
                if (member !== self.memberToEdit) {
                    if (!member?.first_name || !member?.last_name || !member?.email) {
                        message.error('Please fill out all required fields');
                        return;
                    }
                    const existingMember = self.members.find(m => m.email === member.email && m.member_id !== self.memberToEdit.member_id);
                    if (existingMember) {
                        message.error('Member already exists with that email');
                        return;
                    }
                    // update member
                    const { data } = yield axios.put(`${API_URL}/program/${self.programId}/members/${self.memberToEdit.member_id}?program_id=${self.programId}`, member);
                    const savedMember = data.member;
                    // replace member in members array with updated member
                    const index = self.members.findIndex(m => m.member_id === savedMember.member_id);
                    self.members[index] = savedMember;
                } else {
                }
                self.showEditMemberModal = false;
            } catch (e) {
                message.error('Error updating member');
            }
        }),
        deleteMember(memberId) {
            self.deletingId = memberId;
            self.deleteAction = 'member';
            self.showConfirmDeleteModal = true;
        },
        confirmDeleteMember: flow(function* confirmDeleteMember(id) {
            try {
                // delete member
                yield axios.delete(`${API_URL}/program/${self.programId}/members/${id}?program_id=${self.programId}`);
                // remove member from members array
                self.members = self.members.filter(member => member.member_id !== id);
                self.showConfirmDeleteModal = false;
                self.showEditMemberModal = false;
                message.success('Member deleted');
            } catch (e) {
                message.error('Error deleting member');
            }
        }),
        // products ************************
        setShowAddProductModal(value) {
            self.showAddProductModal = value;
        },
        setShowEditProductModal(value) {
            self.showEditProductModal = value;
        },
        editProduct(product) {
            self.productToEdit = product;
            self.showEditProductModal = true;
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
        addProduct: flow(function* addProduct(productNotNormalized) {
            const product = self.normalizeProduct(productNotNormalized);
            try {
                if (!product?.name || !product?.price === null) {
                    message.error('Please fill out all required fields');
                    return;
                }
                const existingProduct = self.products.find(p => p.name === product.name);
                if (existingProduct) {
                    message.error('Product already exists with that name');
                    return;
                }
                const { data } = yield axios.post(`${API_URL}/program/${self.programId}/products?program_id=${self.programId}`, product);
                const newId = data.product_id;
                self.products.push(Product.create({ ...product, product_id: newId }));
                self.showAddProductModal = false;
            } catch (e) {
                message.error('Error adding product');
            }
        }),
        updateProduct: flow(function* updateProduct(productNotNormalized) {
            const product = self.normalizeProduct(productNotNormalized);
            try {
                if (product !== self.productToEdit) {
                    if (!product?.name || product?.price === null) {
                        message.error('Please fill out all required fields');
                        return;
                    }
                    const existingProduct = self.products.find(p => p.name === product.name && p.product_id !== self.productToEdit.product_id);
                    if (existingProduct) {
                        message.error('Product already exists with that name');
                        return;
                    }
                    // update product
                    const { data } = yield axios.put(`${API_URL}/program/${self.programId}/products/${self.productToEdit.product_id}?program_id=${self.programId}`, product);
                    const savedProduct = data.product;
                    // replace product in products array with updated product
                    const index = self.products.findIndex(p => p.product_id === savedProduct.product_id);
                    self.products[index] = savedProduct;
                }
                self.showEditProductModal = false;
            } catch (e) {
                message.error('Error updating product');
            }
        }),
        deleteProduct(productId) {
            // confirm delete
            self.deletingId = productId;
            self.deleteAction = 'product';
            self.showConfirmDeleteModal = true;
        },
        confirmDeleteProduct: flow(function* confirmDeleteProduct(id) {
            try {
                // delete product
                yield axios.delete(`${API_URL}/program/${self.programId}/products/${id}?program_id=${self.programId}`);
                // remove product from products array
                self.showEditProductModal = false;
                self.showConfirmDeleteModal = false;
                self.products = self.products.filter(product => product.product_id !== id);
                message.success('Product deleted');
            } catch (e) {
                console.log('e: ', e);
                message.error('Error deleting product');
            }
        }),

        // purchases ************************
        setShowAddPurchaseModal(value) {
            self.showAddPurchaseModal = value;
        },
        setShowEditPurchaseModal(value) {
            if (!value) {
                self.purchaseToEdit = null;
            }
            self.showEditPurchaseModal = value;
        },
        editPurchase(purchase) {
            self.purchaseToEdit = purchase;
            self.showEditPurchaseModal = true;
        },
        setQueryStartDate(value) {
            if (!value) {
                self.queryStartDate = '';
                return;
            }
            const utcDate = `${new Date(value).toISOString().split('T')[0]} ${new Date(value).toISOString().split('T')[1].substring(0, 8)}`;
            self.queryStartDate = utcDate;
        },
        setQueryEndDate(value) {
            if (!value) {
                self.queryEndDate = '';
                self.getPurchases();
                return;
            }
            const utcDate = `${new Date(value).toISOString().split('T')[0]} ${new Date(value).toISOString().split('T')[1].substring(0, 8)}`;
            self.queryEndDate = utcDate;
            self.getPurchases();
        },
        setGroupByMembers(value) {
            self.groupByMembers = value;
            self.getPurchases();
        },
        getPurchases: flow(function* getPurchases() {
            try {
                self.purchases = [];
                self.purchase = [];
                const { data } = yield axios
                    .get(`${API_URL}/program/${self.programId}/purchases?program_id=${self.programId}&start_date=${self.queryStartDate}&end_date=${self.queryEndDate}&group_by_members=${self.groupByMembers}`);
                if (!data.purchases) {
                    message.warning('No purchases found');
                } else {
                    self.purchases = data.purchases.map(purchase => Purchases.create({
                        purchase_ids: purchase.purchase_ids,
                        member: purchase.member,
                        products: purchase.products,
                        amount: purchase.amount,
                        processed: false,
                    }));
                    self.purchase = data.purchase.map(purchase => Purchase.create({
                        purchase_id: purchase.purchase_id,
                        product_id: purchase.product_id,
                        member_id: purchase.member_id,
                        member: purchase.member,
                        product: purchase.product,
                        purchase_date: new Date(purchase.purchase_date + ' UTC').toLocaleString(), // /adjust for utc
                        amount: purchase.amount,
                        processed: purchase.processed === 0 ? false : true,
                    }));
                }
            } catch (e) {
                message.error('Error fetching purchases');
            }
        }),
        addPurchase: flow(function* addPurchase(purchase) {
            if (!purchase.member_id || !purchase.product_id || !purchase.purchase_date) {
                message.error('Please fill out all required fields');
                return;
            }
            try {
                const memberId = purchase.member_id;
                const addPurchase = {
                    product_id: purchase.product_id,
                    created_at: new Date(purchase.purchase_date).toISOString().split('T')[0] + ' ' + new Date(purchase.purchase_date).toISOString().split('T')[1].substring(0, 8),
                    processed: purchase.processed ? 1 : 0,
                };
                yield axios.post(`${API_URL}/program/${self.programId}/purchases/config?program_id=${self.programId}`, { memberId, addPurchase });
                message.success('Added Purchase');
                self.setQueryStartDate('');
                self.groupByMembers = false;
                self.setQueryEndDate('');
                self.showAddPurchaseModal = false;
            } catch (e) {
                message.error('Error processing purchase');
            }
        }),
        editPurchaseRecord: flow(function* editPurchaseRecord(purchase) {
            if (!purchase.member_id || !purchase.product_id || !purchase.purchase_date) {
                message.error('Please fill out all required fields');
                return;
            }
            try {
                const editPurchase = {
                    member_id: purchase.member_id,
                    product_id: purchase.product_id,
                    created_at: new Date(purchase.purchase_date).toISOString().split('T')[0] + ' ' + new Date(purchase.purchase_date).toISOString().split('T')[1].substring(0, 8),
                    processed: purchase.processed ? 1 : 0,
                };
                yield axios.put(`${API_URL}/program/${self.programId}/purchases/${purchase.purchase_id}?program_id=${self.programId}`, { editPurchase });
                message.success('Edited Purchase');
                self.setQueryStartDate('');
                self.groupByMembers = false;
                self.setQueryEndDate(''); // reset query results
                self.showEditPurchaseModal = false;
            } catch (e) {
                message.error('Error processing purchase');
            }
        }),
        markProcessed: flow(function* markProcessed(ids, value) {
            let purchaseIds = [];
            if (!ids) { // mark all as processed
                self.purchase.forEach(purchase => {
                    if (purchase.processed === false) {
                        purchaseIds.push(purchase.purchase_id);
                    }
                });
            } else {
                purchaseIds = ids;
            }
            try {
                yield axios.put(`${API_URL}/program/${self.programId}/purchases?program_id=${self.programId}`, { purchaseIds, value });
            } catch (e) {
                message.error('Error processing purchase');
            }
        }),
        processPurchases(value) {
            const ids = self.purchase.map(purchase => purchase.purchase_id);
            self.markProcessed(ids, value);
            self.purchase = _cloneDeep(self.purchase.map(purchase => {
                purchase.processed = value;
                return purchase;
            }));
            self.purchases = _cloneDeep(self.purchases.map(purchase => {
                purchase.processed = value;
                return purchase;
            }));
        },
        setPurchaseRecordProcessed(record) {
            self.purchase = _cloneDeep(self.purchase.map(purchase => {
                if (purchase.purchase_id === record.purchase_id) {
                    purchase.processed = !purchase.processed;
                }
                return purchase;
            }));
        },
        setPurchasesRecordProcessed(record) {
            self.purchases = _cloneDeep(self.purchases.map(purchase => {
                if (purchase.member === record.member) {
                    purchase.processed = !purchase.processed;
                }
                return purchase;
            }));
        }
    }));


const thisModel = {
    model: AdminPageModel,
    stores: {
        appStore: rootStore.AppStore,
    }
};
export default thisModel;
