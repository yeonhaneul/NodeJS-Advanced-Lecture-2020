const express = require('express');
const util = require('util');

const app = express();

app.get('/', function (req, res) {
    let agent = req.header('User-Agent');    // network의 requestHeader의 user-agent를 갖고옴
    
    if (agent.toLowerCase().match(/chrome/)) {
        res.send(`크롬 브라우저 입니다.`);
    }else {
        res.send(`크롬 브라우저가 아닙니다.`);
    }
}); 

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
})