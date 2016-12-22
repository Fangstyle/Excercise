/**
 * 描述：自定义框架
 */

//定义一个对象 -  （封装的基类）
var fangStyle = function () {
};
fangStyle.prototype = {
    extend: function (tar, source) {
        //遍历对象
        for (var i in source) {
            tar[i] = source[i];
        }
        return tar;
    }
}
//在框架中实例化，这样外面使用的使用就不用实例化了
fangStyle = new fangStyle();


/*下面是第三种定义封装的方式 ，使用extend 是封装模块化*/
/*常用的类型判断封装*/
fangStyle.extend(fangStyle, {
    //数据类型检测
    isNumber: function (val) {
        return typeof val === 'number' && isFinite(val)
    },
    isBoolean: function (val) {
        return typeof val === "boolean";
    },
    isString: function (val) {
        return typeof val === "string";
    },
    isUndefined: function (val) {
        return typeof val === "undefined";
    },
    isObj: function (str) {
        if (str === null || typeof str === 'undefined') {
            return false;
        }
        return typeof str === 'object';
    },
    isNull: function (val) {
        return val === null;
    },
    isArray: function (arr) {
        if (arr === null || typeof arr === 'undefined') {
            return false;
        }
        return arr.constructor === Array;
    }
});

/*常用的字符串封装*/
fangStyle.extend(fangStyle, {
    //去除左边空格
    ltrim: function (str) {
        return str.replace(/(^\s*)/g, '');
    },
    //去除右边空格
    rtrim: function (str) {
        return str.replace(/(\s*$)/g, '');
    },
    //去除空格
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    //简单的数据绑定formateString
    formateString: function (str, data) {
        return str.replace(/@\((\w+)\)/g, function (match, key) {
            return typeof data[key] === "undefined" ? '' : data[key]
        });
    },
});

/*常用的时间封装*/
fangStyle.extend(fangStyle, {});

/*常用的事件封装*/
fangStyle.extend(fangStyle, {
    on: function (id, type, fn) {
        var dom = fangStyle.isString(id) ? document.getElementById(id) : id;
        //如果支持
        //W3C版本 --火狐 谷歌 等大多数浏览器
        //如果你想检测对象是否支持某个属性，方法，可以通过这种方式
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            //如果支持 --IE
            //
            dom.attachEvent('on' + type, fn);
        }
    },
    un: function (id, type, fn) {
        var dom = fangStyle.isString(id) ? document.getElementById(id) : id;
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn);
        } else if (dom.detachEvent) {
            dom.detachEvent(type, fn);
        }
    },
    //事件基础
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取目标
    GetTarget: function (event) {
        var e = fangStyle.getEvent(event);
        return e.target || e.srcElement;
    },
    //组织默认行为
    preventDefault: function (event) {
        var event = fangStyle.getEvent(event);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //阻止冒泡
    stopPropagation: function (event) {
        var event = fangStyle.getEvent(event);
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
})

/*常用的Ajax封装*/
fangStyle.extend(fangStyle, {
    //ajax - 前面我们学习的
    myAjax: function (URL, fn) {
        var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    fn(xhr.responseText);
                } else {
                    alert("错误的文件！");
                }
            }
        };
        xhr.open("get", URL, true);
        xhr.send();

        //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
        function createXHR() {
            //本函数来自于《JavaScript高级程序设计 第3版》第21章
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    },
});

