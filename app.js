import recentContents from './recent.js';
import viewContents from './view.js';
import popularContents from './popular.js';
/*
가져온 데이터를 id=list 에 노출
로딩이미지 효과: 각 콘텐츠 노출시에 로딩이미지를 1초 노출후에 콘텐츠 노출
API에서 제목, 링크, 이미지, CP 를 적절히 표시
처음 10개만 보여주고 더보기 클릭이 남은 10개 보여주기 (로딩이미지 효과도 구현)
JS 에러 발생하면 안됨
JS 네이티브 함수 사용, 최신 DOM 사용하여 구현
ES6 사용
JS 함수화
*/
const $list = document.getElementById('list');
var tabs = document.getElementsByTagName('li');

const $content_list = document.createElement("div");
$content_list.className = "content_list";
$list.appendChild($content_list);
var data;

tabClick()

function makeContent(data) {
    var c = document.getElementsByClassName('content_list');
    c[0].innerHTML = '';
    for(var i=0; i<data.length; i++) {
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
    for(var i=0; i<tabs.length; i++) {
        tabs[i].className = ''
    }
}

function tabClick() {
    for(var i=0; i<tabs.length; i++) {
        console.log(tabs.length)
        tabs[i].addEventListener("click", (e) => {
            initTab();
            e.currentTarget.className = 'active'
            for(var j=0; j<tabs.length; j++){
                if(tabs[j].className === 'active') {
                    console.log(j);
                    showList(j);
                }
            }
        })
    }
}