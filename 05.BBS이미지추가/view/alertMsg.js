module.exports.alertMsg = function(message, url) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Alert Message</title>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
                var message = '${message}'; // ''를 하지 않으면 코드에 에러가 발생한다.
                var returnUrl = '${url}';
                alert(message);
                document.location.href = returnUrl;
            </script>
        </body>
        </html>
    `;
}