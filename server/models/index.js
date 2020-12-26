const User = require('./user');
const Forum = require('./forum');
const Thread = require('./thread');

Forum.belongsTo(User, {foreignKey: 'customerId_fk', targetKey: 'id'});
User.hasMany(Forum, {foreignKey: 'customerId_fk', sourceKey: 'id'});

module.exports = { User, Forum, Thread };