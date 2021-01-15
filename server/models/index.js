const User = require('./user');
const Forum = require('./forum');
const Thread = require('./thread');

Forum.belongsTo(User);
Thread.belongsTo(User);
Thread.belongsTo(Forum)


User.hasMany(Forum);
User.hasMany(Thread);
Forum.hasMany(Thread)

module.exports = { User, Forum, Thread };