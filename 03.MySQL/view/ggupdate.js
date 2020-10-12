module.exports.updateForm = function(result) {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>걸그룹 추가</title>
</head>
<body>
    <h3>걸그룹 수정</h3>
    <hr>
    <form action="/update" method="post">
        <input type="hidden" name="ggid" value="${result.ggid}">
        <table>
        <tr>
            <td><lable for="name">걸그룹명</lable></td>
            <td><input type="text" name="name" id="name" value="${result.name}"></td>
        </tr>
        <tr>
            <td><lable for="debut">데뷔일자</lable></td>
            <td><input type="text" name="debut" id="debut" value="${result.debut}"></td>
        </tr>
        <tr>
            <td colspan="2"><input type="submit" value="수정"></td>
        </tr>
        </table>
    </form>
</body>
</html>
`
}