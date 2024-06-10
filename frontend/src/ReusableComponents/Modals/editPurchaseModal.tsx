import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Modal, Select, DatePicker, Checkbox } from "antd";
import Purchase from "../../Classes/Purchase";
import dayjs from 'dayjs';


const EditPurchaseModal = ({ model }: any) => {
    const [newPurchase, setNewPurchase] = useState(Purchase.create({ member_id: '', product_id: '', purchase_date: '', processed: false }));
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const dateFromString = (dateString: string) => {
        if (!dateString) return undefined;
        const newDate = new Date(dateString);
        return dayjs(newDate);
    }
    useEffect(() => {
        if (model.purchaseToEdit) {
            setNewPurchase(model.purchaseToEdit);
        }
    }, [model.purchaseToEdit]);
    return (
        <Modal
            title={
                <div className="title">
                    <span className="fancy">Edit</span> Purchase
                </div>
            }
            onCancel={() => model.setShowEditPurchaseModal(false)}
            open={model.showEditPurchaseModal}
            destroyOnClose={true}
            closable={false}
            afterClose={() => setNewPurchase(Purchase.create({ member_id: '', product_id: '', purchase_date: '', processed: false }))}
            footer={[]}
        >
            <div className="modal-label">Select Member <span style={{ color: 'red'}}>*</span></div>
            <Select
                id='member-input'
                className='input'
                placeholder="Search Members..."
                onChange={(value) => { setNewPurchase({ ...newPurchase, member_id: value }) }}
                value={newPurchase.member_id || undefined}
                optionFilterProp='children'
                variant='borderless'
                size='large'
                showSearch
                allowClear
                filterOption={filterOption}
                options={model.members.map((member: any) => ({ label: member.fullName, value: member.member_id }))
                    .sort((a: any, b: any) => a.label.localeCompare(b.label))
                }
            />
            <div className="modal-label">Select Product <span style={{ color: 'red'}}>*</span></div>
            <Select
                id='product-input'
                className='input'
                placeholder="Search Products..."
                onChange={(value) => { setNewPurchase({ ...newPurchase, product_id: value }) }}
                value={newPurchase.product_id || undefined}
                optionFilterProp='children'
                variant='borderless'
                size='large'
                showSearch
                allowClear
                filterOption={filterOption}
                options={model.products.map((product: any) => ({ label: product.name + ':$' + product.price.toFixed(2), value: product.product_id }))
                    .sort((a: any, b: any) => a.label.localeCompare(b.label))
                }
            />
            <div className="modal-label">Purchase Date <span style={{ color: 'red'}}>*</span></div>
            <DatePicker
                size="large"
                className='input'
                showTime
                value={dateFromString(newPurchase.purchase_date)}
                onChange={(date, dateString) => {
                    setNewPurchase({ ...newPurchase, purchase_date: dateString.toString() })
                }}
            />
            <div className="modal-label">Processed Already? <span style={{ color: 'red'}}>*</span></div>

            <Checkbox
                onChange={(e) => { setNewPurchase({ ...newPurchase, processed: e.target.checked }) }}
                checked={newPurchase.processed}
                style={{ marginBottom: '20px', paddingLeft: '20px' }}
            >
                Yes Processed Already
            </Checkbox>
            <div><span style={{ color: 'red'}}>*</span>Indicates Required Fields</div>
            <br />
            <div key="buttons" className='checkout-buttons'>
                <button className='stage-button cancel' key="back" onClick={() => model.setShowEditPurchaseModal(false)}>
                    Cancel
                </button>
                <button className='stage-button cancel' key="delete" onClick={() => model.deletePurchase(newPurchase.purchase_id)}>
                    Delete Purchase
                </button>
                <button className='stage-button' key="submit" onClick={() => model.editPurchaseRecord(newPurchase)}>
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default observer(EditPurchaseModal);
