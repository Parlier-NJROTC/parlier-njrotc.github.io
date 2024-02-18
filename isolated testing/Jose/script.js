document.getElementById("menuBtn").onclick = ()=>{
    document.getElementById("menus").style.width = "50vmin"
    document.getElementById("blur").style.display = "block"
    document.getElementById("blur").style.opacity = "0.5"
}
document.getElementById("close").onclick = ()=>{
    document.getElementById("menus").style.width = "0vmin"   
    document.getElementById("blur").style.display = "none"
    document.getElementById("blur").style.opacity = 0
}