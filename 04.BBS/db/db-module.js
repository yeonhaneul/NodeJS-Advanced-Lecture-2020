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
    getAllLists: function(callBack) {
        let conn = this.getConnection();
        let sql = `SELECT * FROM bbs
        JOIN users
        ON bbs.uid=users.uid
        ORDER BY bid DESC;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
            console.log(error);
            callBack(rows);
        });
        conn.end()
    },
    getJoinLists: function(callBack) {
        let conn = this.getConnection();
        let sql = `SELECT bid, uid, title, content, uname, 
            DATE_FORMAT(modTime, '%Y-%m-%d %T') AS modTime,
            viewCount, bbs.isDeleted, replyCount FROM bbs
            left JOIN users
            using(uid)
            ORDER BY bid DESC;`;
        conn.query(sql, (error, rows, fields) => {
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
    createBbs: function(req, res) {
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