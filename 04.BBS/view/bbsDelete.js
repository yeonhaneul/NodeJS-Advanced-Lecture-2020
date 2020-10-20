const tm = require("./template");

module.exports.deleteBbs = function (navBar, result) {
    return `
            ${tm.header()}
        ${navBar}
		<div class="container" style="margin-top: 100px">
		<form action="/bbs/delete/${result.bid}" method="post">
			<input type="hidden" id="uid" name="uid" value="${result.uid}">
			<div class="row">
				<div class="col-1"></div>
				<div class="col-6">
					<h3> 글 삭제 </div>
				<div class="1"></div>
			</div>
				<div class="col-12">
						<hr style="border: solid 1px cornflowerblue;">
				</div>
			<div class="row">
				<div class="col-1"></div>
				<div class="col-10">
					<h5 style="text-align: center;">정말 삭제하시겠습니까?</h5>
				</div>
				<div class="col-1"></div>
			</div>
			<div class="row">
				<div class="col-1"></div>
				<div class="col-10">
					<div style="text-align: center;margin-top: 10px;">
						<button type="submit" class="btn btn-success" value="확인">확인</button>	
						<button class="btn btn-secondary" value="취소" onclick="location.href='/view/${result.bid}'">취소</button>
					</div>
				</div>
				<div class="col-1"></div>
			</div>
		</form>
	</div>
        ${tm.footer()}
    `;
}