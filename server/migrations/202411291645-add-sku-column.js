'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Products', 'sku', {
            type: Sequelize.STRING, // Use STRING for alphanumeric SKU values
            allowNull: true, // Adjust to your requirements (e.g., allowNull: true if SKU isn't always required)
            unique: true, // SKUs are typically unique
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Products', 'sku');
    }
};
