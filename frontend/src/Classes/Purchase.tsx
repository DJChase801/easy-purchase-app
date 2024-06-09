import { types } from 'mobx-state-tree';
import BasePurchaseModel from './BasePurchase'; // Adjust the import path as necessary

const { optional, string, number } = types;

const PurchaseModel = BasePurchaseModel.named('PurchaseModel').props({
    purchase_id: optional(string, ''),
    product: optional(string, ''),
    purchase_date: optional(string, ''),
    member_id: optional(string, ''),
    product_id: optional(string, '')
})
.views((self) => ({
    get key() {
        return self.purchase_id;
    }
}))
.volatile(() => ({}))
.actions((self) => ({}));

export default PurchaseModel;
