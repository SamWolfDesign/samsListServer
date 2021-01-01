const AccessControl = require('accesscontrol');
const ac = new AccessControl();

ac.grant('user')
        .readAny('forum')
        .readAny('thread')
        .createOwn('forum')
        .createOwn('thread')
        .updateOwn('forum')
        .updateOwn('thread')
        .deleteOwn('forum')
        .deleteOwn('thread')
        .readOwn('forum')
        .readOwn('thread')
    .grant('admin')
        .extend('user')
        .updateAny('forum')
        .updateAny('thread')
        .deleteAny('forum')
        .deleteAny('thread');

// const permission = ac.can('user').createOwn('forum', 'thread');

// permission = ac.can('admin').updateAny('forum', 'thread');

module.exports = ac;