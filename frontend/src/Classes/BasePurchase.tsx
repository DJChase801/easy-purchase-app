import { types } from 'mobx-state-tree';

const { model, optional, string, number, boolean } = types;

const BasePurchaseModel = model('BasePurchaseModel', {
    member: optional(string, ''),
    amount: optional(number, 0),
    processed: optional(boolean, false)
})
.views((self) => ({
    get key() {
        return self.member;
    }
}))
.volatile(() => ({}))
.actions((self) => ({}));

export default BasePurchaseModel;
