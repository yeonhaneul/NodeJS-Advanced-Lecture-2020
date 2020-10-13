const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');
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
        let sql = `SELECT uid, uname, DATE_FORMAT(regDate, '%Y-%m-%d %T') AS regDate
                FROM users WHERE isDeleted=0
                ORDER BY regDate;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
            console.log(error);
            callBack(rows);
        });
        conn.end()
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
    },
    generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something);
        return shasum.digest('base64');
    }
}