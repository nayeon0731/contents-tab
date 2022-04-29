var tabs = document.getElementsByTagName('li');

function initTab() {
    for(var i=0; i<tabs.length; i++) {
        tabs[i].className = ''
        console.log("adfsdf")
    }
}
console.log(tabs);

for(var i=0; i<tabs.length; i++) {
    tabs[i].addEventListener("click", (e) => {
        initTab();
        console.log(e.currentTarget)
        e.currentTarget.className = 'active'
    })
}