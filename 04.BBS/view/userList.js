const tm = require("./template");

module.exports.list = function (navBar, rows, pageNo, totalPage) {
    let userR = '';
    for (let row of rows) {
        userR += `<tr>
                    <td style="text-align: center;">${row.uid}</td>
                    <td style="text-align: center;">${row.uname}</td>
                    <td style="text-align: center;">${row.tel}</td>
                    <td style="text-align: center;">${row.email}</td>
                    <td style="text-align: center;">${row.regDate}</td>
                    <td style="text-align: center;">${row.isDeleted}</td>
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
            pages += `<li class="page-item"><a class="page-link" href="/user/list/${page}">${page}</a></li>`;
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
                            <label for="uid">아이디</label></th>
                        <th style="width: 300px;text-justify: auto;text-align: center;">
                            <label for="uname">이름</label></th>
                        <th style="width: 100px;text-justify: auto;text-align: center;">
                            <label for="tel">전화번호</label></th>
                        <th style="width: 100px;text-justify: auto;text-align: center;">
                            <label for="email">이메일주소</label></th>
                        <th style="width: 100px;text-justify: auto;text-align: center;">
                            <label for="regDate">가입일</label></th>
                        <th style="width: 100px;text-justify: auto;text-align: center;">
                            <label for="isDeleted">탈퇴현황</label></th>
                        </tr>
                        ${userR}
                    </table> 
                <ul class="pagination justify-content-center">
                    ${pages}
                </ul>
			</div>
			<div class="col-1"></div>
		</div>
	</div>
        ${tm.footer()}
    `
}