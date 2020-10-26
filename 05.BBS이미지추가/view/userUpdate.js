const tm = require("./template");

module.exports.Updateuser = function (navBar, result) {
    return `
            ${tm.header()}
        ${navBar}
		<div class="container" style="margin-top: 90px">
		<form action="/user/mypage/update" method="post" enctype="multipart/form-data">
			<input type="hidden" name="uid" value="${result.uid}">
			<input type="hidden" name="pwdHash" value="${result.pwdHash}">
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
							<td style="text-align:right">아이디</td>
							<td><label name="uid" id="uid">${result.uid}</label></td>
						</tr>
						<tr>
							<td style="text-align:right">이름</td>
							<td><input type="text" name="uname" id="uname" value="${result.uname}"></td>
						</tr>
						<tr>
							<td style="text-align:right">비밀번호</td>
							<td><input type="password" name="pwd" id="pwd"></td>
						</tr>
						<tr>
							<td style="text-align:right">비밀번호 확인</td>
							<td><input type="password" name="pwd2" id="pwd2"></td>
						</tr>
						<tr>
							<td style="text-align:right">전화번호</td>
							<td><input type="text" name="tel" id="tel" value="${result.tel}"></td>
						</tr>
						<tr>
							<td style="text-align:right">이메일</td>
							<td><input type="text" name="email" id="email" value="${result.email}"></td>
						</tr>
						<tr>
							<td style="text-align:right"><label for="photo">사진</label></td>
							<td colspan="2">
								<div class="custom-file mb-3">
									<input type="file" class="custom-file-input" id="photo" name="photo">
									<label class="custom-file-label" for="photo">업로드 사진 선택</label>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<div style="text-align: center;margin-top: 10px;">
									<button type="submit" class="btn btn-primary" value="수정">확인</button>
									<button type="reset" class="btn btn-secondary" value="취소" onclick="location.href='/'">취소</button>
								</div>
							</td>
						</tr>
					</table> 
				</div>
				<div class="col-4"></div>
			</div>
		</form>
	</div>
	<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
		<span class="navbar-text">
			Copyright &copy; 2020 Hoseo Institute of Big Data
		</span>
	</nav>
	<script>
	// Add the following code if you want the name of the file appear on select
		$(".custom-file-input").on("change", function() {
			var fileName = $(this).val().split("\\\\").pop();
			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});
	</script>
	</body>
</html>
    `
}