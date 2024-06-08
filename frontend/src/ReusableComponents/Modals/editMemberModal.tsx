import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Modal, Input } from "antd";
import IMember from "../../Classes/Member";

const EditMemberModal = ({ model }: any) => {
    const [existingMember, setExistingMember] = useState(IMember.create({ first_name: '', last_name: '', email: '', phone: '' }));

    useEffect(() => {
        if (model.memberToEdit) {
            setExistingMember(model.memberToEdit);
        }
    }, [model.memberToEdit]);

    return (
        <Modal
            title={
                <div className="title">
                    <span className="fancy">Edit</span> Member
                </div>
            }
            onCancel={() => model.setShowEditMemberModal(false)}
            open={model.showEditMemberModal}
            destroyOnClose={true}
            closable={false}
            footer={[
                <div key="buttons" className='checkout-buttons'>
                    <button className='stage-button cancel' key="back" onClick={() => model.setShowEditMemberModal(false)}>
                        Cancel
                    </button>
                    <button className='stage-button cancel' key="delete" onClick={() => model.deleteMember(existingMember.member_id)}>
                        Delete Member
                    </button>
                    <button className='stage-button' key="submit" onClick={() => model.updateMember(existingMember)}>
                        Accept
                    </button>
                </div>
            ]}
        >
            <div className="modal-label">First Name</div>
            <Input
                size="large"
                placeholder="First Name"
                value={existingMember.first_name}
                onChange={(e) => { setExistingMember({ ...existingMember, first_name: e.target.value }) }}
            />
            <div className="modal-label">Last Name</div>
            <Input
                size="large"
                placeholder="Last Name"
                value={existingMember.last_name}
                onChange={(e) => { setExistingMember({ ...existingMember, last_name: e.target.value }) }}
            />
            <div className="modal-label">Email</div>
            <Input
                size="large"
                placeholder="Email"
                value={existingMember.email}
                onChange={(e) => { setExistingMember({ ...existingMember, email: e.target.value }) }}
            />
            <div className="modal-label">Phone</div>
            <Input
                size="large"
                style={{ marginBottom: '50px' }}
                placeholder="Phone Number..."
                value={existingMember.phone}
                onChange={(e) => { setExistingMember({ ...existingMember, phone: e.target.value }) }}
            />
            
        </Modal>
    );
};

export default observer(EditMemberModal);