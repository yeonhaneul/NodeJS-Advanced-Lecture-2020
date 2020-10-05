const express = require('express');
const util = require('util');
const shoppingRouter = require('./07.shoppingRouter');

const app = express();
app.use(express.static(__dirname + '/public'));

let customerRouter = express.Router();
app.use('/shopping', shoppingRouter);
app.use('/customer', customerRouter);

// 쇼핑은 쇼핑라운터가, 커스터머는 커스터머라우터가, 그 외 일반적인 / 는 일반적으로 처리한다.
app.get('/', function (req, res) {
    res.send('<h1>Root Router<h1>');
}); 

customerRouter.get('/', function (req, res) {
    res.send('<h1>Customer Router<h1>');
});
customerRouter.get('/index', function (req, res) {
    res.send('<h1>Customer Router Index<h1>');
});

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
});

app.listen(3000, () => {
    util.log('Server running at http://127.0.0.1:3000');
})