const { DataTypes } = require("sequelize");
const db = require('../db');
const Forum = require('./forum')

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
    },
    threadId_fk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // adminId_fk: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
})

module.exports = Thread;