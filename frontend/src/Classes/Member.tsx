import { types } from 'mobx-state-tree';

const { model, string, number, maybeNull } = types;

export interface IMember {
    member_id?: string;
    first_name: string;
    last_name: string;
    fullName: string;
    email?: string;
    phone?: string;
    selectOption: { value: string, label: string };
}

const MemberModel = model('MemberModel', {
    member_id: maybeNull(string),
	first_name: string,
	last_name: string,
    email: string,
    phone: string,
})
	.views((self) => ({
        get fullName() {
            return `${self.first_name} ${self.last_name}`;
        },
        get selectOption() {
            return {
                value: self.member_id,
                label: this.fullName,
            };
        }
	}))
	.volatile(() => ({
	}))
	.actions((self) => ({
	}));

export default MemberModel;
