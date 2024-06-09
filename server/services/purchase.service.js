const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { Purchase, Product, Member } = require('../models');

const getPurchasesRecords = async (program_id, start, end) => {
    try {
        const whereConditions = {
            program_id: program_id,
            processed: false,
        };

        if (start && end) {
            whereConditions.created_at = {
                [Op.between]: [new Date(start), new Date(end)],
            };
        }

        const purchases = await Purchase.findAll({
            where: whereConditions,
            include: [
                {
                    model: Product,
                    attributes: [],
                },
                {
                    model: Member,
                    attributes: [],
                },
            ],
            attributes: [
                [Sequelize.fn('concat', Sequelize.col('Member.first_name'), ' ', Sequelize.col('Member.last_name')), 'member'],
                [Sequelize.fn('string_agg', Sequelize.col('Product.name'), ', '), 'products'],
                [Sequelize.fn('string_agg', Sequelize.cast(Sequelize.col('Purchase.purchase_id'), 'text'), ', '), 'purchase_ids'],
                [Sequelize.fn('sum', Sequelize.col('Product.price')), 'amount'],
            ],
            group: [
                'Member.member_id',
            ],
            order: [[Sequelize.literal('member'), 'ASC']],
            raw: true,
        });

        return purchases;
    } catch (error) {
        console.log('error: ', error);
        throw new Error(`Error fetching purchase records: ${error.message}`);
    }
};

module.exports = {
    getPurchasesRecords,
};
