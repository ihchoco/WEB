function Box(options){
    this.box = null;
    this.width = null;
    this.height = null;
    this.text = null;
    this.x = null;
    this.y = null;
    this.backgroundColor = null;
    this.color = null;
    this.borderColor = null;
    console.log(options);

    this.init(options);
}

Box.prototype.init = function(options){
    this.box = $(options.selector);
    this.width = options.width;
    this.height = options.height;
    this.text = options.text;
    this.x = options.x;
    this.y = options.y;
    this.backgroundColor = options.backgroundColor;
    this.color = options.color;
    this.borderColor = options.borderColor;

    this.initEvent();
}

Box.prototype.initEvent = function(){
    var _this = this;
    console.log("initEvent 호출");
    console.log(this.box);
    // box 클릭 이벤트 연결
    this.box.on('click', function(){
        _this.clickBox();
        _this.toggleInfoBox();
    })
    // box drag 이벤트 연결
    this.box.draggable();
    console.log(this.box);
}

Box.prototype.clickBox = function(){
    this.box.toggleClass('click');
    
}

Box.prototype.moveBox = function(){

}

Box.prototype.toggleInfoBox = function(){
    this.box.find('#infoBox').toggleClass('show');
}
