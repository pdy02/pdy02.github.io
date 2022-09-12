$("aside").click(function (event) {
    if (event.target === this) {
        $("aside").find(".main").animate({
            left: -280,
            opacity:0
        }, 300, "linear",function(){
            $("aside").css({
                "display": "none",
            })
        })
    }
})

$("section.nav").find(".open").click(function () {
    $("aside").css({
        "display": "block",
    })
    setTimeout(function () {
        $("aside").find(".main").animate({
            left: 0,
            opacity:1
        }, 300, "linear")
    }, 0)
})

$("aside .main").find("a.pages").click(function(){
    // $("ul.select").animate({
    //     height:120
    // },300,"linear")

    $("ul.select").toggleClass("act")
})