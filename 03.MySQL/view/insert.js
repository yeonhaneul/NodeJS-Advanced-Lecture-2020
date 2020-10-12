module.exports.insertForm = function () {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Song Form</title>
</head>
<body>
    <h3>Login page</h3>
    <hr>
    <form action="/insert" method="post">
        <table>
            <tr>
                <td><lable for="title">노래 제목</lable></td>
                <td><input type="text" name="title" id="title"></td>
            </tr>
            <tr>
                <td><lable for="lyrics">가사</lable></td>
                <td><input type="text" name="lyrics" id="lyrics"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="submit" value="제출"></td>
            </tr>
        </table>
    </form>
</body>
</html>
`
}