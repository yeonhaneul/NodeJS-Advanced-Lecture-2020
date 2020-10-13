const mysql = require('mysql');
const crypto = require('crypto');
const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8')
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});

conn.connect();

let shasum = crypto.createHash('sha256');
shasum.update('1234');  //원하는 비밀번호를 입력
let output = shasum.digest('base64');

let sql = `insert into users(uid, pwd, name) values(?, ?, ?);`;
let params = ['sylee', output, '이수연']            
conn.query(sql, params, function(error, fields) {
    if (error)
    console.log(error);
});


conn.end();
