const express = require('express');
const { Member, Purchase, Product } = require('../../../models');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const { getPurchasesRecords } = require('../../../services/purchase.service');

// ****************** MEMBERS ************************
// get all members route
router.get('/members', async (req, res) => {
    try {
        const { program_id } = req.query;
        const members = await Member.findAll({
            where: {
                program_id: program_id
            }
        });
        res.status(200).json({ success: true, members: members });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Add new member route
router.post('/members', async (req, res) => {
    try {
        const { program_id } = req.query;
        const member = req.body;

        const newMember = await Member.create({
            program_id: program_id,
            first_name: member.first_name,
            last_name: member.last_name,
            email: member.email,
            phone: member.phone
        });

        res.status(200).json({ success: true, member_id: newMember.member_id });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Update member route
router.put('/members/:member_id', async (req, res) => {
    try {
        const { member_id } = req.params;
        const member = req.body;

        const updatedMember = await Member.update({
            first_name: member.first_name,
            last_name: member.last_name,
            email: member.email,
            phone: member.phone
        }, {
            where: {
                member_id: member_id
            },
            returning: true,
            plain: true
        });

        res.status(200).json({ success: true, member: updatedMember[1] });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Delete member route
router.delete('/members/:member_id', async (req, res) => {
    try {
        const { member_id } = req.params;

        await Member.destroy({
            where: {
                member_id: member_id
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});


// ****************** PRODUCTS ************************
// get all products route
router.get('/products', async (req, res) => {
    try {
        const { program_id } = req.query;
        const products = await Product.findAll({
            where: {
                program_id: program_id
            }
        });
        res.status(200).json({ success: true, products: products });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Add new product route
router.post('/products', async (req, res) => {
    try {
        const { program_id } = req.query;
        const product = req.body;

        const newProduct = await Product.create({
            program_id: program_id,
            name: product.name,
            price: product.price,
            image: product.image
        });

        res.status(200).json({ success: true, product_id: newProduct.product_id });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Update product route
router.put('/products/:product_id', async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = req.body;

        const updatedProduct = await Product.update({
            name: product.name,
            price: product.price,
            image: product.image
        }, {
            where: {
                product_id: product_id
            },
            returning: true,
            plain: true
        });

        res.status(200).json({ success: true, product: updatedProduct[1] });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Delete product route
router.delete('/products/:product_id', async (req, res) => {
    try {
        const { product_id } = req.params;

        await Product.destroy({
            where: {
                product_id: product_id
            }
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// ****************** PURCHASES ************************
// get all purchases route
router.get('/purchases', async (req, res) => {
    try {
        const { program_id, start_date, end_date } = req.query;
        
        const purchase = await Purchase.findAll({
            where: {
                program_id: program_id,
                ...(start_date && end_date && {
                    created_at: {
                        [Op.between]: [new Date(start_date), new Date(end_date)]
                    }
                })
            },
            include: [
                {
                    model: Member,
                    attributes: []
                },
                {
                    model: Product,
                    attributes: []
                }
            ],
            attributes: [
                // member name first and last 
                [Sequelize.fn('concat', Sequelize.col('Member.first_name'), ' ', Sequelize.col('Member.last_name')), 'member'],
                // single product name
                [Sequelize.col('Product.name'), 'product'],
                // purchase id
                'purchase_id',
                // purchase processed
                'processed',
                // purchase created at as purchase date
                [Sequelize.col('Purchase.created_at'), 'purchase_date'],
                // product id
                [Sequelize.col('Product.product_id'), 'product_id'],
                // member id
                [Sequelize.col('Member.member_id'), 'member_id'],
                // product price as amount
                [Sequelize.col('Product.price'), 'amount'],
            ],
            order: [['created_at', 'ASC']]
        });

        const purchases = await getPurchasesRecords(program_id, start_date, end_date);

        res.status(200).json({ success: true, purchases: purchases, purchase: purchase });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Add new purchase route
router.post('/purchases', async (req, res) => {
    try {
        const { program_id } = req.query;
        const { productIds, memberId } = req.body;

        const purchasePromises = productIds.map(async (productId) => {
            return await Purchase.create({
                program_id: program_id,
                member_id: memberId,
                product_id: productId,
                processed: false
            });
        });

        await Promise.all(purchasePromises);

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Add new purchase config route
router.post('/purchases/config', async (req, res) => {
    try {
        const { program_id } = req.query;
        const { addPurchase, memberId } = req.body;

        await Purchase.create({
            program_id: program_id,
            member_id: memberId,
            product_id: addPurchase.product_id,
            processed: addPurchase.processed,
            created_at: addPurchase.created_at
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Update purchase route
router.put('/purchases/:purchase_id', async (req, res) => {
    try {
        const { purchase_id } = req.params;
        const { member_id, product_id, processed } = req.body.editPurchase;

        const [updated] = await Purchase.update({
            member_id,
            product_id,
            processed
        }, {
            where: { purchase_id: purchase_id },
            returning: true
        });

        const updatedPurchase = await Purchase.findOne({ where: { purchase_id: purchase_id } });

        res.status(200).json({ success: true, purchase: updatedPurchase });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Mark processed purchase route
router.put('/purchases', async (req, res) => {
    try {
        const { purchaseIds, value } = req.body;
        console.log('value: ', value);
        console.log('purchaseIds: ', purchaseIds);

        const updatePromises = purchaseIds.map(async (purchaseId) => {
            return await Purchase.update({
                processed: value
            }, {
                where: { purchase_id: purchaseId }
            });
        });

        await Promise.all(updatePromises);

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;