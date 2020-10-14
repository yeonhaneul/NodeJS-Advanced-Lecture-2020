const express = require('express');
const ut = require('./util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');

const bRouter = express.Router();
bRouter.get('/bbs', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.register();
    res.send(html);
});

module.exports = uRouter;