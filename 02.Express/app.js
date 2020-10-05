const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const view = require('./view/index');
const template = require('./view/template.js');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
    if (req.query.id === '/') {
        fs.readdir('data', function(error, filelist) {
            let list = template.listGen(filelist);
            let content = template.HOME_CONTENTS;
            content = content.replace(/\n/g, '<br>');
            let control = template.buttonGen();
            let html = view.index('Web 기술', list, content, control); // content를 넣을 수 있게된다.
            res.end(html);
        });
    } else{
        fs.readdir('data', function(error, filelist) {
            let list = template.listGen(filelist);
            let title = req.query.id;
            let control = template.buttonGen(title);
            let filename = 'data/' + title + '.txt';
            fs.readFile(filename, 'utf8', (error, buffer) => {
                buffer = buffer.replace(/\n/g, '<br>');
                let html = view.index(title, list, buffer, control);
                res.end(html);
            });
        });
    }
});

app.get('/create', (req, res) => {
    fs.readdir('data', function(error, filelist) {
        let list = template.listGen(filelist);
        let content = template.createForm();
        let control = template.buttonGen();
        let html = view.index('글 생성', list, content, control);
            res.end(html);
        });
});

app.post('/creat', (req, res) => {
    body = '';
        req.on('data', function(data) {
            body += data;
        })
        req.on('end', function() {
            let param = qs.parse(body);     // body 부터 이곳까지는 사용자의 데이터를 불러오기 (쿼리 스트링으로 제목과 내용을 나눈다.)
            // console.log(param.subject, param.description);   // template화면의 name으로 준 값 (subject, descirption)
            let filepath = 'data/' + param.subject + '.txt' // 파일명
            fs.writeFile(filepath, param.description, error => {    //새로운 파일 생성을 위한 값
                let encoded = encodeURI(`/?id=${param.subject}`);
                console.log(encoded);
                res.writeHead(302, {'Location': encoded});  // id=xxx로 들어가게된다.
                res.end();
            });
        });
});

app.get('/delete', (req, res) => {
    fs.readdir('data', function(error, filelist) {
        let list = template.listGen(filelist);
        let content = template.deleteForm(query.id);
        let control = template.buttonGen();
        let html = view.index('글 삭제', list, content, control);
            res.end(html);
        });
});

app.post('/delete', (req, res) => {
    body = '';
        req.on('data', function(data) {
            body += data;
        })
        req.on('end', function() {
            let param = qs.parse(body);
            let filepath = 'data/' + param.subject + '.txt';
            fs.unlink(filepath, error => {
                res.writeHead(302, {'Location': '/'});
                res.end();
            })
            });
});

app.get('update', (req, res) => {
    fs.readdir('data', function(error, filelist) {
        let list = template.listGen(filelist);
        let title = query.id;
        let control = template.buttonGen();
        let filename = 'data/' + title + '.txt';
        fs.readFile(filename, 'utf8', (error, buffer) => {
            let content = template.updateForm(title, buffer);
            let html = view.index(`${title} 수정`, list, content, control);
            res.end(html);
        });
    });
});

app.post('update', (req, res) => {
    body = '';  // form에 name이 기재되어있는 것을 불러온다.
        req.on('data', function(data) {
            body += data;
        })
        req.on('end', function() {
            let param = qs.parse(body);
            // console.log(param.original, param.subject, param.description);
            let filepath = 'data/' + param.original + '.txt';
            fs.writeFile(filepath, param.description, error => {
                let encoded = encodeURI(`/?id=${param.subject}`);
                // console.log(encoded);
                /* if (param.original !== param.subject) {
                    fs.rename(filepath, `data/${param.subject}.txt`, error => {
                        res.writeHead(302, {'Location': encoded});
                        res.end();    
                    });
                } else {
                    res.writeHead(302, {'Location': encoded});  // id=xxx로 들어가게된다.
                    res.end();
                } */
                if (param.original !== param.subject) {
                    fs.renameSync(filepath, `data/${param.subject}.txt`);
                }
                res.writeHead(302, {'Location': encoded});
                res.end(); 
            });
        });
}).listen(3000, () => {
    console.log('Server Running at http://localhost:3000')
});