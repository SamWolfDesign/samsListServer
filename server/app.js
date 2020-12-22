require('dotenv').config();
let express = require('express');
let app = express();

let db = require('./db');
app.use(express.json())

let forum = require('./controllers/forumcontroller');
let thread = require('./controllers/threadcontroller')
let user = require('./controllers/usercontroller');

// db.sync();
//sequelize.sync({force: true})

//non protec
app.use('/user', user);

//he protec
app.use(require('./middleware/validate-session'));
app.use('/forum', forum);
app.use('/thread', thread);

db.authenticate()
.then(() => db.sync())
.then(() => {
    app.listen(3000, function(){
        console.log('App is listening on port 3000');
    })
    
})
.catch((err) => {
    console.log('[Server:] Server Crashed');
    console.log(err);
})
