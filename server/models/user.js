const { DataTypes } = require("sequelize");
const db = require("../db");
// const Forum = require('./forum');

const User = db.define("user", {
    // user_id: {
    // type: DataTypes.INTEGER,
    // allowNull: false,
    // unique: false,
    // },
    firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(
            "admin", "user"
        ),
        allowNull: false,
        }
});


module.exports = User;

// User.hasNamy()