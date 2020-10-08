const mysql = require('mysql');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let connInfo = JSON.parse(info);

let conn = mysql.createConnection({
    host: connInfo.host,
    user: connInfo.user,
    password: connInfo.password,
    database: connInfo.database,
    port: connInfo.port
}); // 로그인 후, connection이라는 결과(객체)를 준다
 
conn.connect();

let sql = `SELECT le.name as name,
    date_format(le.debut, '%Y-%m-%d') as debutDate, ri.title as title
    FROM girl_group AS le
    JOIN song AS ri
    ON le.hit_song_id=ri.sid
    WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
    ORDER BY debut;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.name, row.debutDate, row.title);
    }    
});

conn.end();