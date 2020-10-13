const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  //쿠키를 이용하기 위한 추가
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());    //쿠키를 이용하기 위한 추가

app.get('/', (req,res) => {
    console.log(req.cookies); //아무것도 세팅이 되지않아 [Object: null prototype] {} 상태
    if (req.cookies && req.cookies.isLoggedIn) {
        // 쿠키가 undefined인경우에는 시스템이 죽기 때문에 둘 다 되게, 로그인 된 상태
        dm.getAllLists(rows => {
            const view = require('./view/cookielist');
            let html = view.mainForm(rows)  //row를 전달해주기위해 아래로 가기
            res.end(html);
        });
    } else {
        res.redirect('/login')
    }
});

app.get('/login', (req, res) => {
    const view = require('./view/userlogin');
    let html = view.loginForm();
    res.send(html);
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined) {
            let html = am.alertMsg(`Login 실패: uid ${uid}이/가 없습니다.`, '/login')
            console.log(`Login 실패: uid ${uid}이/가 없습니다.`)
            res.send(html);
        } else {
            if (result.pwd === pwdHash) {
                res.cookie('isLoggedIn', 1) //, {maxAge: 60*1000}) // 쿠키가 { isLoggedIn: '1' }로 세팅된다.
                console.log('Login 성공');
                res.redirect('/');
            } else {
                let html = am.alertMsg(`Login 실패: uid ${uid}이/가 없습니다.`, '/login')
                res.send(html);
                console.log('Login 실패: 패스워드가 다릅니다.');
            }
        }
    });
});

app.get('/logout', (req,res) => {
    res.clearCookie('isLoggedIn');
    res.redirect('/login');
})

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000');
});