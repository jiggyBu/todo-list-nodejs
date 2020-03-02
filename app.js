const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { PORT } = require('./constants');

const app = express();

/* Using sessions */
app.use(session({ secret: 'todotopsecret' }))
    .use((req, res, next) => {
        if (typeof (req.session.todolist) == 'undefined') {
            req.session.todolist = [];
        }
        next();
    })
    .get('/todo', (req, res) => {
        res.render('todo.ejs', { todolist: req.session.todolist });
    })
    .post('/todo/add/', urlencodedParser, (req, res) => {
        if (req.body.newtodo !== '') {
            req.session.todolist.push(req.body.newtodo);
        }
        res.redirect('/todo');
    })
    .get('/todo/delete/:id', (req, res) => {
        if (req.params.id != '') {
            req.session.todolist.splice(req.params.id, 1);
        }
        res.redirect('/todo');
    })
    .use((req, res, next) => {
        res.redirect('/todo');
    })
    .listen(PORT, () => console.log(`Listening to port: ${PORT}`));
