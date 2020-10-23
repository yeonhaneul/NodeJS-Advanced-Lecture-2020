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
    <script src="/jquery.min.js"></script>
    <script src="/popper/popper.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
    <a class="navbar-brand" href="#">
        <img src="/img/hoseo.png" alt="호서직업능력개발원"
            style="height: 40px; margin-left: 20px; margin-right: 50px;">
    </a>
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