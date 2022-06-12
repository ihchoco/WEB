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
    this.title = null; //아이콘 이름
    this.type = null; //icon , program
    this.menuItems = null;
    this.selectorId = null;
    this.size = null;
    this.content = null;
    this.date = null;

    //BOX 기능을 위한 초기값 셋팅
    this.moveToTrashBinBtn = null;
    this.copyFileBtn = null;
    this.showInfoBtn = null;
    this.runProgramBtn = null;

    // console.log(options);
    this.optionSet(options);
    //HTML DOM을 먼저 동적생성하고 붙여줘야 정상동작 한다.
    this.makeBox(); //HTML DOM 만들기
    this.init(options);
}

Box.prototype.optionSet = function(options){
    this.selectorId = options.selectorId;
    this.width = options.width;
    this.height = options.height;
    this.text = options.text;
    this.x = options.x;
    this.y = options.y;
    this.backgroundColor = options.backgroundColor;
    this.color = options.color;
    this.borderColor = options.borderColor;
    this.title = options.title;
    this.type = options.type;
    this.size = options.size;
    this.content = options.content;
    this.date = options.date;
    //showInfo 붙이기
    this.menuItems = [
        {
            'id' : 'fileOpen',
            'txt' : '파일 열기'
        },
        {
            'id' : 'copyFileBtn',
            'txt' : '파일 복사하기'
        },
        {
            'id' : 'trashBinBtn',
            'txt' : '휴지통으로 이동하기'
        },
        {
            'id' : 'showInfoBtn',
            'txt' : '속 성'
        }
    ];
}

Box.prototype.init = function(options){
    // console.log("init 호출");
    // BOX 기본정보 셋팅
    this.box = $("#"+options.selectorId);
    // console.log(this.box);
    // BOX 기능버튼 설정
    this.runProgramBtn = this.box.find("#fileOpen");
    this.moveToTrashBinBtn = this.box.find("#trashBinBtn");
    this.copyFileBtn = this.box.find("#copyFileBtn");
    this.showInfoBtn = this.box.find("#showInfoBtn");

    
    this.initEvent();
}

Box.prototype.makeBox = function(){
    // option으로 받은 정보를 이용해서 icon을 만들어서 붙여주는곳
    // console.log("makeBox 호출");

    let box = $(`<div id='${this.selectorId}' class='box'></div>`);
    let iconImage = $(`<div class='iconImage'><img src='../Image/file.png' alt='파일 아이콘'></div>`);
    let titleText = $(`<span class="boxTitle">${this.title}.${this.type}</span>`);
    box.append(iconImage);
    box.append(titleText);

    
    let infoBoxContainer = $('<div class="infoBoxContainer"></div>');
    let infoBox = $(`<div id='info_${this.selectorId}' class='infoBox'></div>`);
    for(var i = 0; i < this.menuItems.length; i++){
        infoBox.append(`<div class='info' id='${this.menuItems[i].id}'>${this.menuItems[i].txt}</div>`);
    }
    infoBoxContainer.append(infoBox);

    //만든 Box에 infoBox 붙이기
    box.append(infoBoxContainer);
    $('.palette').append(box);
    
}

Box.prototype.initEvent = function(){
    var _this = this;
    // console.log("initEvent 호출");
    console.log(this);
    
    // box 클릭 이벤트 연결
    this.box.on('click', function(){
        _this.clickBox();
        _this.toggleInfoBox();
        return false;
    })
    
    // box drag 이벤트 연결
    this.box.draggable();
    
    console.log(this.moveToTrashBinBtn);
    // 휴지통 이동버튼 기능 연결
    this.moveToTrashBinBtn.on('click', function(){
        _this.moveToTrashBin();
        $('.infoBox').removeClass('show');
    })

    this.runProgramBtn.on('click', function(){
        _this.runProgram();
        $('.infoBox').removeClass('show');
        
    })

}

// 객체 기능연결 모음
Box.prototype.clickBox = function(){
    ////console.log("clickBox 호출");
    this.box.toggleClass('click');
    
}

Box.prototype.toggleInfoBox = function(){
    console.log("toggleInfoBox 호출");
    $('.infoBox').removeClass('show');
    $('.box').removeClass('click');
    this.box.find(`#info_${this.selectorId}`).toggleClass('show');
}

Box.prototype.moveToTrashBin = function(){
    let trashBinFlag = confirm("휴지통으로 파일 이동");
    if(trashBinFlag){
        this.box.css({
            'display' : 'none'
        })
    }
}

Box.prototype.runProgram = function(){
    console.log("!!!! newProgram 실행");
    console.log(this.box);
    new Program({
        selectorId : `program_${this.type}_${this.selectorId}`,
        title : this.title,
        type : this.type,
        content : this.content,
        originObj : this,
        size : this.size,
        date : this.date
    });
}

//InfoBox
// function InfoBox(options){
//     this.target = null;
//     this.infoBox = null;
//     this.menuItems = null;

//     this.init(options);
// }

