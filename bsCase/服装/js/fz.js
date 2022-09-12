// 监听滚动
document.body.onscroll = function(){
    // console.log(scrollY);
    if(scrollY >= 100){
        $("header.head").addClass("act")
    }else{
        $("header.head").removeClass("act")
    }
}

var index = 0;
// 轮播事件
function init(n){
    $(".swiper").find(".slide").eq(n).addClass("active").siblings().removeClass("active")
    $(".swiper").find(".slide").find(".info h2").css("opacity","0").end().find(".info a").css("opacity","0")
    setTimeout(function(){
        $(".swiper").find(".slide").eq(n).find(".info h2").css("opacity","1")
    },300)
    setTimeout(function(){
        $(".swiper").find(".slide").eq(n).find(".info a").css("opacity","1")
    },500)
}
init(index)


function fnNext(){
    index++;
    if(index >= $(".swiper").find(".slide").length){
        index = 0;
    }
    init(index)
}
function fnBack(){
    index--;
    if(index <= -1){
        index = $(".swiper").find(".slide").length -1
    }
    init(index)
}
$(".swiper-next").click(fnNext);
$(".swiper-back").click(fnBack);

setInterval(fnNext,3000)
$("header.head").find(".bars a").click(function(){
    // console.log(123);
    var isOpen =  $(this).find("i").hasClass("fa-bars")
    if(isOpen){
        // console.log("打开了");
        $(this).find("i").removeClass("fa-bars").addClass("fa-times")
        $("header.head").find(".small").css("display","block")
    }else{
        $(this).find("i").removeClass("fa-bars").addClass("fa-bars")
        $("header.head").find(".small").css("display","none")
    }
})

// var toggleTheme = true;
console.log(localStorage.getItem("theme"));
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme","bright")
    // toggleTheme = true;
}
function fnTheme(){
    if(localStorage.getItem("theme") == "album"){
        localStorage.setItem("theme","bright")
    }else if(localStorage.getItem("theme") == "bright"){
        localStorage.setItem("theme","album")
    }

    themeInit()
    
}
function themeInit(){
    if(localStorage.getItem("theme") == "album"){
        $(document.body).addClass("album")
        $("header.head").find(".icon a").find("i").removeClass("fa-sun-o").addClass("fa-moon-o")

    }else{
        $(document.body).removeClass("album")
        $("header.head").find(".icon a").find("i").removeClass("fa-moon-o").addClass("fa-sun-o")

        
    }
}
themeInit()
$("header.head").find(".icon a").click(fnTheme)