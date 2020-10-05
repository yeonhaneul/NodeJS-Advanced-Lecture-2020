const express = require('express');
const util = require('util');

const app = express();

// localhost:3000/query?id=kim
app.get('/query', function (req, res) {
    let id = req.query.id;
    res.send(`<h1>id - ${id}</h1>`);
}); 

// localhost:3000/rest/id/kim
app.get('/rest/id/:id', function (req, res) {
    let id = req.params.id;
    res.send(`<h1>id - ${id}</h1>`);
}); 

// localhost:3000/rest2/kim
app.get('/rest2/:id', function (req, res) {
    let id = req.params.id;
    res.send(`<h1>id - ${id}</h1>`);
}); 


app.get('*', (req, res) => {    //  주소맨뒤에 / 외의 다른것이 나오면 error 메세지를 보내겠다.
    res.status(404).send('Path not found'); // method chaining(메소드 체이닝)
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
})