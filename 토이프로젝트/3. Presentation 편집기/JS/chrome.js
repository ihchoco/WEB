class Chrome{

    constructor(options){
        this.chrome = $('#'+options.selector);
        this.saveBtn = null;
        this.closeBtn = null;
        this.inputBox = null;
        this.focusFlag = false;

        this.addressURL = null;
        this.iframeBody = null;
        this.tabBody = null;
        this.selectTabId = null;
        this.tabList = new Array(); //실제로 저장되는 데이터
        
        this.init(options);
        
    }

    init(options){
        console.log("chrome INIT 호출");
        this.exitBtn = this.chrome.find('#exitBtn');
        this.closeBtn = this.chrome.find('#closeBtn');
        this.resizeBtn = this.chrome.find('#resizeBtn');

        this.addressURL = this.chrome.find('#browser_address');
        this.selectTabId = 0;

        this.iframeBody = this.chrome.find('#chromeIframeBox');
        this.tabBody = this.chrome.find('#targetTabBox');

        this.tabList.push(new Tab({
            chrome : this,
            addressURL : 'https://www.google.com/webhp?igu=1',
            tabTitle : 'Chrome',
            tabId : this.getOnlyTabId()
        }))


        this.initEvent();

    }

    initEvent(){
        var _this = this;
        this.chrome.draggable({
            handle : '.top'
        });
        this.exitBtn.on('click', function(){ _this.closeProgram(); })
        this.closeBtn.on('click', function(){ _this.closeProgram(); })
        this.resizeBtn.on('click', function(){ _this.reSizeProgram(); })   
        this.addressURL.on('keyup', function(e){
            if(e.keyCode == 13){
                let url = _this.addressURL.val().trim();
                if(url.length == 0) return;
                else{
                    _this.goBrowser(url);
                }
                //alert(this.addressURL.val().trim().length);
            }
        })
    }

    getOnlyTabId(){
        return `${Date.now()}`;
    }

    closeProgram(){
        //숨기기
        this.chrome.stop().slideToggle();
    }

    resizeProgram(){
        console.log("resize 호출");
    }

}

class Tab{
    constructor(options){
        this.chrome = options.chrome;
        this.tab = null;
        
        this.addressURL = null;
        this.iframeBody = null;
        this.tabTitle = null;
        this.selected = false;
        this.tabList = new Array(); //실제로 저장되는 데이터
        this.tabId = null;

        this.init(options);
        
    }

    init(options){
        this.tabTitle = options.title;
        this.selected = options.selected;
        this.addressURL = options.addressURL;
        this.tabId = options.tabId;
        
        // 1. 먼저 DOM 생성
        this.makeTab(options);
        
        // 2. 변수에 할당
        this.initEvent();

    }

    initEvent(){

    }

    makeTab(options){
        let tab = `
        <div class="browserTabBox active" id="tab_${options.tabId}">
            <p class="tabTitle">${options.tabTitle}</p>
            <p class="tabCloseBtn">X</p>
        </div>
        `;

        let iframe = `<iframe src="${options.addressURL}" style="border: none;" id="iframe_${options.tabId}">
        현재 사용중인 브라우저는 Iframe 요소를 지원하지 않습니다.
        </iframe>`;
        console.log("makeBOX TAB 호출");
        console.log(this.chrome);

        this.chrome.tabBody.append(tab);
        this.chrome.iframeBody.append(iframe);
        
    }
}