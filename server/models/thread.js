const { DataTypes } = require("sequelize");
const db = require('../db')

const Thread = db.define('thread', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Thread