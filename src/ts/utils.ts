/* common utilities used */

/*
Chrome:
    Linux: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
    Android: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36
Firefox:
    Linux: Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0
    Android: Mozilla/5.0 (Android 12; Mobile; rv:130.0) Gecko/130.0 Firefox/130.0
*/
// increase this number for the amount of hours wasted: 
// let HoursWasted = 3;
function isMobile():boolean{
    /*
        let browser = window.navigator.userAgent.split("(")[1].split(")")[0].split(";")[1].trim()
        if(browser=="Mobile"){return true;}else{return false;}
    */
    return window.navigator.userAgent.includes("Mobile")
}

function getBrowserData(){
    let data = {
        browser:"",
        device:""
    }
    

}

export default {
    isMobile
}