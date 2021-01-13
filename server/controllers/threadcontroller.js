let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const db = require("../db");
let Thread = require("../models/thread");
const ac = require("../duties");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey! This is working too!");
});

//create below
router.post("/create", validateSession, (req, res) => {
  const threadEntry = {
    title: req.body.thread.title,
    main: req.body.thread.main,
    user: req.user.id,
    date: req.body.thread.date,
    threadId_fk: req.user.id,
  };
  Thread.create(threadEntry)
    .then((thread) => res.status(200).json(thread))
    .catch((err) => res.status(500).json({ error: err }));
});

//get all
router.get("/", (req, res) => {
  Thread.findAll()
    .then((thread) => res.status(200).json(thread))
    .catch((err) => res.status(500).json({ error: err }));
});
//get by user
router.get("/myposts", validateSession, (req, res) => {
  let userid = req.user.id;
  Thread.findAll({
    where: { user: userid },
  })
    .then((thread) => res.status(200).json(thread))
    .catch((err) => res.status(500).json({ error: "not today, satan!" }));
});

//by thread title
router.get("/:title", function (req, res) {
  let title = req.params.title;

  Thread.findAll({
    where: { title: title },
  })
    .then((thread) => res.status(200)(thread))
    .catch((err) => res.status(500).json({ error: err }));
});

//edit thread
router.put("/update/:mainId", validateSession, function (req, res) {
  const permission =
    ac.can(req.user.role).updateAny("thread") &&
    ac.can(req.user.role).updateOwn("thread");

  const updateThreadEntry = {
    title: req.body.thread.title,
    main: req.body.thread.main,
  };

  if (permission.granted) {
    const query = { where: { id: req.params.mainId } }; //maybe currently only pulling id of user who is logged in   MAYBE NEED-> , user: req.user.id
    //                                              user: req.parms.whateveruserId is
    Thread.update(updateThreadEntry, query)
      .then((thread) => {
        if (thread) {
          res
            .status(200)
            .json({ thread, message: "Alright, NOW we're in business!" });
        } else {
          res.status(500).json({ error: "Alright, we're NOT in business!" });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res
      .status(500)
      .json({ error: "Ooooh yeah, no. That's above your pay-grade" });
  }
});

//delete thread
router.delete("/delete/:id", validateSession, function (req, res) {
  const permission =
    ac.can(req.user.role).deleteAny("thread") &&
    ac.can(req.user.role).deleteOwn("thread");
  if (permission.granted) {
    const query = { where: { id: req.params.id } };
    Thread.destroy(query)
      .then((thread) => {
        if (thread) {
          res.status(200).json({ message: "BABY BYE BYE BYEEE (BYE BYE BYE)" });
        } else {
          res.status(500).json({ error: "Sorry brodie, that ain't happening" });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res
      .status(500)
      .json({ error: "Ooooh yeah, no. That's above your pay-grade" });
  }
});

module.exports = router;
