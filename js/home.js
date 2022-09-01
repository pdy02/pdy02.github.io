document.body.onscroll = function(event){
    // console.log(typeof $("div.head").height());
    // if(scrollY >= $("section.nav").height()){
    //     $("section.nav").css({
    //         "position":"fixed",
    //         "backgroundColor":"#fff",
    //         "boxShadow":"0 10px 30px 0 rgba(0,0,0,.3)"
    //     }).find("a").css("color","#000").end().find("span").css("color","#000")
    // }else{
    //     $("section.nav").css({
    //         "position":"absolute",
    //         "backgroundColor":"transparent",
    //         "boxShadow":""
    //     })
    // }
    if(scrollY >= $("section.nav").height()){
        $("section.nav").addClass("active")
    }else{
        $("section.nav").removeClass("active")
    }
}