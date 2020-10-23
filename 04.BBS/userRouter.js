const express = require('express');
const ut = require('./util');
const dm = require('./db/db-module');
const am = require('./view/alertMsg');
const tm = require('./view/template');

const uRouter = express.Router();
uRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.register();
    res.send(html);
});

uRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [uid, pwdHash, uname, tel, email];
        dm.insertReg(params, () => {
           res.redirect('/login');
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/register`)
        res.send(html);
    }
});

uRouter.get('/list/:page', (req, res) => {
    if (req.session.uid === 'admin') {
        console.log(req.session.uid);
        let page = parseInt(req.params.page);
        let offset = (page - 1) * 10;
        dm.userTotalCount(result => {
            let totalPage = Math.ceil(result.count / 10);
            dm.getUserList(offset, rows => {
                let view = require('./view/userList');
                let navBar = tm.navBar(req.session.uname);
                let html = view.List(navBar, rows, page, totalPage);
                res.send(html);
            })
        });
    } else {
        if (req.session.uid === undefined) {
            let html = am.alertMsg(`마이페이지는 로그인 후 확인이 가능합니다.`, '/login')
            res.send(html);
        } else {
            res.redirect(`/user/mypage/uid/${req.session.uid}`)
        }
    }
});

uRouter.get('/mypage/uid/:uid', ut.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    console.log(req.session.uname);
    if (uid === req.session.uid || req.session.uid === 'admin') {
        dm.getUserInfo(uid, result => {
            let view = require('./view/userSosai');
            let navBar = tm.navBar(req.session.uname);
            let html = view.userList(navBar, result)
            res.send(html);
        });
    } else {
            let html = am.alertMsg(`조회 권한이 없습니다.`, '/')
            res.send(html);
    }
});

uRouter.get('/mypage/delete/:uid', ut.isLoggedIn, (req,res) => {
    let uid = req.params.uid;
    if (uid === req.session.uid) {
        dm.getUserInfo(uid, result => {
            console.log(uid, result)
            let view = require('./view/userDelete');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.deleteUser(navBar, result);
            res.send(html);
        })
    } else {
        let html = am.alertMsg(`삭제 권한이 없습니다.`, `/user/mypage/uid/${uid}`)
        res.send(html);
    };
})

uRouter.post('/mypage/delete', (req,res) => {
    let uid = req.body.uid;
    console.log(uid);
    dm.userDelete(uid, () => {
        res.redirect('/login');
    });
})

uRouter.get('/mypage/update/:uid', ut.isLoggedIn, (req, res) => {
    let uid = req.params.uid;
    console.log(uid);
    if (req.params.uid === req.session.uid) {
        dm.getUserInfo(uid, result => {
            let view = require('./view/userUpdate');
            let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
            let html = view.Updateuser(navBar, result);
            res.send(html);
        })
    } else {
        let html = am.alertMsg(`수정 권한이 없습니다.`, `/user/mypage/uid/${uid}`)
        res.send(html);
    }
})

uRouter.post('/mypage/update', ut.isLoggedIn, (req,res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email;
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [pwdHash, uname, tel, email, uid];
        dm.userUpdate(params, () => {
            res.redirect(`/user/mypage/uid/${uid}`);
        })
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/mypage/update/${uid}`)
        res.send(html);
    }
})

module.exports = uRouter;