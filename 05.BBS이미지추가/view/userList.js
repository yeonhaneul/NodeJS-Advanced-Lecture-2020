const tm = require("./template");

module.exports.List = function (navBar, rows, pageNo, totalPage) {
    let userR = '';
    for (let row of rows) {
        let isDeleted = parseInt(row.isDeleted);
        userR += `<tr style="text-align: center;">
                    <td><a href="/user/mypage/uid/${row.uid}">${row.uid}</a></td>
                    <td><img src="${row.photo}" height="30px"></td>
                    <td><a href="/user/mypage/uid/${row.uid}">${row.uname}</a></td>
                    <td>${isDeleted===0 ? '-':'탈퇴'}</td>
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
			<div class="col-2"></div>
			<div class="col-8">
					<table class="table table-hover">
                        <tr>
                        <th style="text-justify: auto;text-align: center;">
                            <label for="uid">아이디</label></th>
                        <th style="text-justify: auto;text-align: center;">
                            <label for="photo">사진</label></th>
                        <th style="text-justify: auto;text-align: center;">
                            <label for="uname">이름</label></th>
                        <th style="text-justify: auto;text-align: center;">
                            <label for="isDeleted">탈퇴현황</label></th>
                        </tr>
                        ${userR}
                    </table> 
                <ul class="pagination justify-content-center">
                    ${pages}
                </ul>
			</div>
			<div class="col-2"></div>
		</div>
	</div>
        ${tm.footer()}
    `
}