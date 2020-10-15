const express = require('express');
const ut = require('./util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');

const bRouter = express.Router();

bRouter.get('/listMain', (req,res) => {
    dm.getJoinLists(rows => {
        const view = require('./view/bbsList');
        let html = view.bbsList(rows);
        res.send(html);
    });
});

bRouter.get('/create', (req, res) => {
    const view = require('./view/bbsCreate');
    let html = view.register();
    res.send(html);
});

/* app.post('/create', (req,res) => {
    let title = req.body.title;
    let content = req.body.content;
}); */

module.exports = bRouter;