function DropDown(options){
    this.dropDown = null;
    this.dropDownMenu = null;
    this.dropDownButton = null;
    this.menuItems = null;
    this.selectedMenu = null;

    console.log("DropDown 객체 생성");
    this.init(options);
}

DropDown.prototype.init = function(options){
    //변수 초기화작업
    console.log("init 호출");
    this.dropDown = $(options.selector);
    this.dropDownButton = this.dropDown.children('.dropDownButton');
    this.dropDownMenu = this.dropDown.children('.dropDownMenu');
    this.menuItems = this.dropDownMenu.children('a');


    var defaultObj = {
        'selector' : '.dropDown',
        'width' : '600px'
    };

    options = Object.assign(defaultObj, options);

    this.styleSetting(options);
    this.initEvent();
}

DropDown.prototype.styleSetting = function(options){
    this.dropDown.css({ 'width' : options.width });
}

DropDown.prototype.initEvent = function(){
    //이벤트 연결해주기
    var _this = this;
    //dropDwonButton 클릭 이벤트 연결
    this.dropDownButton.click(function(){
        _this.clickDropDownButton();
    })
    //selectItem 클릭 이벤트 연결(jqeury 객체로 전달하기)
    this.menuItems.click(function(){
        _this.selectMenuItem($(this));
    })
}

DropDown.prototype.clickDropDownButton = function(){
    this.dropDownButton.toggleClass('clicked');
    this.dropDownMenu.toggleClass('show');
}

DropDown.prototype.selectMenuItem = function(selectedItem){
    if(this.selectedMenu){
        this.selectedMenu.removeClass('select');
    }
    this.selectedMenu = selectedItem;
    this.selectedMenu.addClass('select');

}