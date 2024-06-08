// models/TopBarModel.ts
import { types, getEnv } from 'mobx-state-tree';
import { rootStore } from '../../Stores/index';
const { model } = types;


const TopBarModel = model('TopBarModel', {
})
    .views(self => ({
        get appStore() {
            return getEnv(self).appStore;
        },
    }))
    .actions(self => ({
        navigateToPage(page, navigate) {
            if (page === '') {
                self.appStore.setProgramId(null);
                sessionStorage.setItem('programId', '');
                window.location.href = '/';
            } else {
                navigate(`/${page}/${self.appStore.programId}`);
            }
        },
    }));

const thisModel = {
    model: TopBarModel,
    stores: {
        appStore: rootStore.AppStore,
    }
};
export default thisModel;