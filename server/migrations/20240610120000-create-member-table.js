'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Programs', {
            program_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable('Members', {
            member_id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            program_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Programs',
                    key: 'program_id',
                },
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable('Products', {
            product_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            program_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Programs',
                    key: 'program_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING, // Assuming the image URL will be stored
                allowNull: true,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.createTable('Purchases', {
            purchase_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            program_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Programs',
                    key: 'program_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            member_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Members',
                    key: 'member_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            product_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Products',
                    key: 'product_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            processed: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });

        // Add foreign key constraints if needed...
    },

    down: async (queryInterface, Sequelize) => {
        // Drop tables in reverse order...
        await queryInterface.dropTable('Purchases');
        await queryInterface.dropTable('Programs');
        await queryInterface.dropTable('Products');
        await queryInterface.dropTable('Members');
    },
};
