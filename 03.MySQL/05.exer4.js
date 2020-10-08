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

let sql = `SELECT continent,
    le.Name AS countryName,
    ri.Name AS cityName, ri.Population AS population
    FROM country AS le
    JOIN citycopy AS ri
    ON le.Code=ri.CountryCode
    WHERE Continent='asia'
    ORDER BY population DESC
    LIMIT 10;`;
conn.query(sql, function(error, rows, fields) {
    if (error)
        console.log(error);
    for (let row of rows) {
        console.log(row.continent, row.countryName, row.cityName, row.population);
    }    
});

conn.end();