// 휴지통 만들기
// 이거 위에부터 다 클래스 ES6로 바꾸고 상속 개념사용해서 만들자

class TrashBin{
    constructor(options){
        this.trashBin = $('#trashBin');
        this.text = options.text;
        this.date = options.date;
        
        //content에 들어갈 내용
        this.title = options.title; //아이콘 이름
        this.content = options.content;
        this.type = options.type; //icon , program
        this.size = options.size;

        //Program 버튼 셋팅
        this.saveBtn = null;
        this.closeBtn = null;

        //trashBin에 들어있는 휴지통 프로그램
        this.trashBinList = new Array();

        this.init();
    }
    init(){
        this.closeBtn = this.trashBin.find("#closeBtn");
        
        console.log(this.contentBox);
        this.initEvent();
        this.showTrashBinCount();

        //title 입력
        this.trashBin.find('#trashBin-title').text(this.title);
    
    }
    initEvent(){
        var _this = this;
        //draggable 할수있게 해주자
        this.trashBin.draggable({
            handle : '.top'
        });
        this.closeBtn.on('click', function(){
            _this.closeProgram();
        })
    }
    closeProgram(){
        //숨기기
        this.trashBin.stop().slideToggle();
    }
    showTrashBinCount(){
        let length = 0;
        if(this.trashBinList.length != 0){
            length = this.trashBinList.length;
        }        
        this.trashBin.find('.length').text(length);
    }
    refresh(){
        //console.log("refresh 호츌");
        //리셋 해주는 용도
        this.trashBin.find('.content').empty();
        
        //console.log(superTrashBin);
        for(var i = 0; i < superTrashBin.length; i++){
            //console.log("count : "+i);
            // 여기에 삭제된 항목을 박스로 만들어서 content에 붙여주자.
            let box = $(`<div id='${superTrashBin[i].selectorId}' class='box'></div>`);
            let iconImage = $(`<div class='iconImage'><img src='../Image/file.png' alt='파일 아이콘'></div>`);
            let titleText = $(`<span class="boxTitle">${superTrashBin[i].title}.${superTrashBin[i].type}</span>`);
            box.append(iconImage);
            box.append(titleText);

            let infoBoxContainer = $('<div class="infoBoxContainer"></div>');
            let menuItems = [
                { key : 'rollback', value : '복 구'},
                { key : 'delete', value : '삭 제'}
            ];
            let infoBox = $(`<div class='infoBox'></div>`);
            for(var i = 0; i < menuItems.length; i++){
                infoBox.append(`<div class='info' id='${menuItems[i].key}'>${menuItems[i].value}</div>`);
            }
            infoBoxContainer.append(infoBox);

            this.trashBin.find('.content').append(box);
        }
    }
    clean(){
        console.log("clean");
    }

}


   

