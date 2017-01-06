/**
 * Created by Administrator on 2016/12/14.
 */
var data = [
    {
        name:'白羊座',
        time:'3.21-4.19'
    }
    ,{
        name:'金牛座',
        time:'4.20-5.20'
    }
    ,{
        name:'双子座',
        time:'5.21-6.21'
    }
    ,{
        name:'巨蟹座',
        time:'6.22-7.22'
    }
    ,{
        name:'狮子座',
        time:'7.23-8.22'
    }
    ,{
        name:'处女座',
        time:'8.23-9.22'
    }
    ,{
        name:'天秤座',
        time:'9.23-10.23'
    }
    ,{
        name:'天蝎座',
        time:'10.24-11.22'
    }
    ,{
        name:'射手座',
        time:'11.23-12.21'
    }
    ,{
        name:'摩羯座',
        time:'12.22-1.19'
    }
    ,{
        name:'水瓶座',
        time:'1.20-2.18'
    }
    ,{
        name:'双鱼座',
        time:'2.19-3.20'
    }
];
function  BaiStar(dataItem ,index) {

    this._init(dataItem ,index);
}
BaiStar.prototype = {
    _init : function (dataItem ,index) {
        var self = this;
        this.root = $(".xingzuo");
        this.data = dataItem;
        this.index = index;
        this.dom = $('<div></div>').addClass('item num-'+self.index);
        this._initData();
        this._initEvent();
       },
    _initData : function () {
        var str =''
        str +=' <div class="image"></div>'
        str +='<div class="description">'
        str +='<p class="name">{{name}}</p>'
        str +='<p class="time">{{time}}</p>'
        str +='<div class="mark"></div>'
        str +='</div>'
        this.dom.html(fangStyle.templateString(str,this.data)).appendTo(this.root);
    },
    _initEvent : function () {
        var that = this;
        /*鼠标悬浮核离开*/
        /*前面我们讲了排他思想 -- 针对整体进行编程*/
        this.dom.on('mouseenter',function(){
            that.dom.addClass('is-hover')
        }).on('mouseleave',function(){
            that.dom.removeClass('is-hover')
        }).on('click',function(){
            that.dom.toggleClass('selected')
        })
    }

}
//便利数组
for(var i=0;i<data.length;i++){
    new BaiStar(data[i],i)
    //item.init()
}