const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/gg-db-module');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
    dm.getAllLists(rows => {
        const view = require('./view/gglist');
        let html = view.mainForm(rows)  //row를 전달해주기위해 아래로 가기
        res.end(html);
    });
}); 


app.get('/insert', (req, res) => {
    const view = require('./view/gginsert');
    let html = view.insertForm();
    res.send(html);
    });

app.post('/insert', (req, res) => {
    let name = req.body.name;
    let debut = req.body.debut;
    let params = [name, debut];
    dm.insertSong(params, () => {
        res.redirect('/');
    });
});

app.get('/delete/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    console.log(ggid);
    dm.deleteGg(ggid, () => {
        res.redirect('/');
    });
});

app.get('/update/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    dm.getGg(ggid, result => {
        const view = require('./view/ggupdate')
        let html = view.updateForm(result)
        res.send(html);
    });
});

app.post('/update', (req, res) => {
    let ggid = parseInt(req.body.ggid);
    let name = req.body.name;
    let debut = req.body.debut;
    let params = [name, debut, ggid];
    dm.updateGg(params, () => {
        res.redirect('/');
    });
});

app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000');
});