const template = require("./template");

module.exports.bbsList = function (rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td style="padding-right: 20px">${row.bid}</td>
                        <td style="padding-right: 20px">${row.title}</td>
                        <td style="padding-right: 20px">${row.uname}</td>
                        <td style="padding-right: 20px">${row.modTime}</td>
                        <td style="padding-right: 20px">${row.viewCount}</td>
                    </tr>`;
    }
    return `
        ${template.header()}
        <div class="container" style="margin-top: 90px">
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<form action="/listMain" method="post">
					<table class="table">
                        <tr>
                            <th style="width: 100px;text-align: center;">
                                <label for="bid">번호</label></th>
                            <th style="width: 300px;text-align: center;">
                                <label for="title">제목</label></th>
                            <th style="width: 100px;text-align: center;">
                                <label for="uname">글쓴이</label></th>
                            <th style="width: 100px;text-align: center;">
                                <label for="regDate">날짜</label></th>
                            <th style="width: 100px;text-align: center;">
                                <label for="viewCount">조회수</label></th>
                        </tr>
                        ${tableRow}
                    </table>
                    <button type="submit" class="btn btn-primary float-right" value="글쓰기"
						onclick="location.href='/bbs/create'">글쓰기</button>
				</form>
			</div>
			<div class="col-1"></div>
		</div>
	</div>
    </table>
    ${template.footer()}
    `
}