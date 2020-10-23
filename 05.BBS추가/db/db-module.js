const fs = require('fs');
const mysql = require('mysql');
const { param } = require('../userRouter');
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
        let sql = `INSERT INTO users(uid, pwd, uname, tel, email, photo) VALUES(?,?,?,?,?,?);`;
        conn.query(sql, params, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    createBbs: function(params, callback) {
        let conn = this.getConnection();
        let sql = `insert into bbs(uid, title, content) values(?,?,?)`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getUserInfo: function(uid, callback) {
        let conn = this.getConnection();
        let sql = `select uid, pwd, uname, tel, email, date_format(regDate,'%Y-%m-%d') As regDate, isDeleted, photo from users where uid like ?;`;
        conn.query(sql, uid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows[0]);
        });
        conn.end();
    },
    getUserList: function(offset, callBack) {
        let conn = this.getConnection();
        let sql = `select uid, uname, tel, email,
                    DATE_FORMAT(regDate, '%Y-%m-%d %T') As regDate,
                    isDeleted, photo from users
                    order by regDate desc
                    LIMIT 10 offset ?;`;
        conn.query(sql, offset, (error, rows, fields) => {
            if (error)
            console.log(error);
            callBack(rows);
        });
        conn.end()
    },
    userTotalCount:      function(callback) {
        let conn = this.getConnection();
        let sql = `select count(*) as count from users where isDeleted=0;`;
        conn.query(sql, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   // 주의할 것
        });
        conn.end();
    },
    userDelete: function(uid, callback) {
        let sql = `update users set isDeleted='1' where uid LIKE ?;`;
        let conn = this.getConnection();
        conn.query(sql, uid, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    userUpdate: function(params, photo, uid, callback) {
        let conn = this.getConnection();
        let sql;
        if (photo) {
            sql = `update users set pwd=?, uname=?, tel=?, email=?, photo=? where uid like ?;`;
            params.push(photo);
            params.push(uid);
        } else{
            sql = `update users set pwd=?, uname=?, tel=?, email=? where uid like ?;`;
            params.push(uid);
        }
        conn.query(sql, params, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    getViewData: function(bid, callBack) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
                DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, b.viewCount, b.replyCount
                FROM bbs AS b
                JOIN users AS u
                ON b.uid=u.uid
                WHERE bid=?;`;
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callBack(rows[0]);
        });
        conn.end()
    },
    incrementViewCount: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET viewCount=viewCount+1
        WHERE bid=?`;
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end()
    },
    searchList: function(keyword, callBack) {
        let conn = this.getConnection();
        let sql = `SELECT b.bid, b.uid, u.uname, b.title, b.content, 
        DATE_FORMAT(b.modTime, '%Y-%m-%d %T') as modTime, b.viewCount, b.replyCount, b.isDeleted
            FROM bbs AS b
            JOIN users AS u
            ON b.uid=u.uid
            WHERE b.isDeleted=0 AND b.title like ?
            order by b.bid desc`;
        conn.query(sql, keyword, (error, rows, fields) => {
            if (error)
                console.log(error);
            callBack(rows);
        });
        conn.end()
    },
    updateBbsList: function(params, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set title=?, content=?, modTime=now() where bid=?;`;
        conn.query(sql, params, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    bbsDelete: function(bid, callback) {
        let sql = `update bbs set isDeleted=1 where bid=?;`;
        let conn = this.getConnection();
        conn.query(sql, bid, function(error, fields) {
        if (error)
            console.log(error);
        callback();
        });
        conn.end();
    },
    getReplyData: function(bid, callback) {
        let sql = `SELECT r.rid, r.bid, u.uid, r.content, u.uname,
        DATE_FORMAT(r.regTime, '%Y-%m-%d %T') as regTime, r.isMine
        FROM reply AS r
        JOIN users AS u
        ON r.uid=u.uid
        WHERE r.bid=?
        ORDER BY r.rid`;
        let conn = this.getConnection();
        conn.query(sql, bid, function(error, replies, fields) {
        if (error)
            console.log(error);
        callback(replies);
        });
        conn.end()
    },
    insertReplyData: function(params, callback) {
        let conn = this.getConnection();
        let sql = `insert into reply(bid, uid, content, isMine) VALUES(?,?,?,?)`;
        conn.query(sql, params, function (error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    incrementReplyCount: function(bid, callback) {
        let conn = this.getConnection();
        let sql = `UPDATE bbs SET replyCount=replyCount+1 WHERE bid=?`;
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end()
    }
}
