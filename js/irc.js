var lrcJSON ;
var currentLine = 0;//当前播放到哪一句了
var currentTime;//当前播放的时间
var audio;
var ppxx;//保存ul的translateY值
var i = 0;
var lrcTime = [];//歌词对应的时间数组
var ul;//获取ul
function initIrc(ircjson){
    lrcJSON = ircjson;
    currentLine = 0;
    currentTime;
    audio = document.getElementById("audio");
    i = 0;
    lrcTime = [];
    ul = $("#lrclist")[0];
    ul.empty();
    $.each(lrcJSON, function(key, value) {//遍历lrc
        lrcTime[i++] = parseFloat(key.substr(1,3)) * 60 + parseFloat(key.substring(4,10));//00:00.000转化为00.000格式
        ul.innerHTML += "<li><p>"+lrcJSON[key]+"</p></li>";//ul里填充歌词
    });
    lrcTime[lrcTime.length] = lrcTime[lrcTime.length-1] + 3;//如不另加一个结束时间，到最后歌词滚动不到最后一句
    var $li = $("#lrclist>li");//获取所有li
    audio.ontimeupdate = function() {//audio时间改变事件
        currentTime = audio.currentTime;
        for (j=currentLine, len=lrcTime.length; j<len; j++){
            if (currentTime<lrcTime[j+1] && currentTime>lrcTime[j]){
                currentLine =  j;
                ppxx = 250-(currentLine*32);
                ul.style.transform = "translateY("+ppxx+"px)";
                $li.get(currentLine-1).className="";
                console.log("on"+currentLine);
                $li.get(currentLine).className="on";
                break;
            }
        }
    };
    audio.onseeked = function() {//audio进度更改后事件
        currentTime = audio.currentTime;
        console.log("  off"+currentLine);
        $li.get(currentLine).className="";
        for (k=0, len=lrcTime.length; k<len; k++){
            if (currentTime<lrcTime[k+1] && currentTime<lrcTime[k]){
                currentLine =  k;
                break;
            }
        }
    };
}