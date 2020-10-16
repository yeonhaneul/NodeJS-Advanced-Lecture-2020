const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports = {
    getConnection: function() {
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
    },
    bbsTotalCount: function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT count(*) as count FROM bbs where isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    },
    getJoinLists: function(offset, callBack) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
                DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, b.viewCount, b.replyCount
                FROM bbs AS b
                JOIN users AS u
                ON b.uid=u.uid
                WHERE b.isDeleted=0
                ORDER BY b.bid DESC 
                LIMIT 10 offset ?;`;
        conn.query(sql, offset, (error, rows, fields) => {
            if (error)
            console.log(error);
            callBack(rows);
        });
        conn.end()
    },
    insertReg: function(params, callback) {
        let conn = this.getConnection();
        let sql = `INSERT INTO users(uid, pwd, uname, tel, email) VALUES(?,?,?,?,?);`;
        conn.query(sql, params, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    createBbs: function(params, callback) {
        let conn = this.getConnection();
        let sql = `insert into users(title, content) values(?,?)`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getUserInfo: function(uid, callback) {
        let conn = this.getConnection();
        let sql = `select * from users where uid like ?;`;
        conn.query(sql, uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);
        });
        conn.end();
    }
}