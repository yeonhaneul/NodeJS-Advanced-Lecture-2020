const tm = require("./template");
const ut = require('../util');

module.exports.searchList = function (navBar, rows, pageNo, totalPage) {
    let tableRow = '';
    for (let row of rows) {
        let today = new Date();
        let now  = ut.getNow(today);
        let mod = row.modTime;
        let eMod = (now.substr(0,10)===mod.substr(0,10) ? mod.substr(11):mod.substr(0,10));
        tableRow += `<tr>
                        <td style="text-align: center;">${row.bid}</td>
                        <td><a href="/bbs/view/${row.bid}">${row.title}</a></td>
                        <td style="text-align: center;">${row.uname}</td>
                        <td style="text-align: center;">${eMod}</td>
                        <td style="text-align: center;">${row.viewCount}</td>
                    </tr>`;
    };
    // 페이지 지원
    let pages = `<li class="page-item disabled">
                    <a class="page-link active" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page=1; page <= totalPage; page++) {
        if (page === pageNo)
            pages += `<li class="page-item active" aria-current="page">
                        <span class="page-link">
                            ${page}<span class="sr-only">(current)</span>
                        </span>
                    </li>`;
        else
            pages += `<li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>`;
    }
    pages += `<li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span></a>
            </li>`;
    return `
            ${tm.header()}
        ${navBar}
        <div class="container" style="margin-top: 90px">
        <form action="/bbs/search" method="post">
            <div class="row">
                <dib class="col-12">
                    <h2>검색 결과</h2>
                <div class="col-1"></div>
                <div class="col-10">
                        <table class="table table-hover">
                            <tr>
                            <th style="width: 100px;text-justify: auto;text-align: center;">
                                <label for="bid">번호</label></th>
                            <th style="width: 300px;text-justify: auto;text-align: center;">
                                <label for="title">제목</label></th>
                            <th style="width: 100px;text-justify: auto;text-align: center;">
                                <label for="uname">글쓴이</label></th>
                            <th style="width: 100px;text-justify: auto;text-align: center;">
                                <label for="regDate">날짜</label></th>
                            <th style="width: 100px;text-justify: auto;text-align: center;">
                                <label for="viewCount">조회수</label></th>
                            </tr>
                            ${tableRow}
                        </table>
                    <ul class="pagination justify-content-center">
                        ${pages}
                    </ul>
                        </table>
                </div>
                <div class="col-1"></div>
            </div>
        </form>
	</div>
        ${tm.footer()}
    `
}