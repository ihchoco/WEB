let app = {
    fileList : new Array(), // 여기에 모든 파일을 담아서 관리한다.
    getAllFile : function(){
        console.log("getAllFile 호출");
        let files = window.localStorage.getItem("files");
        // console.log(files);
        if(files != undefined){
            let parseFiles = JSON.parse(files);
            this.fileList = parseFiles;
        }else{
            console.log("저장된 값이 없습니다.")
        }
        console.log(this.fileList);

        return this.fileList;
    },
    saveAllFile : function(){
        console.log("saveAllFile");
        // 1. 저장전 기존에 저장되어 있던 모든 데이터 삭제
        this.clearLocalStorage();

        // 2. 한번에 파일 리스트 데이터 저장하기
        let files = JSON.stringify(this.fileList);
        window.localStorage.setItem("files", files);
    },
    putFile : function(file){
        this.fileList.push(file);
    },
    deleteAllFile : function(){
        console.log("deleteAllFile 삭제 호출");
        window.localStorage.removeItem("files");
    },
    clearLocalStorage : function(){
        console.log("clearLocalStorage 호출");
        window.localStorage.clear();
    },
    getCurentTimeNow : function(){
        let date = new Date();
        let month = date.getMonth(); //몇월달인지 반환
        let today = date.getDate(); //기준일 반환 1-31
        let day = date.getDay(); //현지 요일 0-6
        let hour = date.getHours(); //현재 시간
        let minute = date.getMinutes();

        console.log((month+1)+"월 "+today);
        let days = ["일", "월", "화", "수", "목", "금", "토"];
        console.log(days[day]);

        $("#month-date").text((month+1)+"월 "+today);
        
        let convHour = (hour >= 12) ? hour - 12 : hour;
        let ampm =  (hour >= 12) ? "오후" : "오전";
        let convMinute = minute.toString().length == 1 ? "0"+minute : minute;

        console.log(convHour);
        console.log(ampm);
        $("#time").text(convHour+":"+convMinute);
        $("#am-pm").text(ampm);

        //setInterval(this.getTime, 1000*60);
    },
    getTime : function(){
        console.log("getTime 호출");
        let date = new Date();
        let hour = date.getHours(); //현재 시간
        let minute = date.getMinutes();

        let convHour = (hour >= 12) ? hour - 12 : hour;
        let ampm =  (hour >= 12) ? "오후" : "오전";
        let convMinute = minute.toString().length == 1 ? "0"+minute : minute;

        $("#time").text(convHour+":"+convMinute);
        $("#am-pm").text(ampm);
    }
}