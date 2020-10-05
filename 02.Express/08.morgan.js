// 모듈을 추출합니다.
const express = require('express');
const morgan = require('morgan');
const util = require('util')

// 서버를 생성합니다.
let app = express();

// 미들웨어를 설정합니다.
// app.use(morgan('combined')); // combined는 기본
// app.use(morgan(':method + :date + :remote-addr')); //원하는것만 뽑아낼 수도 있다.
app.use(morgan('short'));   // combined 내용이 짧게 나온다.
app.use(function (req, res) {
    res.send('<h1>Morgan Basic</h1>');
});

// 서버를 실행합니다.
app.listen(3000, function () {
    util.log('Server running at http://127.0.0.1:3000');
})