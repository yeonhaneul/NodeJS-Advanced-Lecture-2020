const fs = require('fs');
const mysql = require('mysql');
// const crypto = require('crypto');
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
                ORDER BY regDate;`; //isDeleted가 0인것만 보이도록 선택되어있음
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
    /* generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something);
        return shasum.digest('base64');
    }, */
    deleteUser: function(uid, callback) {   // DB상의 자료가 update되어 isDeleted가 1이 되도록 해야한다.
        let conn = this.getConnection();
        let sql = `update users set isDeleted=1 where uid like ?;`;
        conn.query(sql, uid, (error, fields) => {
            if (error)
                console.log(error);
            callback(); //받는게 없기때문에 callback은 비워놓는다.
        });
        conn.end();
    },
    updateUser: function(params, callback) {    //여러개를 받아야하여 params로 받는다.
        let conn = this.getConnection();
        let sql = `update users set pwd=? where uid like ?;`; // pwd가 먼저, uid가 나중
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}