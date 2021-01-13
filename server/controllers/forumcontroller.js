let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const db = require('../db')
let Forum = require('../models/forum');
let ac = require('../duties');


router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey!! This is a practice route!')
});

//CREATE BELOW
router.post('/create', validateSession, (req, res) => {
    const forumEntry = {
        title: req.body.forum.title,
        main: req.body.forum.main,
        user: req.user.id,
        date: req.body.forum.date,
        posterId_fk: req.user.id
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

//get by ID


//by forum title
router.get('/:title', function (req, res) {
    let title = req.params.title;

    Forum.findAll({
        where: {title: title}
    })
    .then(forum => res.status(200)(forum))
    .catch(err => res.status(500).json({ error: err }))
})

//edit forum
router.put("/update/:mainId", validateSession, function (req, res) {
    const permission = ac.can(req.user.role).updateAny('forum') && ac.can(req.user.role).updateOwn('forum');

    const updateForumEntry = {
        title: req.body.forum.title,
        main: req.body.forum.main,
    };

    if(permission.granted) {
        const query = { where: { id: req.params.mainId}} //, user: req.user.id 
        Forum.update(updateForumEntry, query)
        .then((forum) => {
            if(forum){
                res.status(200).json({forum, message: "Hey, I worked!"})
            } else {
                res.status(500).json({ error: "I am different!"})
            }
        }
        )
        .catch((err) => res.status(500).json({ error: err }));
    } else {
        res.status(500).json({ error: "Ooooh yeah, no. That's above your pay-grade"})
    }
    }

);

//delete forum
router.delete("/delete/:id", validateSession, function (req, res) {
    const permission = ac.can(req.user.role).deleteAny('forum') && ac.can(req.user.role).deleteOwn('forum');

    if(permission.granted){
        const query = { where: { id: req.params.id } };

        Forum.destroy(query)
        .then((forum) => {
            if(forum){
                res.status(200).json({ message: "BABY BYE BYE BYEEE (BYE BYE BYE)"})
            } else {
                res.status(500).json({ error: "Sorry buddy, I'm not gonna do that."})
            }
        }
        )
        .catch((err) => res.status(500).json({ error: err }))
    } else {
        res.status(500).json({ error: "Ooooh yeah, no. That's above your pay-grade"})
    }
}
);

module.exports = router

