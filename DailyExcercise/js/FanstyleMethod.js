/**
 * 作者：Mc小震
 * 开发日期：2016/12/15
 * 描述：通用框架的封装
 */
var FangStyle = function () {}
FangStyle.prototype = {
    id : function ( id ) {
        return  document.getElementById(id);
    },//去除空格
    trim : function (str) {
        return str.replace(/(^\s*)|(\s$)/g,"");
    },//字符串中替换以@（） 中间的字符
    formateString : function(str ,data ){
        return  str.replace(/@\((\w+)\)/g,function (match , key) {
            return data[key]});
    }

    /*
    * template模版 compile类型   它的是匹配的类型source是一个字符串
     var source = '<ul>'
     +    '{{each list as value i}}'
     +        '<li>索引 {{i + 1}} ：{{value}}</li>'
     +    '{{/each}}'
     + '</ul>';

     var render = template.compile(source);
     var html = render({
     list: ['摄影', '电影', '民谣', '旅行', '吉他']
     });
     */
    ,templateString : function (source ,data) {
        var render = template.compile(source);
       /* var html = render({
            list: ['摄影', '电影', '民谣', '旅行', '吉他']
        });*/
       return render(data);
    }, // 上面的那个的升级版  升级内容 ：返回拼接完的字符串并绑定
    templateStringBind : function (source ,data ,container) {
        var render = template.compile(source);
        var html = render(data);
        document.getElementById(container).innerHTML = html;
    }
    /* 匹配的不是一个字符串 而是一个html标签
    * <script id="test" type="text/html">
     {{if isAdmin}}

     <h1>{{title}}</h1>
     <ul>
     {{each list as value i}}
     <li>索引 {{i + 1}} ：{{value}}</li>
     {{/each}}
     </ul>

     {{/if}}
     </script>

     <script>
     var data = {
     title: '基本例子',
     isAdmin: true,
     list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
     };
     var html = template('test', data);
     document.getElementById('content').innerHTML = html;
     </script>
     * */
    ,templateHtml : function (id , data) {
        return  template( id ,data);
    },// 上面的那个的升级版  升级内容 ：返回拼接完的字符串并绑定
    templateHtmlBind : function (id , data , container) {
        document.getElementById(container).innerHTML = template( id ,data);
    },
}
var fangStyle = new FangStyle();