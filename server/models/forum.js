const { DataTypes } = require("sequelize"); //"types removed from here to fix 'sequelize not found' error"
const db = require('../db')

    const Forum = db.define('forum', {
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

module.exports = Forum
