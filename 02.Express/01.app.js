const express = require('express');
const util = require('util');

const app = express();

app.use(function (req, res) { // 사용하려는 미들웨어를 등록할 때
    let html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express</title>
    </head>
    <body>
        <h1>Welcome to Express World</h1>
    </body>
    </html>
    `;
    res.send(html);
}); 

/* app.get();  // get방식으로 들어오는 url을 보고 처리
app.post(); // post .. */

// if문 또는 switch문으로 연결되어 있지 않기 때문에 각각 분류가 가능.

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
})