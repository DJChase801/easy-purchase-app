// models/SuperAdminPageModel.ts
import axios from 'axios';
import { types, flow, getEnv } from 'mobx-state-tree';
import { rootStore } from '../../Stores/index';
import { message } from 'antd';
const API_URL = 'https://easy-purchase-app-3cc626bc131a.herokuapp.com/api';
// const API_URL = 'http://localhost:5000/api';

const { model, string, optional, array, number } = types;

const SuperAdminPageModel = model('SuperAdminPageModel', {
    newName: optional(string, ''),
    newEmail: optional(string, ''),
    newPassword: optional(string, ''),
})
    .views(self => ({
    }))
    .volatile(self => ({
        programs: []
    }))
    .actions(self => ({
        afterCreate() {
            self.getPrograms();
        },
        setNewName(name) {
            self.newName = name;
        },
        setNewEmail(email) {
            self.newEmail = email;
        },
        setNewPassword(password) {
            self.newPassword = password;
        },
        getPrograms: flow(function* getPrograms() {
            try {
                const { data } = yield axios.get(`${API_URL}/login/super`);
                console.log('data: ', data);
                self.programs = data.programs;

            } catch (error) {
                console.log('error: ', error);
                message.error('Login failed');
            }
        }),
        AddProgram: flow(function* AddProgram() {
            try {
                if (!self.newName || !self.newEmail || !self.newPassword) {
                    message.error('Please fill out all fields');
                    return;
                }
                const { data } = yield axios.post(`${API_URL}/login/super`, {
                    name: self.newName,
                    email: self.newEmail,
                    password: self.newPassword,
                });
                self.programs = data.programs;
                self.newName = '';
                self.newEmail = '';
                self.newPassword = '';

            } catch (error) {
                console.log('error: ', error);
                message.error('Login failed');
            }
        }),
    }));

const thisModel = {
    model: SuperAdminPageModel,
    stores: {
        appStore: rootStore.AppStore,
    }
};
export default thisModel;