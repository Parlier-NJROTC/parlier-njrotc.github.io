let btn =  document.getElementsByClassName("btn")
for (let i = 0; i < btn.length; i++) {
    if(btn[i].children[0]){
        btn[i].onmouseleave = ()=>{btn[i].children[0].style.display = "none"}
    }
    if(btn[i].children[0]){
        btn[i].onmouseover = ()=>{btn[i].children[0].style.display = "block"}
    }
}

// open source code (modified) found on js fiddle
// https://jsfiddle.net/m8ndw8gj/1/

function pos(el) {
    return el.getBoundingClientRect();
}

function CoveredElement(el1, el2) {
var rect1 = pos(el1);
var rect2 = pos(el2);
return !(rect1.right < rect2.left ||  
    rect1.left > rect2.right ||  
    rect1.bottom < rect2.top ||  
    rect1.top > rect2.bottom); 
}



let fade = true

function animatebar(){

    if(($(document).scrollTop()/ $(window).height())*100>5 && !fade){

        $("#topbar").animate({backgroundColor: "rgba(0, 0, 128, 1)"},100)
        fade = true
    }
    if(($(document).scrollTop()/ $(window).height())*100<5 && fade){
        $("#topbar").animate({backgroundColor: "rgba(0, 0, 128, 0.5)"},100)
        let drops = $(".dropdown")
        fade = false
    }
        
     
}
window.onscroll = animatebar

window.onscrollend = () =>{
    animatebar()
    console.log("end")
}