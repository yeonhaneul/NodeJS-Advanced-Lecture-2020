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

let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
            DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, b.viewCount, b.replyCount
            FROM bbs AS b
            JOIN users AS u
            ON b.uid=u.uid
            WHERE b.isDeleted=0 AND b.title='
            ORDER BY b.bid DESC`
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end();


/* let sql = `SELECT r.rid, r.bid, u.uid, r.content,
DATE_FORMAT(r.regTime, '%Y-%m-%d %T') as regTime, r.isMine
FROM reply AS r
JOIN users AS u
ON r.uid=u.uid
WHERE r.bid=1017
ORDER BY r.rid DESC;`
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */

/* 
let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, b.viewCount, b.replyCount
FROM bbs AS b
JOIN users AS u
ON b.uid=u.uid
WHERE b.isDeleted=0 AND b.title=?
ORDER BY b.bid DESC;`
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */

/* let sql = `UPDATE bbs SET viewCount = viewCount+1
WHERE bid=?`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */


/* let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() +1;
month = month>=10? month:'0'+month;
let day = date.getDate();
day = day>=10? day:'0'+day;
let hour = date.getHours();
hour = hour>=10? hour:'0'+hour;
let min = date.getMinutes();
min = min>=10? min:'0'+min;
let sec = date.getSeconds();
sec = sec>=10? sec:'0'+sec;
let now = year+'-'+month+'-'+day+' '+hour+':'+min+":"+sec;
console.log(now); */

/* let sql = `SELECT b.bid, u.uid, b.title, b.content, u.uname, 
DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime,
b.viewCount, b.replyCount
FROM bbs AS b
JOIN users AS u
on b.uid=u.uid
WHERE b.isDeleted=0
ORDER BY b.bid DESC
LIMIT 10 offset ?;`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */


/* let sql = `create table if not exists reply (
    rid int not null primary key auto_increment,
    bid int not null,
    uid varchar(20) not null,
    content varchar(100),
    regTime datetime default current_timestamp,
    isMine int default 0,
    foreign key(bid) references bbs(bid),
    foreign key(uid) references users(uid)
);`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end(); */


/* let sql = `SELECT bid, uid, title, content,
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
conn.end(); */

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