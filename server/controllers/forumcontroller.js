let express = require('express');
let router = express.Router();


router.get('/practice', function(req, res)
{
    res.send('Hey!! This is a fuckin practice route!')
})

router.get('/about', function(req, res)
{
    res.send('This is the goddamn about route')
})
module.exports = router