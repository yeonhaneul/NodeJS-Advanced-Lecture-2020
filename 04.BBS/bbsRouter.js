const express = require('express');
const bodyParser = require('body-parser');
const ut = require('./util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');
const tm = require('./view/template');
const bRouter = express.Router();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

bRouter.get('/list/:page', (req,res) => {
    let page = parseInt(req.params.page);
    let offset = (page - 1) *10;
    dm.bbsTotalCount(result => {
        let totalPage = Math.ceil(result.count/10);
        dm.getJoinLists(offset, rows => {
            let view = require('./view/bbsList');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.list(navBar, rows, page, totalPage);
            res.send(html);
        })
    });
});

bRouter.post('/:bid', (req,res) => {
    dm.getJoinLists(rows => {
        const view = require('./view/bbsList');
        let html = view.bbsList(rows, uname);
        res.send(html);
    });
});


bRouter.get('/create', (req, res) => {
    /* console.log(req.session.uid);
    if (!req.session.uid) {  //로그인 된 상태
        let html = am.alertMsg(`글작성은 회원만 가능합니다.`, '/');
        res.send('html');
    } else {
        dm.getJoinLists(rows => {
            const view = require('./view/bbsCreate');
            let html = view.createBbs();
            res.send(html);
        });
    } */
    dm.getJoinLists(rows => {
        const view = require('./view/bbsCreate');
        let html = view.createBbs();
        res.send(html);
    });
});

bRouter.post('/create', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let params = [title, content];
    dm.createBbs(params, () => {
        res.redirect('/');
    });
});

module.exports = bRouter;