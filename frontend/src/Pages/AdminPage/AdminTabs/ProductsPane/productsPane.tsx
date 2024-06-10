import React from 'react';
import ProductWindow from '../../../../ReusableComponents/ProductWindow/productWindow';
import ConfirmModal from '../../../../ReusableComponents/Modals/confirmModal';
import AddProductModal from '../../../../ReusableComponents/Modals/addProductModal';
import EditProductModal from '../../../../ReusableComponents/Modals/editProductModal';
import { observer } from 'mobx-react';

const ProductsPane = ({ model }: any) => {
  return (
    <>
      <div className='left-pane'>
        <ProductWindow
          action={model.editProduct}
          products={model.products}
          showSearch={true}
          btnText={'Edit'}
        />
      </div>
      <div className='right-pane products-pane'>
        <button onClick={() => model.setShowAddProductModal(true)} className='action-button'>+ Add New Product</button>
        {/* <button onClick={() => console.log('need to implement')} className='action-button'>Import Products</button> */}
      </div>
      <AddProductModal model={model} />
      <EditProductModal model={model} />
    </>
  );
};

export default observer(ProductsPane);
