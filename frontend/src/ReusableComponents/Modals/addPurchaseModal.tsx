import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Select, DatePicker, Checkbox } from "antd";
import Purchase from "../../Classes/Purchase";

const AddPurchaseModal = ({ model }: any) => {
    const [newPurchase, setNewPurchase] = useState(Purchase.create({ member_id: '', product_id: '', purchase_date: undefined, processed: false }));
    const filterOption = (input: string, option: any) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Modal
            title={
                <div className="title">
                    <span className="fancy">Add</span> New Purchase
                </div>
            }
            onCancel={() => model.setShowAddPurchaseModal(false)}
            open={model.showAddPurchaseModal}
            closable={false}
            destroyOnClose={true}
            afterClose={() => setNewPurchase(Purchase.create({ member_id: '', product_id: '', purchase_date: undefined, processed: false }))}
            footer={null}
            data-testid="add-purchase-modal"
        >
            <div className="modal-label">Select Member</div>
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
            <div className="modal-label">Select Product</div>
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
                options={model.products.map((product: any) => ({ label: `${product.name}:$${product.price.toFixed(2)}`, value: product.product_id }))
                    .sort((a: any, b: any) => a.label.localeCompare(b.label))
                }
            />
            <div className="modal-label">Purchase Date</div>
            <DatePicker
                size="large"
                className='input'
                showTime
                onChange={(date, dateString) => {
                    setNewPurchase({ ...newPurchase, purchase_date: dateString.toString() })
                }}
            />
            <div className="modal-label">Processed Already?</div>
            <Checkbox
                onChange={(e) => { setNewPurchase({ ...newPurchase, processed: e.target.checked }) }}
                checked={newPurchase.processed}
                style={{ marginBottom: '50px', paddingLeft: '20px' }}
            >
                Yes Processed Already
            </Checkbox>
            <div key="buttons" className='checkout-buttons'>
                <button className='stage-button cancel' key="back" onClick={() => model.setShowAddPurchaseModal(false)} data-testid="cancel-button">
                    Cancel
                </button>
                <button className='stage-button' key="submit" onClick={() => model.addPurchase(newPurchase)} data-testid="add-button">
                    Add
                </button>
            </div>
        </Modal>
    );
};

export default observer(AddPurchaseModal);
