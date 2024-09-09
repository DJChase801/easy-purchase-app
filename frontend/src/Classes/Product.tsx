import { types } from 'mobx-state-tree';

const { model, optional, string, number, maybeNull } = types;

const ProductModel = model('ProductModel', {
    product_id: maybeNull(string),
	name: string,
    price: number,
	image: optional(string, ''),
	img_type: optional(string, ''),
})
	.views((self) => ({
	}))
	.volatile(() => ({
	}))
	.actions((self) => ({
	}));

export default ProductModel;
