import recentContents from './recent.js';
import viewContents from './view.js';
import popularContents from './popular.js';

const $list = document.getElementById('list');
var tabs = document.getElementsByTagName('li');

const $content_list = document.createElement("div");
$content_list.className = "api_list";
$list.appendChild($content_list);

tabClick()

//리스트 보여주는 함수
function showList(indexNum) {
    var data;
    if(indexNum === 0) {
        data = recentContents;
    } else if(indexNum === 1) {
        data = viewContents
    } else {
        data = popularContents
    }

    const $content = document.createElement("div");
    $content.className = "content";
    $content_list.appendChild($content);

    const $link = document.createElement("a");
    $link.className = "link";
    $link.setAttribute("href", data.url);
    $content.appendChild($link);

    const $img = document.createElement("img");
    $img.className = "img";
    $img.setAttribute("src", data.img);
    $link.appendChild($img);

    const $title = document.createElement("h3");
    $title.className = "title";
    let title = document.createTextNode(data.title);
    $title.appendChild(title);
    $link.appendChild($title);

    const $cp = document.createElement("h4");
    $cp.className = "cp";
    let cp = document.createTextNode(data.cp);
    $cp.appendChild(cp);
    $link.appendChild($cp);
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
            //console.log(i) //3 출력
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