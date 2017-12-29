try {
    

var current_window = chrome.app.window.current();

document.getElementById('minimize').onclick = function(){
    current_window.minimize();
}

document.getElementById('close').onclick = function(){
    current_window.close();
}

document.getElementById('maximize').onclick = function(){
    current_window.isMaximized() 
        ? current_window.restore()
        : current_window.maximize();
}

} catch(e) {
    // statements
    console.log(e);
} 


var audio = document.getElementById('audio');

var app = angular.module('app', ['ngAnimate']);
app.controller('myCtrl', function($scope, $http) {
    $scope.songs= [];
    $scope.search = '张卫健';

    // $scope.history = []
    // var history = []
    // if(localStorage.history && JSON.parse(localStorage.history) instanceof Object){
    //     $scope.history = history = JSON.parse(localStorage.history) || []
    // }
    
    /**
     * 循环类型
     * 1 - 单曲循环
     * 2 - 单曲播放
     * 3 - 顺序播放 默认
     * 4 - 列表循环
     * 5 - 随机播放
     */
    $scope.cycleType = 3;
    // 当前列表正在播放的序号
    $scope.songIndex = 0;
    // 播放完后
    audio.addEventListener('ended', function(){
        func(true)
    })
    // 上一首
    $scope.prev = () => {
        func(false)
    }
    // 下一首
    $scope.next = () => {
        func(true)
    }
    
    function func(order){
        var songs = $scope.songs,
            index = $scope.songIndex;
        audio.loop = false;
        switch ($scope.cycleType) {
            case 1: 
                audio.loop = true;
                break;
            case 2: break;
            case 3:
                order ? index++ : index--;
                if( (index > songs.length - 1)  || index < 0){
                    break;
                }
                $scope.paly(songs[index], index)
                break;
            case 4: break;
            case 5: break;
            default:
                
                break;
        }
    }
    $scope.offset = 0;
    $scope.nextPage = function(){
        $scope.offset++;
        $http.get("https://api.imjad.cn/cloudmusic/?type=search&s="+$scope.search + "&limit=20&offset="+$scope.offset).then(function (response) {
            console.log(response)
            $scope.songs = response.data.result.songs;
        });
    }
    $scope.prevPage = function(){
        $scope.offset--;
        if($scope.offset<0){
            $scope.offset = 0 ;
            return
        }
        $http.get("https://api.imjad.cn/cloudmusic/?type=search&s="+$scope.search + "&limit=20&offset="+$scope.offset).then(function (response) {
            console.log(response)
            $scope.songs = response.data.result.songs;
        });
    }


    $scope.getList = function(){
        $http.get("https://api.imjad.cn/cloudmusic/?type=search&s="+$scope.search).then(function (response) {
            console.log(response)
            $scope.songs = response.data.result.songs;
        });
    }
    $scope.getList()
    var isPlay = false;

    $scope.paly = function( data, index ){

        console.log(data)
        $scope.songIndex = index;

        // return
        // if(!isPlay){
        //     audio.play();
        //     isPlay = true;
        //     return;
        // }
        $http({
            method: 'get',
            url: 'https://api.imjad.cn/cloudmusic/',
            params: {
                type: 'song',
                id: data.id,
                br: 128000
            }
        }).then(function (response) {
            isPlay = true;
            audio.src = $scope.audioUrl = response.data.data[0].url;

            
            // history.push({
            //     name  : data.name,
            //     arname: data.alia,
            //     ar    : data.ar,
            //     id    : data.id
            // });
            // localStorage.history = JSON.stringify(history)
            // $scope.history = history
        });
    }
    $scope.pause = function(){
        audio.pause();
        isPlay = false;
    }

});


app.filter('order', function() { //可以注入依赖
    return function(text) {
        text = text + 1;
        return text < 10 ? ('0' + text) : text;
    }
});