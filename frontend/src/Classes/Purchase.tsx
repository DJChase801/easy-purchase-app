import { types } from 'mobx-state-tree';
import BasePurchaseModel from './BasePurchase'; // Adjust the import path as necessary

const { optional, string, number } = types;

const PurchaseModel = BasePurchaseModel.named('PurchaseModel').props({
    purchase_id: optional(number, 0),
    product: optional(string, ''),
    purchase_date: optional(string, ''),
    member_id: optional(number, 0),
    product_id: optional(number, 0)
})
.views((self) => ({
    get key() {
        return self.purchase_id;
    }
}))
.volatile(() => ({}))
.actions((self) => ({}));

export default PurchaseModel;