// InfoBox.prototype.init = function(optinos){
//     // this.target = options.target;
//     this.target = '#box';
//     // this.menuItems = options.menuItems;
//     this.menuItems = [
//         {
//             'id' : 'trashBinBtn',
//             'txt' : '휴지통으로 이동하기'
//         },
//         {
//             'id' : 'copyFileBtn',
//             'txt' : '파일 복사하기'
//         },
//         {
//             'id' : 'pasteFileBtn',
//             'txt' : '파일 붙여넣기'
//         },
//         {
//             'id' : 'resize',
//             'txt' : '크기 조절하기'
//         },
//         {
//             'id' : 'showInfoBtn',
//             'txt' : '속 성'
//         }
//     ];
//     this.makeInfoBox();
// }

// InfoBox.prototype.makeInfoBox = function(){
//     console.log("makeInfoBox 호출");
//     let infoBoxContainer = $('<div class="infoBoxContainer"></div>');
//     let infoBox = $(`<div id='infoBox' class='infoBox'></div>`);
//     for(var i = 0; i < this.menuItems.length; i++){
//         infoBox.append(`<div class='info' id='${this.menuItems[i].id}'>${this.menuItems[i].txt}</div>`);
//     }
//     infoBoxContainer.append(infoBox);

//     $(this.target).append(infoBoxContainer);
// }

// InfoBox.prototype = Object.create(InfoBox.prototype);
// InfoBox.prototype.constructor = InfoBox;

//TrashBin
function ProgramBox(options){
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
    this.originObj = null;
    this.date = null;

}

ProgramBox.prototype = Object.create(Box.prototype);
ProgramBox.prototype.constructor = ProgramBox;

//Palette 전체 배경화면
function Palette(options){
    this.palette = null;
    
    this.init(options);
}

Palette.prototype.init = function(options){
    console.log("palette init 호출");

    this.palette = $(`.${options.selectorId}`);
    console.log(this.palette);
    this.initEvent();
}

Palette.prototype.initEvent = function(){
    console.log("palette initEvent 호출");
    var _this = this;
    this.palette.on('click', function(){
        _this.clickPalette();
    })

}

Palette.prototype.clickPalette = function(){
    console.log("clickPalette 호출");
    $('.infoBox').removeClass('show');
}

// program(실행화면 만들기)
function Program(options){
    this.program = null; //실행할 프로그램 화면
    this.width = null;
    this.height = null;
    this.text = null;
    this.x = null;
    this.y = null;
    this.backgroundColor = null;
    this.color = null;
    this.borderColor = null;
    this.menuItems = null;
    this.selectorId = null;
    this.date = null;
    this.originObj = null; //핵심 객체(부모)

    //content에 들어갈 내용
    this.title = null; //아이콘 이름
    this.content = null;
    this.type = null; //icon , program
    this.size = null;

    //Program 버튼 셋팅
    this.saveBtn = null;
    this.closeBtn = null;

    this.optionSet(options);
    this.makeProgram(); //HTML DOM 만들기
    this.init(options);
    
}

Program.prototype.optionSet = function(options){
    this.selectorId = options.selectorId;
    this.width = options.width;
    this.height = options.height;
    this.text = options.text;
    this.x = options.x;
    this.y = options.y;
    this.backgroundColor = options.backgroundColor;
    this.color = options.color;
    this.borderColor = options.borderColor;
    this.date = options.date;
    this.originObj = options.originObj; //부모 객체

    this.title = options.title;
    this.content = options.content;
    this.type = options.type;
    this.size = options.size;

    console.log("====프로그램=====");
    console.log(this.originalObjectId);
}

Program.prototype.makeProgram = function(){
    // option으로 받은 정보를 이용해서 icon을 만들어서 붙여주는곳
    console.log("makeBox 호출");

    let program = $(`<div id='${this.selectorId}' class='program'></div>`);
    let top = $(`<div class='top'><span>${this.title}</span><span id='closeBtn'>X</span></div>`);
    let content = $(`<div class='content' contenteditable="true">${this.content}</div>`);
    let bottom = $(`<div class='bottom'></div>`);
    let bottomSpan = $(`<span>length : ${this.size}byte / </span><span>last-date : ${this.date}</span>`);

    //let bottom = $(`<div class='bottom><span>length : ${this.size}byte </span>
    //<span>last-date : ${this.date}</span></div>`);

    program.append(top);
    program.append(content);
    program.append(bottom);
    
    bottom.append(bottomSpan);

    program.append(bottom);
    
    console.log(top);
    console.log(content);
    console.log(bottom);
    console.log(bottomSpan);

    //Palette에 만든 DOM 붙이기
    $('.palette').append(program);

}

Program.prototype.init = function(options){
    this.program = $(`#${options.selectorId}`);

    console.log(this.box);
    // BOX 기능버튼 설정
    // this.saveBtn = this.box.find("#saveBtn"); 
    this.closeBtn = this.program.find("#closeBtn"); //클로즈 할때 자동으로 저장?

    this.initEvent();
}

Program.prototype.initEvent = function(options){
    var _this = this;
    
    //draggable 할수있게 해주자
    this.program.draggable({
        handle : '.top'
    });
    this.closeBtn.on('click', function(){
        _this.closeProgram();
    })
}

Program.prototype.closeProgram = function(){

    console.log("closeProgram");
    // 제거하기전 정보를 다시 BOX객체에 던져주기
    console.log(this.originObj);
    let content = this.program.find('.content').text();
    let date = new Date().toLocaleString();
    

    //닫기 전 (수정된) 정보 전달하기
    this.originObj.content = content;
    this.originObj.date = date;

    console.log(this.orginOBj);

    this.program.remove(); //DOM에서 제거하기
}
