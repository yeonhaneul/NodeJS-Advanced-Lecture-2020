const express = require('express');
const util = require('util');

const app = express();
app.use(express.static(__dirname + '/public')); // 현재 디렉토리(__dirname)에서 public으로 시작하는 주소를 만들겠다.
// static => 경로를 지정 (위치가 변하지 않는 것들)
app.get('/', function (req, res) {
    let html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express</title>
    </head>
    <body>
        <h1>Static Image</h1>
        <hr>
        <img src="/cat.jpg" style="width: 300px;" alt="고양이">
        <img src="/img/dog.jpg" style="width: 300px;" alt="강아지">
    </body>
    </html>
    `;
    res.send(html);
}); 

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
})