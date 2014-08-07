var mobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);
    if(mobile != null) {
        $('html').css('width', window.innerWidth + 'px');
    } else {
        $(".scroll").each(function () {
            var block = $(this);
            $(window).scroll(function() {
                var top = block.offset().top;
                var bottom = block.height()+top;
                top = top - $(window).height();
                var scroll_top = $(this).scrollTop();
                if ((scroll_top > top) && (scroll_top < bottom)) {
                    if (!block.hasClass("animated")) {
                        block.addClass("animated"); block.removeClass("hidden");
                    }
                } else {
                    block.removeClass("animated"); block.addClass("hidden");
                }
            });
        });
        $('head').append('<link rel="stylesheet" href="https://rawgit.com/enceos/Web-Scripts/master/animation/animate.css" />');
    }