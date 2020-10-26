const template = require("./template");

module.exports.updateBbs = function (navBar, result) {
	return `
		${template.header()}
		${navBar}
	<div class="container" style="margin-top: 90px">
		<form action="/bbs/update" method="post">
			<input type="hidden" name="uid" value="${result.uid}">
			<input type="hidden" name="bid" value="${result.bid}">
			<input type="hidden" name="modTime" value="${result.modTime}">
			<div class="row">
				<div class="col-10">
					<h3 style="margin-top: 20px;"><strong>글 수정</strong></h3>
					<hr>
				</div>
				<div class="col-1"></div>
				<div class="col-10">
					<div>
						<label for="title">제목:</label>
						<input type="text" name="title" id="title" class="form-control" style="margin-bottom: 10px;"
						value="${result.title}">
					</div>
					<div>
						<label for="content">내용:</label>
						<textarea class="form-control"  name="content" id="content" rows="5"
							value="${result.content}">${result.content}</textarea>
					</div>
					<div style="text-align: center;margin-top: 10px;">
						<button type="submit" class="btn btn-primary" value="수정">수정</button>	
						<button class="btn btn-secondary" value="취소" onclick="location.href='/bbs/view/${result.bid}'">취소</button>
					</div>
				</div>
				<div class="col-1"></div>
			</div>
		</form>
	</div>
        ${template.footer()}
    `
}