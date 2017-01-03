/**
 * Created by Administrator on 2017/1/3.
 */
/*初识Node*/
'use strict'
/*下面的操作是为了 引入Node的一些包 引入后即完成实例*/
var http = require("http");
var url = require("url");
var querystring = require("querystring");

//创建服务
http.createServer(function (request,response) {
    var path = url.parse(request.url);
    switch (path.pathname){
        case '/signin': //请求网址为 ：http://localhost:2000/signin
            signin(request, response);
            break;
        case '/post': //请求网址为 :http://localhost:2000/post
            post(request, response);
            break;
    }
}).listen(2000);
//客户端请求后  服务器给发送一个表单 进行验证
function  signin(request,response) {
    response.writeHead(200,{'Content-Type' : 'text/html','key': 'vale' /*...and so on*/});
    //此处也可以用字符串的形式进行拼接  或者下面的一大堆....
    /*
    * var signinHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>登陆</title></head><body><form action="/post" method="post"><table border="1"><tr><td>用户名</td><td><input type="text" name="username"></td></tr><tr><td>密码</td><td><input type="password" name="password"></td></tr><tr><td></td><td><input type="submit"></td></tr></table></form></body></html>';
    * response.end(signinHtml);
    * */
    response.write('<!DOCTYPE html>');
    response.write('<html lang="en">');
    response.write('<head>');
    response.write('    <meta charset="UTF-8">');
    response.write('    <title>Title</title>');
    response.write('</head>');
    response.write('<body>');
    response.write('<form action="/post" method="post">');
    response.write('    <table>');
    response.write('        <tr>');
    response.write('            <td>用户名:</td>');
    response.write('            <td><input type="text" name="userName"></td>');
    response.write('        </tr>');
    response.write('        <tr>');
    response.write('            <td>密码</td>');
    response.write('            <td><input type="text" name="passWord"></td>');
    response.write('        </tr>');
    response.write('        <tr>');
    response.write('            <td></td>');
    response.write('            <td><input type="submit"></td>');
    response.write('        </tr>');
    response.write('    </table>');
    response.write('</form>');
    response.write('</body>');
    response.write('</html>');
    response.end();
}
function  post(request,response) {
    //接受的数据都是以片段的 形式接受的  而且服务器和客户端也只能都发送字符串
    //所以讲客户端传来的数据  片段 以字符串的形式进行拼接
    // 而node 帮我们定义好了一个接收客户端发送数据的回调
    var postData = '';
    //接收数据中
    request.on('data',function (part) {
        postData += part; //最终形态 userName = ... && passWord = ...
    });
    //接收数据完成
    request.on('end',function () {
        // 返回的postData的字符串进行解析， node提供了一个类似于 Android Gson （字符串 —> 对象）的方法
        var datas = querystring.parse(postData);
        //验证用户名及密码
        if (datas.userName === 'admin' && datas.passWord === '123') {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end('<h1>login_Success</h1>');
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end(signinHtml);
        }
    });
}