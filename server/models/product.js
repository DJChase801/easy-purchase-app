// models/product.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        product_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        program_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Program',
                key: 'program_id',
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, // Assuming the image is stored as a URL
            allowNull: true, // Adjust as needed
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        timestamps: false,
        tableName: 'Products',
        paranoid: true,
    });

    return Product;
};
