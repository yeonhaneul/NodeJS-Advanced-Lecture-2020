const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session'); //세션을 이용하기 위한 추가
const FileStore = require('session-file-store')(session);   //세션을 이용하기 위한 추가
const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const ut = require('./28.util');


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));    //()안은 쿠키를 조회하기 위한 key
app.use(session({
    secret: '1q2w3e4r5t6y',  //keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));

// 매번 코드에 로그인을 체크하는것을 넣기에는 힘드니 위에 아예 빼놓는것 (이후의 코드가 간결해짐)
// util.js로 옮겨짐
/* function isLoggedIn(req, res, next) {
    if (!req.session.uid) {  //로그인 된 상태인지 확인
        res.redirect('/login')
    } else {
        next();
    }
} */

app.get('/', ut.isLoggedIn, (req,res) => {
    dm.getAllLists(rows => {
        const view = require('./view/rightList');
        let html = view.mainForm(req.session.uname, rows)  //row를 전달해주기위해 아래로 가기
        res.end(html);
    });
});

app.get('/delete/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {   // 권한이 있는 상태
        dm.deleteUser(req.params.uid, () => {   //리턴값이 없으니 비워놓기
            res.redirect('/');
        });
    } else {
        let html = am.alertMsg(`삭제 권한이 없습니다.`, '/')
        res.send(html);
    }
});

app.get('/update/:uid', ut.isLoggedIn, (req, res) => {
    if (req.params.uid === req.session.uid) {   // 권한이 있는 상태
        dm.getUserInfo(req.params.uid, (result) => {
            const view = require('./view/userUpdate');
            html = view.updateForm(result);
            res.send(html);
        });
    } else {
        let html = am.alertMsg(`수정 권한이 없습니다.`, '/')
        res.send(html);
    }
});

app.post('/update', ut.isLoggedIn, (req, res) => { //포스트에서는 로그인 확인을 할 필요가 없다.
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    if (pwd === pwd2) {
        let pwdHash = ut.generateHash(pwd);
        let params = [pwdHash, uid];
        dm.updateUser(params, () => {
           res.redirect('/');
        });
    } else {    //패스워드 입력이 잘못된경우
        let html = am.alertMsg(`패스워드가 일치하지 않습니다.`, `/update/${uid}`)
        res.send(html);
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
    let pwdHash = ut.generateHash(pwd);
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