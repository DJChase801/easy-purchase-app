const db = require('../db/database');

const getPurchasesRecords = async (program_id, start, end) => {
    const purchases = await new Promise((resolve, reject) => {
        db.all(`
            SELECT m.first_name || ' ' || m.last_name as member, 
            group_concat(p.name) as products, 
            group_concat(pur.purchase_id) as purchase_ids,
            sum(p.price) as amount
            FROM purchase pur
            JOIN product p ON p.product_id = pur.product_id
            JOIN member m ON m.member_id = pur.member_id
            WHERE pur.program_id = ? AND pur.processed = 0
            ${(start && end) ? `AND pur.created_at >= '${start}' AND pur.created_at <= '${end}' `: ''}
            GROUP BY m.member_id
            ORDER BY member ASC;            
            `, [program_id], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
    return purchases;
}

exports.getPurchasesRecords = getPurchasesRecords;