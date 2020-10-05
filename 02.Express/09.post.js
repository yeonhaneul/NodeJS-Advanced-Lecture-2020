const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
    // res.send('<h3>3초 후 로그인 페이지로 이동합니다.</h3>');
    setTimeout(() => {
        res.redirect('/login');
        return;
    }, 3000);
}); 

app.get('/login', (req, res) => {
    fs.readFile('09.loginform.html', 'utf8', (error, data) => {
        res.send(data);
    });
});

app.post('/login', (req, res) => {
    let uid = req.body.uid;     // .body는 body-parse모듈이 있어야 사용가능
    let pwd = req.body.pwd;
    console.log(req.body);
    util.log(uid, pwd);
    if (uid === 'park' && pwd === '1234')
        res.send(`<h1>login Success</h1>`);
    else
        res.redirect('/login');
});

app.listen(3000, function () {
    util.log('Server running at http://127.0.0.1:3000');
})