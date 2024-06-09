const { Sequelize } = require('sequelize');

// Define the database URL for both local and production environments
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://u80vmr78c2mkms:pb955b6ac3c8f02ee90dec2f717c98ba8e0e09d1151547c191e8bb6edcc4a4914@c9mq4861d16jlm.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d5mjk4knqjdjlo';

// Initialize Sequelize with the database URL
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres', // or your database dialect
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
});

module.exports = sequelize;
