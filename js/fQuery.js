/**
 * Created by Administrator on 2016/12/28.
 */
function fQuerry(selector){
    this.elements;
    return this._selectior(selector);
}
fQuerry.prototype = {
    _selectior:function (selector) {
        this.elements = document.querySelectorAll(selector);
        return this;
    },
    hide:function () {
        var self = this;
        if(self.elements.length){
            for(var i = 0 ; i<self.elements.length ; i++ ){
                self.elements[i].style.display = "none";
            }
        }else {
            self.elements.style.display = "none";
        }
    }
}
fQuery = function (selectors) {
    return new fQuerry(selectors)
}