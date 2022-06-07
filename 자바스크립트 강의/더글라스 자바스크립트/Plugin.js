let Plugin = {
    MenuTab1 : {
        tabMenu : null,
        menuItems : null,
        selectedItem : null,

        'init' : function(selector){
            this.tabMenu = $(selector);
            this.menuItems = this.tabMenu.find("li");
            console.log(this.menuItems);
            this.initEvent();
        },
        'initEvent' : function(){
            var _this = this;
            console.log(_this);
            this.menuItems.on('click', function(){
                console.log(_this);
                console.log(_this.selectedItem);
                _this.select(this);
            })
        },
        'select' : function(selectedItem){
            if(this.selectedItem){
                this.selectedItem.removeClass("select");
            }
            this.selectedItem = $(selectedItem);
            this.selectedItem.addClass("select");
        }
    },
    MenuTab2 : function(selector){
        //console.log(this);
        tabMenu = null;
        menuItems = null;
        selectedItem = null;

        init = function(selector){
            this.tabMenu = $(selector);
            this.menuItems = this.tabMenu.find("li");

            this.initEvent();
        };
        initEvent = function(){
            var _this = this;
            this.menuItems.on('click', function(){
                _this.select(this);
            })
        };
        select = function(selectedItem){
            if(this.selectedItem){
                this.selectedItem.removeClass("select");
            }
            this.selectedItem = $(selectedItem);
            this.selectedItem.addClass("select");
        }
        init(selector);
    }
        
    
    
}