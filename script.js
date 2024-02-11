
const Watcher = new IntersectionObserver((els)=>{
    els.forEach((els)=>{
        if(els.isIntersecting){
            console.log("seen")
        }
    })
})

let left = document.getElementsByClassName("animateLeft");
left.forEach(Watcher.observe(left))


function animate() {
    document.getElementById("bgimg").style.top = -(0-document.body.scrollTop)+"px"
    requestAnimationFrame(animate)
}