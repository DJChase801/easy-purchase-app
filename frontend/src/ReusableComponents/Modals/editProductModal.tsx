import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Modal, Input, InputNumber, InputNumberProps } from "antd";
import Product from "../../Classes/Product";


const EditProductModal = ({ model }: any) => {
    const [newProduct, setNewProduct] = useState(Product.create({ name: '', price: 0 }));
    useEffect(() => {
        if (model.productToEdit) {
            setNewProduct({ name: model.productToEdit.name, price: model.productToEdit.price, image: model.productToEdit.image, product_id: model.productToEdit.product_id, img_type: '', sku: model.productToEdit.sku });
        }
    }, [model.productToEdit]);
    const changePrice: InputNumberProps['onChange'] = (value) => {
        setNewProduct({ ...newProduct, price: value as number });
    }
    return (
        <Modal
            title={
                <div className="title">
                    <span className="fancy">Edit</span> Product
                </div>
            }
            onCancel={() => model.setShowEditProductModal(false)}
            open={model.showEditProductModal}
            closable={false}
            destroyOnClose={true}
            style={{ zIndex: 999 }}
            footer={[
                <div key="buttons" className='checkout-buttons'>
                    <button className='stage-button cancel' key="back" onClick={() => model.setShowEditProductModal(false)}>
                        Cancel
                    </button>
                    <button className='stage-button cancel' key="delete" onClick={() => model.deleteProduct(newProduct.product_id)}>
                        Delete Product
                    </button>
                    <button className='stage-button' key="submit" onClick={() => model.updateProduct(newProduct)}>
                        Update
                    </button>
                </div>
            ]}
        >
            <div className="modal-label">Product Name <span style={{ color: 'red' }}>*</span></div>
            <Input
                size="large"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => { setNewProduct({ ...newProduct, name: e.target.value }) }}
            />
            <div className="modal-label">Price <span style={{ color: 'red' }}>*</span></div>
            <InputNumber
                size="large"
                placeholder="Price"
                prefix="$"
                style={{ width: '100%' }}
                value={newProduct.price}
                onChange={changePrice}
            />
            <div className="modal-label">Product Sku</div>
            <Input
                size="large"
                placeholder="Product Sku"
                value={newProduct.sku || ''}
                onChange={(e) => { setNewProduct({ ...newProduct, sku: e.target.value }) }}
            />
            <br />
            <br />
            <br />
            <input type="file" accept="image/*" onChange={(e) => { model.handleImgSelect(e) }} />
            <br />
            <br />
            <div style={{ width: '100px', height: '100px' }} >
                <img src={model.imgPreview || newProduct.image || 'https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png'} alt="Product" style={{ height: '100px' }} />
            </div>
            <br />
            <div><span style={{ color: 'red' }}>*</span>Indicates Required Fields</div>
            <br />
        </Modal>
    );
};

export default observer(EditProductModal);