const template = require("./template");


module.exports.createBbs = function (navBar) {
    return `
			${template.header()}
		${navBar}

<div class="container" style="margin-top: 90px">
	<form action="/bbs/create" method="post">
	<div class="row">
		<div class="col-10">
			<h3 style="margin-top: 20px;"><strong>글 작성</strong></h3>
			<hr>
		</div>
		<div class="col-1"></div>
		<div class="col-10">
				<label for="title">제목:</label>
				<input type="text" name="title" class="form-control" style="margin-bottom: 10px;"
					placeholder="제목을 입력해주세요." required>
				<div class="form-group">
					<label for="content">내용:</label>
					<textarea class="form-control" rows="10" name="content"
						placeholder="내용을 입력해주세요" required></textarea>
				</div>
				<div style="text-align: center;margin-top: 10px;">
					<button type="submit" class="btn btn-primary" value="확인">확인</button>	
					<button type="submit" class="btn btn-secondary" value="취소" onclick="location.href='/'">취소</button>
				</div>
				</div>
				<div class="col-1"></div>
				</div>
	</form>
</div>
        ${template.footer()}
    `
}
