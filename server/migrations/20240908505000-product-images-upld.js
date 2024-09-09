'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Update the products table changing the image column from string to BYTEA
        // Since Sequelize doesn't directly support the USING clause, we use raw SQL here.
        await queryInterface.sequelize.query(`
            ALTER TABLE "Products"
            ALTER COLUMN "image" TYPE BYTEA
            USING decode("image", 'escape');
        `);

        // Add a new column to the products table to store image type
        await queryInterface.addColumn('Products', 'image_type', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Revert the changes made in the up function
        await queryInterface.changeColumn('Products', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.removeColumn('Products', 'image_type');
    },
};
