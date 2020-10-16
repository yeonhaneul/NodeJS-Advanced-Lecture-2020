const template = require("./template");


module.exports.createBbs = function () {
    return `
        ${template.header()}

<div class="container" style="margin-top: 90px">
	<div class="row">
		<div class="col-10">
			<h3 style="margin-top: 20px;"><strong>글 작성</strong></h3>
			<hr>
		</div>
		<div class="col-1"></div>
		<div class="col-10">
			<form action="/bbs/create" method="post">
				<input type="text" name="Title" class="form-control" style="margin-bottom: 10px;"
					placeholder="제목을 입력해주세요." required>
				<div class="form-group">
					<textarea class="form-control" rows="10" name="Content"
						placeholder="내용을 입력해주세요" required></textarea>
				</div>
				<div style="text-align: center;margin-top: 10px;">
					<button type="submit" class="btn btn-success" value="확인">확인</button>	
					<button type="submit" class="btn btn-secondary" value="취소" onclick="location.href='/'">취소</button>
				</div>
			</form>
		</div>
		<div class="col-1"></div>
	</div>
</div>
        ${template.footer()}
    `
}
