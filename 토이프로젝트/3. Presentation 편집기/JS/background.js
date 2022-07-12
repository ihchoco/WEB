class BackgrondSetting{
    constructor(){
        console.log("background cons")
        this.backgrond = $('#setBackgroundBox');

        //Program 버튼 셋팅
        this.saveBtn = null;
        this.closeBtn = null;
        this.init();
    }
    init(){
        console.log("background init");
        this.exitBtn = this.backgrond.find("#exitBtn"); //클로즈 할때 자동으로 저장?
        this.closeBtn = this.backgrond.find("#closeBtn"); //클로즈 할때 자동으로 저장?
        this.initEvent();
    }
    initEvent(){

        console.log("background init evemnt");
        var _this = this;
        //draggable 할수있게 해주자
        this.backgrond.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){
            _this.exitProgram();
        })
        this.closeBtn.on('click', function(){
            _this.closeProgram();
        })
    }
    exitProgram(){
        console.log("exitBtn");
        //숨기기
        this.backgrond.stop().slideToggle();
    }
    closeProgram(){
        console.log("closeProgram");
        //숨기기
        this.backgrond.stop().slideToggle();
    }

}
