import React from "react";
import { observer } from "mobx-react";
import { Modal } from "antd";


const ConfirmModal = ({ model }: any) => {
    return (
        <Modal
            onCancel={() => model.setShowConfirmDeleteModal(false)}
            open={model.showConfirmDeleteModal}
            destroyOnClose={true}
            closable={false}
            style={{ top: '30%', zIndex: 1000}}
            footer={[
                <div key="buttons" className='checkout-buttons'>
                    <button className='stage-button cancel' key="back" onClick={() => model.setShowConfirmDeleteModal(false)}>
                        Nope
                    </button>
                    <button className='stage-button' key="submit" onClick={() => model.confirmDelete(model.deletingId)}>
                        Yes
                    </button>
                </div>
            ]}
        >
            <div className="modal-label">Are you sure you want to do this?</div>
            <div>All associated data will be deleted as well it is highly recommended that you process all purchases before deleting data.</div>
            <br />
        </Modal>
    );
};

export default observer(ConfirmModal);