module.exports = {
    
    header: function() {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <title>My BBS</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
                <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.css">
                <script src="/jquery/jquery.min.js"></script>
                <script src="/popper/popper.min.js"></script>
                <script src="/bootstrap/js/bootstrap.min.js"></script>
            </head>
            <body>
        `;
    },
    navBar: function(uname) {
        return `
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/">
            <img src="/img/hoseo.png" alt="호서직업능력개발원"
                style="height: 40px; margin-left: 20px; margin-right: 50px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/"><i class="fas fa-home"></i>홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/bbs/create"><i class="fas fa-pencil-alt"></i>글쓰기</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/user/list/1"><i class="far fa-user"></i>마이페이지</a>
            </li>
            <li class="navbar-text" id="welcome">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${uname?uname:'게스트'}님 반갑습니다.
            </li>
        </ul>
        <form class="form-inline" action="/bbs/search" method="post">
            <input class="form-control mr-sm-2" type="search" aria-label="Search" name="keyword">
            <button class="btn btn-success my-2 my-sm-0" type="submit" value="검색">검색</button>
        </form>
        <a class="nav-link" href="/logout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${uname==='게스트'?'로그인':'로그아웃'}</a>
        </nav>
        `;
    },
    footer: function() {
        return `
                <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
                    <span class="navbar-text">
                        Copyright &copy; 2020 Hoseo Institute of Big Data
                    </span>
                </nav>
            </body>
        </html>
                `;
    }
}