let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const db = require('../db')
let Thread = require('../models/thread');

router.get('/practice', validateSession, function(req,res)
{
    res.send('Hey! This fucker is working too!')
});

//create below
router.post('/create', validateSession, (req, res) => {
    const forumEntry = {
        title: req.body.thread.title,
        main: req.body.thread.main,
        user: req.user.id,
        date: req.body.thread.date
    }
    Thread.create(threadEntry)
        .then(thread => res.status(200).json(forum))
        .catch(err => res.status(500).json({ error: err }))
})

//get all
router.get("/", (req, res) => {
    Thread.findAll()
    .then(thread => res.status(200).json(thread))
    .catch(err => res.status(500).json({ error: err }))
});
//get by user
router.get("/myposts", validateSession, (req, res) => {
    let userid = req.user.id
    Thread.findAll({
        where: {user: userid}
    })
    .then(thread => res.status(200).json(thread))
    .catch(err => res.status(500).json({ error: "not today, satan!" }))
});

//by thread title
router.get('/:title', function (req, res){
    let title = req.params.title;

    Thread.findAll({
        where: {title: title}
    })
    .then(thread => res.status(200)(thread))
    .catch(err => res.status(500).json({ error: err }))
})

//edit thread
router.put("/update/:mainId", validateSession, function (req, res) {
    const updateThreadEntry = {
        title: req.body.thread.title,
        main: req.body.thread.main,
    };

    const query = { where: { id: req.params.mainId, user: req.user.id}}

    Thread.update(updateThreadEntry, query)
    .then((thread) => res.status(200).json(forum))
    .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router