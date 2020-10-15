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

let sql = `SELECT bid, uid, title, content,
DATE_FORMAT(modTime, '%Y-%m-%d') AS sDate,
DATE_FORMAT(modTime, '%T') AS sTime,
users.uname, viewCount, bbs.isDeleted, replyCount FROM bbs
left JOIN users
using(uid)
ORDER BY bid DESC;`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end();

/* let sql = `SELECT bid, uid, title, content, DATE_FORMAT(modTime, '%Y-%m-%d %T') AS regDate, viewCount, isDeleted, replyCount
FROM bbs WHERE isDeleted=0
ORDER BY bid desc`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */

/* let sql = `create table if not exists bbs (
    bid int not null primary key auto_increment,
    uid varchar(20) not null,
    title varchar(100) not null,
    content varchar(1000),
    modTime datetime default current_timestamp,
    viewCount int default 0,
    isDeleted int default 0,
    foreign key(uid) references users(uid)
) auto_increment=1001;`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */

/* let sql = `;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */