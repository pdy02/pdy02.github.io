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

$.get("/public/jsCase.json",function(res){
    let [ {main:jsCase},{main:jqCase},{main:bsCase},{main:hcCase} ] = res;


    $("#jsCase").find(".main ul").append(
        jsCase.map((item)=>{
            return ` <li>
                        <a class="card" href="${item.url}">
                            <div class="img">
                                <div class="img-bg" style="background-image:url('${item.imgurl}');"></div>
                            </div>
                            <div class="info">
                                ${item.text}
                            </div>
                        </a>
                    </li>`
        })
    )
    $("#jqCase").find(".main ul").append(
        jqCase.map((item)=>{
            return ` <li>
                        <a class="card" href="${item.url}">
                            <div class="img">
                                <div class="img-bg" style="background-image:url('${item.imgurl}');"></div>
                            </div>
                            <div class="info">
                                ${item.text}
                            </div>
                        </a>
                    </li>`
        })
    )
    $("#bs").find(".main ul").append(
        bsCase.map((item)=>{
            return ` <li>
                        <a class="card" href="${item.url}">
                            <div class="img">
                                <div class="img-bg" style="background-image:url('${item.imgurl}');"></div>
                            </div>
                            <div class="info">
                                ${item.text}
                            </div>
                        </a>
                    </li>`
        })
    )
    $("#hc").find(".main ul").append(
        hcCase.map((item)=>{
            return ` <li>
                        <a class="card" href="${item.url}">
                            <div class="img">
                                <div class="img-bg" style="background-image:url('${item.imgurl}');"></div>
                            </div>
                            <div class="info">
                                ${item.text}
                            </div>
                        </a>
                    </li>`
        })
    )
})