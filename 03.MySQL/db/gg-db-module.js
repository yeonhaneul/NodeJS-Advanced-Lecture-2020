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
            port:   config.port,
            dateStrings : 'date'
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
        let sql = `SELECT*FROM girl_group ORDER BY ggid DESC;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
            console.log(error);
            callBack(rows);
        });
        conn.end()
    },
    insertSong: function(params, callback) {
        let sql = `INSERT INTO girl_group(NAME, debut) VALUES(?, ?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    deleteGg : function(ggid, callback) {
        let sql = `delete from girl_group where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    getGg : function(ggid, callback) {
        let sql = `select * from girl_group where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, function(error, rows, fields) {
        if (error)
            console.log(error);
        callback(rows[0]);
        });
        conn.end();
    },
    updateGg : function(params, callback) {
        let sql = `update girl_group set name=?, debut=? where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    }
}