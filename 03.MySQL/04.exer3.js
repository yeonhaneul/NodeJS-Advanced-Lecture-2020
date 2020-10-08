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

let sql = `SELECT le.Continent as continent, COUNT(*) as countCont,
    round(SUM(le.GNP)) AS sumCont,
    round(avg(le.GNP)) AS avgCont
    FROM country
    GROUP BY Continent;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.countCont, row.sumCont, row.avgCont);
    }    
});

conn.end();