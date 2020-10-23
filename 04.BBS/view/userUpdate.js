const tm = require("./template");

module.exports.Updateuser = function (navBar, result) {
    return `
            ${tm.header()}
        ${navBar}
    <div class="container" style="margin-top: 90px">
	<form action="/user/mypage/update" method="post">
		<input type="hidden" id="uid" name="uid" value="${result.uid}">
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<h3> 내 정보 수정 </h3>
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
			<div class="col-4"></div>
			<div class="col-4">
				<table class="table table-borderless">
					<tr>
						<td style="text-align:right";>아이디</td>
						<td><label name="uid" id="uid">${result.uid}</label></td>
					</tr>
					<tr>
						<td style="text-align:right";>이름</td>
						<td><input type="text" name="uname" id="uname" values="${result.uname}"></td>
					</tr>
					<tr>
						<td style="text-align:right";>비밀번호</td>
						<td><input type="password" name="pwd" id="pwd"></td>
					</tr>
					<tr>
						<td style="text-align:right";>비밀번호 확인</td>
						<td><input type="password" name="pwd2" id="pwd2"></td>
					</tr>
					<tr>
						<td style="text-align:right";>전화번호</td>
						<td><input type="text" name="tel" id="tel" values="${result.tel}"></td>
					</tr>
					<tr>
						<td style="text-align:right";>이메일</td>
						<td><input type="text" name="email" id="email" values="${result.email}"></td>
					</tr>
				</table> 
			</div>
			<div class="col-4"></div>
		</div>
		<div class="row">
			<div class="col-1"></div>
			<div class="col-10">
				<div style="text-align: center;margin-top: 10px;">
					<button type="submit" class="btn btn-primary" value="수정">확인</button>
					<button type="reset" class="btn btn-secondary" value="취소" onclick="location.href='/'">취소</button>
				</div>	
			</div>
			<div class="col-1"></div>
		</div>
	</form>
	</div>
        ${tm.footer()}
    `
}