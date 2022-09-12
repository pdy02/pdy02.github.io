var mySwiper = new Swiper('.swiper', {
    direction: 'vertical', // 垂直切换选项
    // loop: true, // 循环模式选项
    speed: 1000,
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        // swiper-pagination-color
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChangeTransitionStart: function () {
            // alert(this.activeIndex);
            $(".swiper-slide").eq(this.activeIndex).find(".warp").css("opacity", "1").end().siblings().find(".warp").css("opacity", "0")
            // $("video").play();
        }
    },
    // 鼠标事件
    mousewheel: true,
    // 如果需要滚动条
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
    //自动播放
    // autoplay: {
    //     delay: 1500,
    //     stopOnLastSlide: false,
    //     disableOnInteraction: true,
    // }
})
$('.swiper-pagination-bullet').hover(function () {
    mySwiper.slideTo($(this).index(), 1000, false);//切换到第一个slide，速度为1秒
    // console.log($(this).index());
    $(".swiper-slide").eq($(this).index()).find(".warp").css("opacity", "1").end().siblings().find(".warp").css("opacity", "0")
})

window.onload = function () {
    $(".lop").fadeOut(1000)
}