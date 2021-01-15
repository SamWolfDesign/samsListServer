const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: "postgres"
// });

const sequelize = new Sequelize(
    process.env.DATABASE_URL ||
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/sam-list2`,
    {
        dialect: 'postgres',
    }
)

module.exports = sequelize;