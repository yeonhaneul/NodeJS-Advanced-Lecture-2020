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
           res.redirect('/');   //추후에 로그인 후 메인화면 만들어지면 연결해놓기
        });
    } else {
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/user/register`)
        res.send(html);
    }
});

uRouter.get('/list/:page', ut.isLoggedIn, (req, res) => {
    let page = parseInt(req.params.page);
    let offset = (page - 1) *10;
    dm.userTotalCount(result => {
        let totalPage = Math.ceil(result.count/10);
    dm.getUserInfo(offset, rows => {
        let view = require('./view/userList');
        let navBar = tm.navBar(req.session.uname?req.session.uname:'게스트');
        let html = view.list(navBar, rows, page, totalPage);
        res.send(html);
        });
    });
});

module.exports = uRouter;