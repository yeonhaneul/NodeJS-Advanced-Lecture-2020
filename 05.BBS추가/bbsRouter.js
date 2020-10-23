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

bRouter.post('/search', (req, res) => {
    let keyword = '%'+req.body.keyword+'%';
    console.log(keyword);
    dm.searchList(keyword, rows => {
        let view = require('./view/bbsSearch');
        let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
        let html = view.searchList(navBar, rows);
        res.send(html);
    })
});

bRouter.get('/view/:bid', (req, res) => {
    let bid = parseInt(req.params.bid);
    dm.incrementViewCount(bid, () => {
        dm.getViewData(bid, result => {
            dm.getReplyData(bid, replies => {
                console.log(replies)
                let view = require('./view/bbsView');
                let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
                let html = view.view(navBar, result, replies);
                res.send(html);
            });
        });
    });
});

bRouter.post('/reply', (req, res) => {
    let bid = parseInt(req.body.bid);
    let uid = req.session.uid;
    let content = req.body.content;
    let isMine = (req.body.uid === uid) ? 1:0;
    let params = [bid, uid, content, isMine];
    if (!req.session.uid) {
        let html = am.alertMsg(`댓글 작성을 원하시면 로그인해주세요.`, `/bbs/view/${bid}`);
        res.send(html);
    } else {
        dm.insertReplyData(params, () => {
            dm.incrementReplyCount(bid, () => {
                res.redirect(`/bbs/view/${bid}`)
            });
        });
    }
});

bRouter.get('/create', (req, res) => {
    if (!req.session.uid) {  //로그인 된 상태
        let html = am.alertMsg(`글작성은 회원만 가능합니다.`, '/');
        res.send(html);
    } else {
        dm.getJoinLists(rows => {
            let view = require('./view/bbsCreate');
            let navBar = tm.navBar(req.session.uname);
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

bRouter.get('/update/:bid/uid/:uid', (req, res) => {
    let bid = req.params.bid;
    let uid = req.params.uid;
    if (uid !== req.session.uid) {
        let html = am.alertMsg(`작성한 회원만 수정이 가능합니다.`, '/');
        res.send(html);
    } else {
        dm.getViewData(bid, result => {
            let view = require('./view/bbsUpdate');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.updateBbs(navBar, result);
            res.send(html);
        });
    }
});

bRouter.post('/update', ut.isLoggedIn, (req, res) => {
    let bid = req.body.bid;
    let title = req.body.title;
    let content = req.body.content;
    let params = [title, content, bid];
    dm.updateBbsList(params, () => {
        res.redirect(`/bbs/view/${bid}`);
    });
});

bRouter.get('/delete/:bid/uid/:uid', (req, res) => {
    let bid = parseInt(req.params.bid);
    let uid = req.params.uid;
    if (uid !== req.session.uid) {
        let html = am.alertMsg(`작성자만 삭제가 가능합니다.`, `/bbs/view/${bid}`);
        res.send(html);
    } else {
        dm.getViewData(bid, result => {
            let view = require('./view/bbsDelete');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.deleteBbs(navBar, result);
            res.send(html);
        });
    }
});

bRouter.post('/delete', ut.isLoggedIn, (req, res) => {
    let bid = parseInt(req.body.bid);
    console.log(bid);
    dm.bbsDelete(bid, () => {
        res.redirect('/');
    });
});

module.exports = bRouter;