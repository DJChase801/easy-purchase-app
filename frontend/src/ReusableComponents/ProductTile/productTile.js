import React from 'react';
import { observer } from 'mobx-react';

const ProductTile = ({ action, product, btnText }) => (
    <div onClick={() => action(product)} className='product-tile'>
        <button>{btnText}</button>
        <div className='product-details'>
            <div className='big-strong'>{product.name}</div>
            <div>price: ${product.price.toFixed(2)}</div>
        </div>
        <div className='tile-image-container'>
            <img className='tile-image' src={product.image || 'https://static-00.iconduck.com/assets.00/no-image-icon-2048x2048-2t5cx953.png'} alt={product.name} />
        </div>
    </div>
);

export default observer(ProductTile);