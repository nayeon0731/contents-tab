import recentContents from './recent.js';
import viewContents from './view.js';
import popularContents from './popular.js';

const $list = document.getElementById('list');
const $tabs = document.getElementsByTagName('li');
const $moreBtn = document.getElementsByClassName("btn btn-default")[0].parentNode;
const $loading = document.getElementsByClassName("glyphicon glyphicon-refresh")[0].parentNode;
$loading.style.visibility = "hidden";

const $content_list = document.createElement("div");
$content_list.className = "content_list";
$list.prepend($content_list);

var data, tabNum;
var contentNum = 10;
var selectedTab = 0;

tabClick();
showList(selectedTab);

$moreBtn.addEventListener("click", (e) => {
    contentNum += 10;
    loadingContents();
})

function tabClick() {
    for(var i=0; i<$tabs.length; i++) {
        $tabs[i].addEventListener("click", (e) => {
            initTab();
            contentNum = 10;
            e.currentTarget.className = 'active'
            for(tabNum=0; tabNum<$tabs.length; tabNum++){
                if($tabs[tabNum].className === 'active') {
                    selectedTab = tabNum;
                    loadingContents();
                }
            }
        })
    }
}

function initTab() {
    var c = document.getElementsByClassName('content_list');
    c[0].innerHTML = '';
    for(var i=0; i<$tabs.length; i++) {
        $tabs[i].className = ''
    }
}

function loadingContents() {
    $loading.style.visibility = "visible";
    setTimeout(function() {
        $loading.style.visibility = "hidden";
        showList(selectedTab);
      }, 1000);
}

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