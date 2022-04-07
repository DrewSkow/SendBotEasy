const btn = document.getElementById("btn");
const stor = chrome.storage.sync;

const setState = (v) => {
    if (v==true){
        btn.children[0].checked=true;
    } else {btn.children[0].checked=false}
}


stor.get("switch", v => setState(v.switch));

const switcher = (v) => {
    if(v==undefined){
        stor.set({switch:true});
    } else if (v==true){
        stor.set({switch:false});
    } else if (v==false) {stor.set({switch:true});}
}

btn.onclick = () => {
    stor.get("switch", v => switcher(v?.switch))
}



