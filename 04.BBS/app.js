const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const ut = require('./util');

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
    fs.readFile('./view/index.html', 'utf8', (error, data) => {
        res.send(data);
    })
});

app.get('/login/:uid', (req,res) => {
    fs.readFile('./view/test', 'utf8', (error, data) => {
        res.send(data);
    })
});

app.post('/login', (req,res) => {
    fs.readFile('./view/test', 'utf8', (error, data) => {
        res.send(data);
    })
});


app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000');
});