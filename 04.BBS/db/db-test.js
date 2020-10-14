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

let sql = `create table if not exists bbs(
	bid int not null auto_increment,
	uid varchar(20) not null,
	title varchar(100) not null,
	content varchar(1000),
	modTime datetime default current_timestamp,
	viewCount int default 0,
	isDeleted int default 0,
    primary key (bid),
    foreign key (uid) references users(uid))
	auto_increment=1001;`;
let conn = getConnection();
conn.query(sql, function(error, fields) {
if (error)
    console.log(error);
});
conn.end();