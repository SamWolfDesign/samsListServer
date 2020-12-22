let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const db = require('../db')
let Forum = require('../models/forum');

router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey!! This is a fuckin practice route!')
});

//CREATE BELOW
router.post('/create', validateSession, (req, res) => {
    const forumEntry = {
        title: req.body.forum.title,
        main: req.body.forum.main,
        user: req.user.id,
        date: req.body.forum.date
    }
    Forum.create(forumEntry)
        .then(forum => res.status(200).json(forum))
        .catch(err => res.status(500).json({ error: err }))
})

//get all
router.get("/", (req, res) => {
    Forum.findAll()
    .then(forum => res.status(200).json(forum))
    .catch(err => res.status(500).json({ error: err }))
});
// get by user
router.get("/myposts", validateSession, (req, res) => {
    let userid = req.user.id
    Forum.findAll({
        where: {user: userid }
    })
    .then(forum => res.status(200).json(forum))
    .catch(err => res.status(500).json({ error: "nah >:)" }))
});

//by forum title
router.get('/:title', function (req, res) {
    let title = req.params.title;

    Forum.findAll({
        where: {title: title}
    })
    .then(forum => res.status(200))
    .catch(err => res.status(500).json({ error: err }))
})

//edit forum
router.put("/update/:mainId", validateSession, function (req, res) {
    const updateForumEntry = {
        title: req.body.forum.title,
        main: req.body.forum.main,
    };

    const query = { where: { id: req.params.mainId, user: req.user.id }}

    Forum.update(updateForumEntry, query)
    .then((forum) => res.status(200).json(forum))
    .catch((err) => res.status(500).json({ error: err }));
});

//delete forum
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Forum.destroy(query)
    .then(() => res.status(200).json({ message: "BABY BYE BYE BYE (BYE BYE BYE)"}))
    .catch((err) => res.status(500).json({ error: "Sorry buddy, I'm not gonna do that."}));
});

module.exports = router

