function Box(options){
    // BOX 기본정보 초기값 셋팅
    this.box = null;
    this.width = null;
    this.height = null;
    this.text = null;
    this.x = null;
    this.y = null;
    this.backgroundColor = null;
    this.color = null;
    this.borderColor = null;

    //BOX 기능을 위한 초기값 셋팅
    this.moveToTrashBinBtn = null;
    this.copyFileBtn = null;
    this.showInfoBtn = null;

    console.log(options);

    this.init(options);
}

Box.prototype.init = function(options){
    // BOX 기본정보 셋팅
    this.box = $(options.selector);
    this.width = options.width;
    this.height = options.height;
    this.text = options.text;
    this.x = options.x;
    this.y = options.y;
    this.backgroundColor = options.backgroundColor;
    this.color = options.color;
    this.borderColor = options.borderColor;

    // BOX 기능버튼 설정
    this.moveToTrashBinBtn = this.box.find("#trashBinBtn");
    this.copyFileBtn = this.box.find("#copyFileBtn");
    this.showInfoBtn = this.box.find("#showInfoBtn");

    this.initEvent();
}

Box.prototype.initEvent = function(){
    var _this = this;
    console.log("initEvent 호출");
    
    // box 클릭 이벤트 연결
    this.box.on('click', function(){
        _this.clickBox();
        _this.toggleInfoBox();
    })
    
    // box drag 이벤트 연결
    this.box.draggable();
    
    console.log(this.moveToTrashBinBtn);
    // 휴지통 이동버튼 기능 연결
    this.moveToTrashBinBtn.on('click', function(){
        _this.moveToTrashBin();
    })

}

// 객체 기능연결 모음
Box.prototype.clickBox = function(){
    this.box.toggleClass('click');
    
}

Box.prototype.toggleInfoBox = function(){
    this.box.find('#infoBox').toggleClass('show');
}

Box.prototype.moveToTrashBin = function(){
    let trashBinFlag = confirm("휴지통으로 파일 이동");
    if(trashBinFlag){
        this.box.css({
            'display' : 'none'
        })
    }
    
}
