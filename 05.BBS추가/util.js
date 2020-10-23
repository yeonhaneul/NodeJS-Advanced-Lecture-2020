const crypto = require('crypto');

module.exports = {
    generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something);
        return shasum.digest('base64');
    },
    isLoggedIn:     function(req, res, next) {
        if (!req.session.uid) {    
            res.redirect('/login');
        } else {
            next();
        }
    },
    isLoggedIn: function(req, res, next) {
        if (!req.session.uid) {  //로그인 된 상태인지 확인
            res.redirect('/login')
        } else {
            next();
        }
    },
    getNow: function (date) {
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
        return year+'-'+month+'-'+day+' '+hour+':'+min+":"+sec;
    }
}