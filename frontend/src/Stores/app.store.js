import { types } from 'mobx-state-tree';

const { maybeNull, model, string } = types;

// Model
export const AppStoreModel = model('AppStoreModel', {
	programNumber: maybeNull(string),
})
	.views((self) => ({
		get programId() {
			return self.programNumber || sessionStorage.getItem('programId');
		}
	}))
	.actions((self) => ({
		setProgramId(programId) {
			self.programNumber = String(programId);
		},
	}));
