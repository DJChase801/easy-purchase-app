import React, { useState } from 'react';
import { observer } from 'mobx-react';
import ProductTile from '../ProductTile/productTile';

const ProductWindow = ({ action, products, showSearch, btnText }) => {
    const [availableProducts, setAvailableProducts] = useState(products);

    const onChange = (value) => {
        if (!value) {
            setAvailableProducts(products);
            return;
        }
        setAvailableProducts(products.filter(product => product.name.toLowerCase().includes(value.toLowerCase())));
    };
    return (
        <div>
            {showSearch &&
                <>
                    <div className='input-label'>Search Products</div>
                    <input
                        id="search-input" 
                        className='search-input' 
                        placeholder="Search Products..."
                        onChange={(e) => onChange(e.target.value)}
                    />
                </>
            }
            {btnText === 'Add' && <div className='input-label'>Available Products:</div>}
            {btnText === 'Remove' && <div className='input-label'>Your Cart:</div>}
            <div className={`products-view ${(btnText === 'Add' || btnText === 'Edit') ? 'all' : ''}`}>
                <div className='scroll-content'>
                    {availableProducts.map((product) => (
                        <ProductTile  key={(Math.random() * 1000).toString()} action={action} product={product} btnText={btnText} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default observer(ProductWindow);