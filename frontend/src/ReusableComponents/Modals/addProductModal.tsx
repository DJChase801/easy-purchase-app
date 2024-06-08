import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Input, InputNumber, InputNumberProps } from "antd";
import Product from "../../Classes/Product";

const AddProductModal = ({ model }: any) => {
    const [newProduct, setNewProduct] = useState(Product.create({ name: '', price: 0 }));
    const changePrice: InputNumberProps['onChange'] = (value) => {
        setNewProduct({ ...newProduct, price: value as number });
    }
    return (
        <Modal
            title={
                <div className="title">
                    <span className="fancy">Add</span> New Product
                </div>
            }
            onCancel={() => model.setShowAddProductModal(false)}
            open={model.showAddProductModal}
            closable={false}
            afterClose={() => setNewProduct(Product.create({ name: '', price: 0 }))}
            footer={null}
            data-testid="add-product-modal"
        >
            <div className="modal-label">Product Name</div>
            <Input
                size="large"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => { setNewProduct({ ...newProduct, name: e.target.value }) }}
            />
            <div className="modal-label">Price</div>
            <InputNumber
                size="large"
                placeholder="Price"
                prefix="$"
                style={{ width: '100%' }}
                value={newProduct.price}
                onChange={changePrice}
            />
            <div className="modal-label">Img URL</div>
            <Input
                size="large"
                style={{ marginBottom: '40px' }}
                placeholder="Image Url..."
                value={newProduct.image}
                onChange={(e) => { setNewProduct({ ...newProduct, image: e.target.value }) }}
            />
            <div style={{ width: '100px', height: '100px' }} >
                <img src={newProduct.image || 'https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png'} alt="Product" style={{ height: '100px' }} />
            </div>
            <br />
            <br />

            <div key="buttons" className='checkout-buttons'>
                <button className='stage-button cancel' key="back" onClick={() => model.setShowAddProductModal(false)} data-testid="cancel-button">
                    Cancel
                </button>
                <button className='stage-button' key="submit" onClick={() => model.addProduct(newProduct)} data-testid="add-button">
                    Add
                </button>
            </div>
        </Modal>
    );
};

export default observer(AddProductModal);