/*常用的选择器封装*/
fangStyle.extend(fangStyle, {
    id: function (id) {
        return document.getElementById(id)
    },
    tag: function (tag, parentNode) {
        var slectedRound = [];
        var targetList = [];
        var curList = [];
        if (this.isString(parentNode)) {
            var first = parentNode.charAt(0);
            switch (first) {
                case ".":
                    slectedRound = document.getElementsByClassName(parentNode.substring(1));
                    break;
                case "#":
                    slectedRound.push(document.getElementById(parentNode.substring(1)));
                    break;
                default :
                    slectedRound = document.getElementsByTagName(parentNode.substring(1));
                    break;
            }
            for (var i = 0; i < slectedRound.length; i++) {
                curList = slectedRound[i].getElementsByTagName(tag);
                //for(var j = 0 ; j < curList.length ; i++  ){
                //targetList.push(curList[j]);
                // }
                Array.prototype.push.apply(targetList, curList);
                //targetList = targetList.concat(curList);
            }
            return targetList;
        }
        return document.getElementsByTagName(tag);
    }, /*仅限能支持getElementByClassName浏览器使用*/
    class: function (target, parentNode) {
        var slectedRound = [];
        var targetList = [];
        var curList = [];
        if (this.isString(parentNode)) {
            var first = parentNode.charAt(0);
            switch (first) {
                case ".":
                    slectedRound = document.getElementsByClassName(parentNode.substring(1));
                    break;
                case "#":
                    slectedRound.push(document.getElementById(parentNode.substring(1)));
                    break;
                default :
                    slectedRound = document.getElementsByTagName(parentNode.substring(1));
                    break;
            }
            for (var i = 0; i < slectedRound.length; i++) {
                if (slectedRound[i].getElementsByClassName) {
                    curList = slectedRound[i].getElementsByClassName(target);
                } else { //存在问题 等待以后的调试
                    var dom = slectedRound[i].getElementsByTagName("*");
                    if (dom.length > 0) {
                        for (var j = 0; j < dom.length; j++) {
                            var classNameList = dom[j].className;
                            var splits = classNameList.split(" ");
                            for (var k = 0; k < splits.length; j++) {
                                if (splits[k] == target) {
                                    curList.push(dom[j]);
                                }
                            }
                        }
                    }
                }
            }
            Array.prototype.push.apply(targetList, curList);
            return targetList;
        }
        return getElementsByClassName(target);
    }, //多个查询 group(".box ,#id , p")
     group:function(content) {
        var result=[],doms=[];
        var arr = fangStyle.trim(content).split(',');
        //alert(arr.length);
        for(var i=0,len=arr.length;i<len;i++) {
            var item = fangStyle.trim(arr[i])
            var first= item.charAt(0)
            var index = item.indexOf(first)
            if(first === '.') {
                doms=fangStyle.class(item.slice(index+1));
                pushArray(doms,result);

            }else if(first ==='#'){
                doms=[fangStyle.id(item.slice(index+1))];
                pushArray(doms,result);
            }else{
                doms = fangStyle.tag(item);
                pushArray(doms,result);
            }
        }
        return result;

        function pushArray(doms,result){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },// 利用管道思想编程的一个 jquerry $(".fanther .son");
    fFloor:function (select){
        var sel = fangStyle.trim(select).split(' ');
        var result=[];
        var context=[];
        for(var i = 0, len = sel.length; i < len; i++){
            result=[];
            var item = fangStyle.trim(sel[i]);
            var first = sel[i].charAt(0)
            var index = item.indexOf(first)
            if(first ==='#'){
                pushArray([fangStyle.id(item.slice(index + 1))]);
                context = result;
            }else if(first ==='.'){
                if(context.length){
                    for(var j = 0, contextLen = context.length; j < contextLen; j++){
                        pushArray(fangStyle.class(item.slice(index + 1), context[j]));
                    }
                }else{
                    pushArray(fangStyle.class(item.slice(index + 1)));
                }
                context = result;
            }else{
                if(context.length){
                    for(var j = 0, contextLen = context.length; j < contextLen; j++){
                        pushArray(fangStyle.tag(item, context[j]));
                    }
                }else{
                    pushArray(fangStyle.tag(item));
                }
                context = result;
            }
        }

        return context;
        function pushArray(doms){
            for(var j= 0, domlen = doms.length; j < domlen; j++){
                result.push(doms[j])
            }
        }
    },
});

/*常用的工具封装*/
fangStyle.extend(fangStyle, {
    //随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    //给一个对象扩充功能
    extendMany: function () {
        var key, i = 0, len = arguments.length, target = null, copy;
        if (len === 0) {
            return;
        } else if (len === 1) {
            target = this;
        } else {
            i++;
            target = arguments[0];
        }
        for (; i < len; i++) {
            for (key in arguments[i]) {
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
});