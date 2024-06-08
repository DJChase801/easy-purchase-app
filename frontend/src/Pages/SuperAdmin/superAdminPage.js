import React from 'react';
import SuperAdminPageModel from './superAdminPage.model';
import { ModelConnector } from '../../Stores/index';
import { Input } from 'antd';
import { observer } from 'mobx-react';


const SuperAdminPage = observer(({ model }) => {
    return (
        <div>
            {model.programs.map((program, index) => {
                return (
                    <div style={{ border: '1px black solid', padding: '10px 100px' }} key={index}>
                        <Input
                            size="large"
                            value={program.program_id}
                        />
                        <Input
                            size="large"
                            value={program.name}
                        />
                        <Input
                            size="large"
                            value={program.email}
                        />
                        <Input
                            size="large"
                            value={program.password}
                        />
                    </div>
                )
            })}
            <div style={{ border: '1px black solid', padding: '10px 100px' }}>

                <div>Name</div>
                <Input
                    size="large"
                    value={model.newName}
                    onChange={(e) => model.setNewName(e.target.value)} 
                />
                <div>email</div>
                <Input
                    size="large"
                    value={model.newEmail}
                    onChange={(e) => model.setNewEmail(e.target.value)}
                />
                <div>password</div>
                <Input
                    size="large"
                    value={model.newPassword}
                    onChange={(e) => model.setNewPassword(e.target.value)}
                />
                <button className='stage-button' onClick={model.AddProgram}>
                    Add Program
                </button>
            </div>
        </div>
    )
});

export default ModelConnector(SuperAdminPage, { model: SuperAdminPageModel });
