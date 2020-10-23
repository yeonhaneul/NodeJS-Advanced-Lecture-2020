const tm = require("./template");
const ut = require('../util');

module.exports.list = function (navBar, rows, pageNo, totalPage) {
    let tableRow = '';
    for (let row of rows) {
        let today = new Date();
        let now  = ut.getNow(today);
        let modT = row.modTime;
        let eMod = (now.substring(0,10) === modT.substring(0,10) ? modT.substring(11):modT.substring(0,10));
        let title = (row.replyCount === 0) ? row.title:`${row.title}<span class="text-danger"> [${row.replyCount}]</span>`;
        tableRow += `<tr>
                        <td style="text-align: center;">${row.bid}</td>
                        <td><a href="/bbs/view/${row.bid}">${title}</a></td>
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
		<div class="row">
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
	</div>
        ${tm.footer()}
    `
}