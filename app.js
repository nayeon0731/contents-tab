import recentContents from './recent.js';
import viewContents from './view.js';
import popularContents from './popular.js';
/*
API에서 제목, 링크, 이미지, CP 를 적절히 표시
JS 에러 발생하면 안됨
JS 네이티브 함수 사용, 최신 DOM 사용하여 구현
ES6 사용
JS 함수화
*/
const $list = document.getElementById('list');
const $tabs = document.getElementsByTagName('li');
const $moreBtn = document.getElementsByClassName("btn btn-default")[0].parentNode;
const $loading = document.getElementsByClassName("glyphicon glyphicon-refresh")[0].parentNode;
$loading.style.visibility = "hidden";

const $content_list = document.createElement("div");
$content_list.className = "content_list";
$list.prepend($content_list);

var data;
var contentNum = 10;
var selectedTab = 0;

tabClick();
showList(selectedTab);

$moreBtn.addEventListener("click", (e) => {
    contentNum += 10;
    loadingContents();
})

function makeContent(data) {
    for(var i=contentNum-10; i<contentNum; i++) {
        if(i >= data.length) {
            break;
        }
        const $content = document.createElement("div");
        $content.className = "content";
        $content_list.appendChild($content);

        const $link = document.createElement("a");
        $link.className = "link";
        $link.setAttribute("href", data[i].url);
        $content.appendChild($link);

        const $img = document.createElement("img");
        $img.className = "img";
        $img.setAttribute("src", data[i].img);
        $link.appendChild($img);

        const $title = document.createElement("h3");
        $title.className = "title";
        let title = document.createTextNode(data[i].title);
        $title.appendChild(title);
        $link.appendChild($title);

        const $cp = document.createElement("h4");
        $cp.className = "cp";
        let cp = document.createTextNode(data[i].cp);
        $cp.appendChild(cp);
        $link.appendChild($cp);
    }
}

//리스트 보여주는 함수
function showList(indexNum) {
    if(indexNum === 0) {
        data = recentContents;
        makeContent(data);
    } else if(indexNum === 1) {
        data = viewContents
        makeContent(data);
    } else {
        data = popularContents
        makeContent(data);
    }
}

//탭 초기화
function initTab() {
    var c = document.getElementsByClassName('content_list');
    c[0].innerHTML = '';
    for(var i=0; i<$tabs.length; i++) {
        $tabs[i].className = ''
    }
}

function tabClick() {
    for(var i=0; i<$tabs.length; i++) {
        $tabs[i].addEventListener("click", (e) => {
            initTab();
            contentNum = 10;
            e.currentTarget.className = 'active'
            for(var j=0; j<$tabs.length; j++){
                if($tabs[j].className === 'active') {
                    selectedTab = j;
                    console.log(j);
                    loadingContents();
                }
            }
        })
    }
}

function loadingContents() {
    $loading.style.visibility = "visible";
    setTimeout(function() {
        $loading.style.visibility = "hidden";
        showList(selectedTab);
      }, 1000);
}

