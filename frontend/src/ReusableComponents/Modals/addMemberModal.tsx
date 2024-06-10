import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Input } from "antd";
import IMember from "../../Classes/Member";

const AddMemberModal = ({ model }: any) => {
    const [newMember, setNewMember] = useState(IMember.create({ first_name: '', last_name: '', email: '', phone: '' }));

    return (
        <Modal
            title={
                <div className="title">
                    <span className="fancy">Add</span> New Member
                </div>
            }
            onCancel={() => model.setShowAddMemberModal(false)}
            open={model.showAddMemberModal}
            closable={false}
            afterClose={() => setNewMember(IMember.create({ first_name: '', last_name: '', email: '', phone: '' }))}
            data-testid="add-member-modal"
            footer={[]}
        >
            <div className="modal-label">First Name <span style={{ color: 'red'}}>*</span></div>
            <Input
                size="large"
                placeholder="First Name"
                value={newMember.first_name}
                onChange={(e) => { setNewMember({ ...newMember, first_name: e.target.value }) }}
            />
            <div className="modal-label">Last Name <span style={{ color: 'red'}}>*</span></div>
            <Input
                size="large"
                placeholder="Last Name"
                value={newMember.last_name}
                onChange={(e) => { setNewMember({ ...newMember, last_name: e.target.value }) }}
            />
            <div className="modal-label">Email <span style={{ color: 'red'}}>*</span></div>
            <Input
                size="large"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) => { setNewMember({ ...newMember, email: e.target.value }) }}
            />
            <div className="modal-label">Phone</div>
            <Input
                size="large"
                style={{ marginBottom: '20px' }}
                placeholder="Phone Number..."
                value={newMember.phone}
                onChange={(e) => { setNewMember({ ...newMember, phone: e.target.value }) }}
            />
            <div><span style={{ color: 'red'}}>*</span>Indicates Required Fields</div>
            <br />
            <div className='checkout-buttons'>
                <button className='stage-button cancel' onClick={() => model.setShowAddMemberModal(false)} data-testid="cancel-button">
                    Cancel
                </button>
                <button className='stage-button' onClick={() => model.addMember(newMember)} data-testid="add-button">
                    Add
                </button>
            </div>
        </Modal>
    );
};

export default observer(AddMemberModal);
