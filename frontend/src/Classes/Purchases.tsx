import { types } from 'mobx-state-tree';
import BasePurchaseModel from './BasePurchase'; // Adjust the import path as necessary

const { optional, string } = types;

const PurchasesModel = BasePurchaseModel.named('PurchaseModel1').props({
    purchase_ids: optional(string, ''),
    products: optional(string, '')
})
.views((self) => ({
    get key() {
        return self.member;
    },
    get productsNice() {
        return self.products.split(',').join(', ');
    }
}))
.volatile(() => ({}))
.actions(() => ({}));

export default PurchasesModel;
