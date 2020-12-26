const User = require('./user');
const Forum = require('./forum');
const Thread = require('./thread');

Forum.belongsTo(User, {foreignKey: 'posterId_fk', targetKey: 'id'});
User.hasMany(Forum, {foreignKey: 'posterId_fk', sourceKey: 'id'});

Thread.belongsTo(User, {foreignKey: 'threadId_fk', targetKey: 'id'});
User.hasMany(Thread, {foreignKey: 'threadId_fk', sourceKey: 'id'});

module.exports = { User, Forum, Thread };