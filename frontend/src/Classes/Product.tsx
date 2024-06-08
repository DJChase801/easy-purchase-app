import { types } from 'mobx-state-tree';

const { model, optional, string, number, maybeNull } = types;

const ProductModel = model('ProductModel', {
    product_id: maybeNull(number),
	name: string,
    price: number,
    image: optional(string, ''),
})
	.views((self) => ({
	}))
	.volatile(() => ({
	}))
	.actions((self) => ({
	}));

export default ProductModel;
