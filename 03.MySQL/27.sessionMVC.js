const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session'); //세션을 이용하기 위한 추가
const FileStore = require('session-file-store')(session);   //세션을 이용하기 위한 추가
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));    //()안은 쿠키를 조회하기 위한 key
app.use(session({
    secret: '1q2w3e4r5t6y',  //keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

app.get('/', (req,res) => {
    console.log(req.session.uid);
    if (!req.session.uid) {  //로그인 된 상태
        res.redirect('/login')
    } else {
        dm.getAllLists(rows => {
            const view = require('./view/sessionList');
            let html = view.mainForm(req.session.uname, rows)  //row를 전달해주기위해 아래로 가기
            res.end(html);
        });
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
                req.session.uid = uid;
                req.session.uname = result.uname;
                console.log('Login 성공');
                req.session.save(function() {
                    res.redirect('/');
                });
            } else {
                let html = am.alertMsg(`Login 실패: uid ${uid}이/가 없습니다.`, '/login')
                res.send(html);
                console.log('Login 실패: 패스워드가 다릅니다.');
            }
        }
    });
});

app.get('/logout', (req,res) => {
    req.session.destroy();  // 세션을 없앰
    res.redirect('/login');
})

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000');
});