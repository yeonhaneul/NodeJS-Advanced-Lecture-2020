const tm = require("./template");

module.exports.view = function (navBar, result, replies) {
    let content = result.content.replace(/\n/g, '<br>');
    let cardR = '';
    for (let reply of replies) {
        cardR += `<div class="card-body" style="border: solid 0.3px; border-radius: 5px; margin-bottom: 10px;">
                    <h6 class="card-title">${reply.uname} ${reply.regTime}</h4>
                    <p class="card-text">${reply.content}</p>
                  </div>
                    `
    }
    return `
            ${tm.header()}
        ${navBar}
    <div class="container" style="margin-top: 100px">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-6">
                <h3>${result.title}</h3>
                <h6>글번호:${result.bid} | ${result.modTime}</h6>
            </div>
            <div class="col-4" style="text-align: right;">
                <h4>${result.uname}</h4>
                <h6>조회${result.viewCount} 리플${result.replyCount}</h6>
            </div>
            <div class="1"></div>
        </div>
        <div class="col-12">
            <hr style="border: solid 1px cornflowerblue;">
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <h5>${content}</h5>
            </div>
            <div class="col-1"></div>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10" style="text-align: right; font-size: 23px;">
                <a href="/bbs/update/${result.bid}"><i class="far fa-edit"></i></a>
                <a href="/bbs/delete/${result.bid}"><i class="far fa-trash-alt"></i></a>
            </div>
            <div class="col-1"></div>
        </div>
        <div class="col-12">
		    <hr style="border: solid 1px cornflowerblue;">
        </div>
        <div class="row">
			<div class="col-1"></div>
            <div class="col-10">
            <form action="/bbs/reply" method="post">
                <input type="hidden" name="bid" value="${result.bid}">
                <div class="card">
                ${cardR}
                </div>
                <div class="input-group mt-3 mb-3">
                    <input type="text" class="form-control" name="content">
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-success">확인</button>  
                    </div>
                </div>
            </div>
            </form>
            <div class="col-1"></div>
        </div>
	</div>
        ${tm.footer()}
    `;
}