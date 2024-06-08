const express = require('express');
const db = require('../../../db/database');
const router = express.Router();
const { getPurchasesRecords } = require('../../../services/purchase.service');

// ****************** MEMBERS ************************
// get all members route
router.get('/members', async (req, res) => {
    try {
        // get the program_id from the request
        const { program_id } = req.query;
        const members = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM member where program_id = ?', [program_id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
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
        // Get the program_id from the query string
        const { program_id } = req.query;
        // Get the member data from the request body
        const member = req.body;

        // Insert the member into the database
        const memberId = await new Promise((resolve, reject) => {
            db.run('INSERT INTO member (program_id, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)',
                [program_id, member.first_name, member.last_name, member.email, member.phone], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);  // `this.lastID` contains the ID of the newly inserted member
                    }
                });
        });

        res.status(200).json({ success: true, member_id: memberId });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Update member route
router.put('/members/:member_id', async (req, res) => {
    try {
        // Get the member_id from the request
        const { member_id } = req.params;
        // Get the member data from the request body
        const member = req.body;

        // Update the member in the database and return the updated member
        const editMember = await new Promise((resolve, reject) => {
            db.run('UPDATE member SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE member_id = ?',
                [member.first_name, member.last_name, member.email, member.phone, member_id], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(member);
                    }
                });
        });

        res.status(200).json({ success: true, member: editMember });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Delete member route
router.delete('/members/:member_id', async (req, res) => {
    try {
        // Get the member_id from the request
        const { member_id } = req.params;

        // Delete the member from the database
        // delete all purchases associated with the member
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM purchase WHERE member_id = ?', [member_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM member WHERE member_id = ?', [member_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
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
        // get the program_id from the request
        const { program_id } = req.query;
        const products = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM product where program_id = ?', [program_id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
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
        // Get the program_id from the query string
        const { program_id } = req.query;
        // Get the product data from the request body
        const product = req.body;

        // Insert the product into the database
        const productId = await new Promise((resolve, reject) => {
            db.run('INSERT INTO product (program_id, name, price, image) VALUES (?, ?, ?, ?)',
                [program_id, product.name, product.price, product.image], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);  // `this.lastID` contains the ID of the newly inserted product
                    }
                });
        });

        res.status(200).json({ success: true, product_id: productId });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Update product route
router.put('/products/:product_id', async (req, res) => {
    try {
        // Get the product_id from the request
        const { product_id } = req.params;
        // Get the product data from the request body
        const product = req.body;

        // Update the product in the database and return the updated product
        const editProduct = await new Promise((resolve, reject) => {
            db.run('UPDATE product SET name = ?, price = ?, image = ? WHERE product_id = ?',
                [product.name, product.price, product.image, product_id], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(product);
                    }
                });
        });

        res.status(200).json({ success: true, product: editProduct });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Delete product route
router.delete('/products/:product_id', async (req, res) => {
    try {
        // Get the product_id from the request
        const { product_id } = req.params;

        // Delete the product from the database
        // delete all purchases associated with the product
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM purchase WHERE product_id = ?', [product_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM product WHERE product_id = ?', [product_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
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
        // get the program_id from the request
        const { program_id, start_date, end_date, group_by_members } = req.query;
        const purchases = await getPurchasesRecords(program_id, start_date, end_date);
        const purchase = await new Promise((resolve, reject) => {
            db.all(`
                    SELECT purchase.purchase_id,
                    purchase.created_at as purchase_date,
                    purchase.processed,
                    member.first_name || ' ' || member.last_name as member,
                    product.name as product,
                    product.product_id,
                    member.member_id,
                    product.price as amount
                    FROM purchase
                    JOIN member ON member.member_id = purchase.member_id
                    JOIN product ON product.product_id = purchase.product_id
                    WHERE purchase.program_id = ? 
                    ${(start_date && end_date) ? `AND purchase.created_at >= '${start_date}' AND purchase.created_at <= '${end_date}' ` : ''}
                    ORDER BY purchase.created_at;`, [program_id], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
        res.status(200).json({ success: true, purchases: purchases, purchase: purchase });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// Add new purchase route
router.post('/purchases', async (req, res) => {
    try {
        // Get the program_id from the query string
        const { program_id } = req.query;
        // Get the purchase data from the request body
        const productIds = req.body.productIds;
        const memberId = req.body.memberId;

        productIds.map(async (productId) => {
            // Insert the purchase into the database
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO purchase (program_id, member_id, product_id, processed) VALUES (?, ?, ?, ?)',
                    [program_id, memberId, productId, false], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/purchases/config', async (req, res) => {
    try {
        // Get the program_id from the query string
        const { program_id } = req.query;
        // Get the purchase data from the request body
        const addPurchase = req.body.addPurchase;
        const memberId = req.body.memberId;
        // Insert the purchase into the database
        await new Promise((resolve, reject) => {
            db.run('INSERT INTO purchase (program_id, member_id, product_id, processed, created_at) VALUES (?, ?, ?, ?, ?)',
                [program_id, memberId, addPurchase.product_id, addPurchase.processed, addPurchase.created_at], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
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
        // Get the purchase_id from the request
        const { purchase_id } = req.params;
        // Get the purchase data from the request body
        const purchase = req.body.editPurchase;

        // Update the purchase in the database and return the updated purchase
        const editPurchase = await new Promise((resolve, reject) => {
            db.run('UPDATE purchase SET member_id = ?, product_id = ?, processed = ? WHERE purchase_id = ?',
                [purchase.member_id, purchase.product_id, purchase.processed, purchase_id], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(purchase);
                    }
                });
        });

        res.status(200).json({ success: true, purchase: editPurchase });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

// mark processed purchase route
router.put('/purchases', async (req, res) => {
    try {
        // Get the purchase_id from the request
        const { purchase_id } = req.params;
        // Get the purchase data from the request body
        const purchaseIds = req.body.purchaseIds;
        const value = req.body.value;

        // for each purchase id, update the processed status to true
        purchaseIds.map(async (purchaseId) => {
            await new Promise((resolve, reject) => {
                db.run('UPDATE purchase SET processed = ? WHERE purchase_id = ?',
                    [value, purchaseId], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;