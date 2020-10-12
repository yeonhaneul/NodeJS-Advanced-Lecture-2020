const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
    let conn = mysql.createConnection({
        host:   config.host,
        user:   config.user,
        password:   config.password,
        database:   config.database,
        port:   config.port
    });
    conn.connect(function(error) {
        if (error) {
            console.log('mysql connection error:' + error);
        }
    });
    return conn;
}

let conn = getConnection();
    let sql = `SELECT * FROM girl_group ORDER BY ggid;`;
    conn.query(sql, (error, rows, fields) => {
        if (error)
        console.log(error);
    });
    conn.end()

/* let sql = `select * from song where sid=?;`;
let conn = getConnection();
conn.query(sql, 136, function(error, rows, fields) {
if (error)
    console.log(error);
console.log(rows[0]);
});
conn.end(); */
/* 
let sql = `delete from song where sid=?`;
let conn = getConnection();
conn.query(sql, 134, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end();
 */