const mysql = require('mysql');
// const fs = require('fs');
// let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(require('fs').readFileSync('./mysql.json', 'utf8'));

let conn = mysql.createConnection({
    host: connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    database: connInfo.database,
    port: connInfo.port
}); // 로그인 후, connection이라는 결과(객체)를 준다

conn.connect();

let sql = `SELECT NAME, date_format(debut, '%Y-%m-%d') as debut FROM girl_group
WHERE debut BETWEEN '2009-01-01' AND '2009-12-31';`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.NAME, row.debut)
    }    
});

conn.end();