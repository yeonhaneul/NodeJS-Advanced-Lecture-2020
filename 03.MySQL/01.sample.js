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

let sql = 'select * from city where population > 9000000';
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.ID, row.Name, row.CountryCode, row.District, row.Population)
    }    
});

conn.end();