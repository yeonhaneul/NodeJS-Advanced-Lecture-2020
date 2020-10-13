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

function generateHash(something) {
    let shasum = crypto.createHash('sha256');
    shasum.update(something);
    return shasum.digest('base64');
}

// 사용자가 입력한 uid와 pwd를 각각 'admin', '1234'로 가정
let uid = 'admin';  // req.body.uid
let pwd = '1234';   // req.body.pwd
let pwdHash = generateHash(pwd);

let sql = `select * from users where uid like ?;`;
conn.query(sql, uid, function(error, results, fields) {
    if (error)
        console.log(error);
    let result = results[0]; // results가 array로 나오기때문에 result에 어레이를 정의
    // console.log(result);
    if (result === undefined) {
        console.log(`Login 실패: uid ${uid}이/가 없습니다.`)
    } else {
        if (result.pwd === pwdHash) {
            console.log('Login 성공');
        } else {
            console.log('Login 실패: 패스워드가 다릅니다.');
        }
    }
});

conn.end();
