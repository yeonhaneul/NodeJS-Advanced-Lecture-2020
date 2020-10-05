// 서버를 생성 및 실행합니다.
require('http').createServer(function (request, response) {
    if (request.url === '/' || request.url === '/favicon.ico') {
        //응답합니다.
        let html = `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forever</title>
        </head>
        <body>
            <h1>Forever</h1>
        </body>
        </html>
        `;
        response.end(html);
    }else {
        // 오류를 발생합니다.
        error.error.error();
    }
}).listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000');
});