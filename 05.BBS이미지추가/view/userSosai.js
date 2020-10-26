const tm = require("./template");

module.exports.userList = function (navBar, result) {
    return `
            ${tm.header()}
        ${navBar}
	<div class="container" style="margin-top: 90px">
		<input type="hidden" id="uid" name="uid" value="${result.uid}">
        <div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<h3> 마이페이지 </h3>
			</div>
			<div class="col-1"></div>
		</div>
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<hr style="border: solid 1px cornflowerblue;">
			</div>
			<div class="col-1"></div>
		</div>
		<div class="row">
			<div class="col-3"></div>
			<div class="col-6">
				<table class="table table-borderless";>
					<tr>
						<td colspan="1"style="text-align: right;"><strong>아이디</strong></td>
						<td colspan="1"><label name="uid" id="uid">${result.uid}</label></td>
						<td rowspan="5">
							<img style="margin-left: 30px;" src="${result.photo}" width="150">
						</td>
					</tr>
					<tr>
						<td colspan="1" style="text-align: right;"><strong>이름</strong></td>
						<td colspan="1"><label name="uname" id="uname">${result.uname}</label></td>
					</tr>
					<tr>
						<td colspan="1" style="text-align: right;"><strong>전화번호</strong></td>
						<td colspan="1"><label name="tel" id="tel">${result.tel}</label></td>
					</tr>
					<tr>
						<td colspan="1" style="text-align: right;"><strong>이메일</strong></td>
						<td colspan="1"><label name="email" id="email">${result.email}</label></td>
					</tr>
					<tr>
						<td colspan="1" style="text-align: right;"><strong>가입일</strong></td>
						<td colspan="1"><label name="regDate" id="regDate">${result.regDate}</label></td>
					</tr>
					<tr>
						<td colspan="3" style="text-align: center;">
							<button type="submit" class="btn btn-primary" value="수정" id="update" name="update" onclick="location.href='/user/mypage/update/${result.uid}'">수정</button>
							<button type="submit" class="btn btn-danger" value="탈퇴" id="delete" name="delete" onclick="location.href='/user/mypage/delete/${result.uid}'">탈퇴</button>
							<button type="submit" class="btn btn-secondary" value="취소" onclick="location.href='/'">취소</button>
						</td>
					</tr>
				</table> 
			</div>
			<div class="col-3"></div>
		</div>
	</div>
        ${tm.footer()}
    `
}