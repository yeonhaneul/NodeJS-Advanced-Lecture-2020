module.exports.mainForm = function (rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td style="text-align: center;">${row.ggid}</td>
                        <td>${row.name}</td>
                        <td style="text-align: center;">${row.debut}</td>
                        <td style="text-align: center;">${row.hit_song_id}</td>
                        <td style="text-align: center;"><a href="/update/${row.ggid}">수정</a>
                            <a href="/delete/${row.ggid}">삭제</a>
                        </td style="text-align: center;">
                    </tr>`;
    }
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>걸그룹 조회</title>
</head>
<body>
    <h3>걸그룹 조회</h3>
    <hr>
    <table>
        <tr>
            <th style="text-align: center;">id</th>    
            <th style="text-align: center;">걸그룹명</th>
            <th style="text-align: center;">데뷔일</th>
            <th style="text-align: center;">hit song id</th>
            <th style="text-align: center;">액션</th>
        </tr>
        ${tableRow}
    </table>
</body>
</html>
        `
}