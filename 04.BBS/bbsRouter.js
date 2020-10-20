const express = require('express');
const bodyParser = require('body-parser');
const ut = require('./util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');
const tm = require('./view/template');
const bRouter = express.Router();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

bRouter.get('/list/:page', ut.isLoggedIn, (req,res) => {
    let page = parseInt(req.params.page);
    let offset = (page - 1) *10;
    dm.bbsTotalCount(result => {
        let totalPage = Math.ceil(result.count/10);
        dm.getJoinLists(offset, rows => {
            console.log(rows);
            let view = require('./view/bbsList');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.list(navBar, rows, page, totalPage);
            res.send(html);
        })
    });
});

/* bRouter.post('/search', (req, res) => {
    let page = parseInt(req.params.page);
    let offset = (page - 1) *10;
    dm.bbsTotalCount(result => {
        let totalPage = Math.ceil(result.count/10);
        dm.searchList(offset, rows => {
            let view = require('./view/bbsSearch');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.searchList(navBar, rows, page, totalPage);
            res.send(html);
        });
    });
}); */

bRouter.get('/view/:bid', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.params.bid);
    let uid = req.params.uid;
    dm.incrementViewCount(bid, () => {
        dm.getViewData(bid, result => {
            dm.getReplyData(bid, replies => {
                let view = require('./view/bbsView');
                let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
                let html = view.view(navBar, result, replies);
                res.send(html);
            });
        });
    });
});

bRouter.post('/reply', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.body.bid);
    let uid = req.session.uid;
    let content = req.body.content;
    let params = [bid, uid, content];
    console.log(bid, uid)
    if (!req.session.uid) {
        let html = am.alertMsg(`댓글 작성을 원하시면 로그인해주세요.`, `/bbs/view/${bid}`);
        res.send(html);
    } else {
        dm.insertReplyData(params, () => {
            res.redirect(`/bbs/view/${bid}`);
        });
    };
});

bRouter.get('/create', ut.isLoggedIn, (req, res) => {
    console.log(req.session.uid);
    if (!req.session.uid) {  //로그인 된 상태
        let html = am.alertMsg(`글작성은 회원만 가능합니다.`, '/');
        res.send(html);
    } else {
        dm.getJoinLists(rows => {
            let view = require('./view/bbsCreate');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.createBbs(navBar, rows);
            res.send(html);
        });
    }
});

bRouter.post('/create', (req, res) => {
    let uid = req.session.uid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
    dm.createBbs(params, () => {
       res.redirect('/bbs/list/1');
    });
});

bRouter.get('/update/:bid', ut.isLoggedIn, (req, res) => {
    let bid = req.params.bid;
    /* let uid = req.params.uid;
    console.log (uid, req.session.uid);
    if (uid !== req.session.uid) {
        let html = am.alertMsg(`작성한 회원만 수정이 가능합니다.`, '/');
        res.send(html);
    } else {} */
    dm.getViewData(bid, result => {
        let view = require('./view/bbsUpdate');
        let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
        let html = view.updateBbs(navBar, result);
        res.send(html);
    });
});

bRouter.post('/update', (req, res) => {
    let bid = req.body.bid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [title, content, bid];
    dm.updateBbsList(params, () => {
        res.redirect(`/bbs/view/${bid}`);
    });
});

bRouter.get('/delete/:bid', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.params.bid);
    /* let uid = req.params.uid;
    console.log(uid, req.session.uid);
    if (uid !== req.session.uid) {
        let html = am.alertMsg(`작성자만 삭제가 가능합니다.`, `/view/${bid}`);
        res.send(html);
    } else {} */
    dm.getViewData(bid, result => {
        let view = require('./view/bbsDelete');
        let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
        let html = view.deleteBbs(navBar, result);
        res.send(html);
    });
});

bRouter.post('/delete/:bid', (req, res) => {
    let bid = parseInt(req.params.bid)
    console.log(bid);
    dm.deleteBbs(bid, () => {
        res.redirect('/');
    });
});


module.exports = bRouter;