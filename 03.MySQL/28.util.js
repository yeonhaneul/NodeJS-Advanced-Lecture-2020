const crypto = require('crypto');

module.exports = {
    generateHash: function(something) {
        let shasum = crypto.createHash('sha256');
        shasum.update(something);
        return shasum.digest('base64');
    },
    isLoggedIn: function(req, res, next) {
        if (!req.session.uid) {  //로그인 된 상태인지 확인
            res.redirect('/login')
        } else {
            next();
        }
    }
}