module.exports.insertForm = function () {
    return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>걸그룹 추가</title>
    </head>
    <body>
        <h3>걸그룹 추가</h3>
        <hr>
        <form action="/insert" method="post">
            <table>
                <tr>
                    <td><lable for="name">걸그룹명</lable></td>
                    <td><input type="text" name="name" id="name"></td>
                </tr>
                <tr>
                    <td><lable for="debut">데뷔일자</lable></td>
                    <td><input type="text" name="debut" id="debut"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="추가"></td>
                </tr>
            </table>
        </form>
    </body>
    </html>
`
}