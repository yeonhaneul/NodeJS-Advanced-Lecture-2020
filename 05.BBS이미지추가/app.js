const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bRouter = require('./bbsRouter');
const dm = require('./db/db-module')
const ut = require('./util');
const am = require('./view/alertMsg');

const app = express();
//express.static으로 정의해주어야지 remote가 아닌 local의 파일을 사용 할 수 있다.
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('1q2w3e4r5t6y'));    //()안은 쿠키를 조회하기 위한 key
app.use(session({
    secret: '1q2w3e4r5t6y',  //keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));
app.use('/user', uRouter);  //유저로 시작하는것은 uRouter로 보낸다.
app.use('/bbs', bRouter);

app.get('/', (req,res) => {
    res.redirect('/bbs/list/1')
});

app.get('/login', (req,res) => {    
    fs.readFile('./view/index.html', 'utf8', (error, data) => {
        res.send(data)
    });
});

app.post('/login', (req,res) => {
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = ut.generateHash(pwd);
    dm.getUserInfo(uid, result => {
        if (result === undefined || result.isDeleted === 1) {
            let html = am.alertMsg(`Login 실패: ${uid}은/는 등록되지 않은 아이디입니다.`, '/login')
            console.log(`Login 실패: ${uid}이/가 존재하지 않습니다.`)
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
                let html = am.alertMsg(`Login 실패: 패스워드를 확인해주세요.`, '/login')
                res.send(html);
                console.log('Login 실패: 패스워드가 다릅니다.');
            }
        }
    });
});

app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000')
});