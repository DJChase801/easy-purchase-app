// models/LoginModel.ts
import axios from 'axios';
import { types, flow, getEnv } from 'mobx-state-tree';
import { rootStore } from '../../Stores/index';
import { message } from 'antd';
const { model, string, optional } = types;
const API_URL = 'https://easy-purchase-app-1038835ee929.herokuapp.com/api';


const LoginModel = model('LoginModel', {
    userEmail: optional(string, ''),
    password: optional(string, ''),
})
    .views(self => ({
        get appStore() {
            return getEnv(self).appStore;
        },
        openSuperAdmin() {
            window.location.href = '/super-admin';
        },
    }))
    .actions(self => ({
        setUserEmail(username) {
            self.userEmail = username;
        },
        setPassword(password) {
            self.password = password;
        },
        attemptLogin: flow(function* attemptLogin(navigate) {
            try {
                const { data } = yield axios.get(`${API_URL}/login?email=${self.userEmail}&password=${self.password}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const programId = data.program.program_id;
                if (programId) {
                    message.success('Login successful');
                    self.appStore.setProgramId(programId);
                    sessionStorage.setItem('programId', programId);
                    navigate(`/home/${programId}`);
                } else {
                    message.error('Login failed');
                }
            } catch (error) {
                message.error('Login failed');
            }
        }),
    }));

const thisModel = {
    model: LoginModel,
    stores: {
        appStore: rootStore.AppStore,
    }
};
export default thisModel;