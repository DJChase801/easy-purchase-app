const { Sequelize } = require('sequelize');
const Umzug = require('umzug');
const sequelize = require('../config/database.js');

// // Define the database URL for both local and production environments
// const DATABASE_URL = process.env.DATABASE_URL || 'postgres://u75n4fh0pvh1pl:p4562eab93b6de57066e9644f67d694b54163974a48c513827e773f28691aca42@c1i13pt05ja4ag.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d4b81e143cbhui';

// // Initialize Sequelize with the database URL
// const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: 'postgres', // or your database dialect
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // For self-signed certificates
//     },
//   },
// });

async function runMigrations() {
  const umzug = new Umzug({
    migrations: {
      glob: '../migrations/*.js',
      path: '../migrations',
      params: [sequelize.getQueryInterface(), Sequelize],
    },
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
    },
  });

  await umzug.up();
}

runMigrations()
  .then(() => console.log('Migrations have been run successfully'))
  .catch((error) => console.error('Error running migrations:', error));