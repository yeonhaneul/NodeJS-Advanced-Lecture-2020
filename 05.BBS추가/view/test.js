const template = require("./template");

module.exports.test = function () {
    return `
        ${template.header()}
<div class="container" style="margin-top: 90px">
    <p>이곳에 컨텐츠 넣기</p>
</div>
        ${template.footer()}
    `
}