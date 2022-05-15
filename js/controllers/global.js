/**
 * Global page controller
 */
;(function (window, mainNavigation) {
    var $book = $('.book-toggle'),
        $bookContent = $('#book-app-content'),
        $bookAnswerContent = $('#book-app-answer');

    function init () {
        mainNavigation.init();
        initializeAutoSize();
        //$book.on('click', bookAppModal);
       

        //Показываем все услуги
        $("#show-full-services").click(function(){
            if ($(this).hasClass("opened")){
                $("#services .hide").hide();
                $(this).removeClass("opened");
            } else {
                $("#services .hide").show();
                $(this).addClass("opened");
            }

            servicesMasonry.layout();

            return false;
        });

    }

    function initializeAutoSize () {
        autosize($('.autosize'));
    }

    $(window).on("load", init);

})(window, mainNavigation);

$(function(){

    //анимация улыбки
    smileControl.init();

    //Активные кнопки
    setSelectNav();

    //Выдвигаем шапку
    $(window).scroll(function(){

        var scrollLeft = $(this).scrollLeft();
        $("#topHeader").css("left", -scrollLeft);

        setSelectNav();
        setInnerHeader($(this),400);
    });

    //Открываем выпадающее меню
    var menuTimer;
    $(".nav-main--item.-has-inner-").hover(function(){
        var $this = $(this);
        menuTimer = setTimeout(function(){
            $this.addClass("hover");
        },100);
    },function(){
        clearTimeout(menuTimer);
        $(this).removeClass("hover");
    });

    //Масонри   
    $(".clinic-service-section").each(function(){
        new Masonry(this,{
            itemSelector: '.service-block',
            columnWidth: '.service-block',
        });
    });

    //Прокрутка (отзывы докторов)
    $(".doctor-signature .about-doctor").scrollbar();

    //Адреса
    $(".clinic-tile .clinic-tile--adrs").scrollbar();
    $(".clinic-tile .clinic-tile--adrs").on("mousewheel",function(event, delta) {

      this.scrollTop -= (delta * 30);

      if (this.scrollTop > 0){
        $(this).closest(".scroll-wrapper").addClass("scrolling");
      } else {
        $(this).closest(".scroll-wrapper").removeClass("scrolling");
      }
      return false;
    });

    //Показываем видео
    $('.open-video').attr('rel', 'media-gallery').fancybox({
        openEffect : 'none',
        closeEffect : 'none',
        prevEffect : 'none',
        nextEffect : 'none',
        padding: 60,
        arrows : false,
        width: 500,
        height: 375,
        helpers : {
            media : {},
            buttons : {},
            overlay: {
              locked: false // отключаем блокировку overlay
            }
        }
    });

    //Видео
    var videoWrapperHeight,videoFrameHeight;
    var bgURL;
    if (!$(".header .video-section").length){
        videoWrapperHeight = $(window).height() - $("#topHeader").height();
        videoFrameHeight = videoWrapperHeight + 200;
    } else {
        videoWrapperHeight = $(window).height();
        videoFrameHeight = videoWrapperHeight + 200;
        $(".header-title").css("margin-top",$(window).height()/2 - $(".header-top").outerHeight() - $(".header-title").outerHeight());
        //bgURL = "url(https://i.vimeocdn.com/video/551772338.webp?mw=1920&mh=" + videoFrameHeight + ")";
        //$("#headerBg, .video-section .video-overblock").css("background-image",bgURL);
        var headerVideo = document.getElementById("headerVideo");
        setTimeout(function(){ 
            headerVideo.play();
        },3000);
    }

    $(".video-section, .video-section .video-frame").css("height",videoWrapperHeight);
    //$(".video-section object, .video-section video").attr("height",videoWrapperHeight);
    $(".video-section iframe").css("height",videoFrameHeight);

    $(".video-overblock").on("click",function(){
        $(this).closest(".video-wrapper").find(".video-button").trigger("click");
    });

    $(".video-button").on("click",function(){
        var $this = $(this);
        var iframe = $(this).closest(".video-wrapper").find("iframe")[0];
        var player = $f(iframe);
        var video = document.getElementById("video");
                
        if ($this.hasClass("playing")){
            $this.removeClass("playing");
            if ($(this).closest(".video-wrapper").find("iframe").length){
                player.api("pause");
            } else {
                video.pause();
            }
            $this.closest(".video-wrapper").find(".video-overblock").removeClass("play-video");
            $this.closest(".doc-gallery--item").find(".doctor-info, .all-doctors-link").fadeIn();
        } else {
            $this.addClass("playing");
            if ($(this).closest(".video-wrapper").find("iframe").length){
                player.api("play");
            } else {
                video.play();
            }
            $this.closest(".video-wrapper").find(".video-overblock").addClass("play-video");
            $this.closest(".doc-gallery--item").find(".doctor-info, .all-doctors-link").fadeOut();
        }            
        return false;
    });

    $("#doc-gallery-nav .doc-tile.doctor-signature").on("click",function(){
        $("#doc-gallery .video-wrapper .playing").each(function(){
            $(this).trigger("click");
        });
    });

    //Галереи
    $(".video-carousel .image-link").attr("rel","photo-gallery").fancybox({
        padding: 40,
        helpers : {
            overlay: {
              locked: false // отключаем блокировку overlay
            }
        }
    });


    $(".photo-slider").each(function(i,v){
        var num = i;
        var $this = $(this);
        $this.find(".image-link").attr('rel', 'photo-gallery' + num).fancybox({
            padding: 40,
            helpers : {
                overlay: {
                  locked: false // отключаем блокировку overlay
                }
            }
        });

        if ($(this).find(".link-block").length > 4){
            //Прокрутка
            //Ссылка на плагин: http://www.owlcarousel.owlgraphic.com
            var photoGalleryItems = 4;
            $this.owlCarousel({
                items: photoGalleryItems,
                pagination: false,
                slideSpeed: 600,
                navigationText: false,
                nav: true,
                addClassActive: true,
                mouseDrag: false,
                responsive: false,
                onInitialized: function(){
                    $this.find('.owl-prev').addClass('disabled');
                    if ( $this.find('.link-block').length < photoGalleryItems + 1 ) {
                      $this.find('.owl-next').addClass('disabled');
                    }
                }
            });

            $this.on('changed.owl.carousel',function(property){
                var current = property.item.index;
                $this.find('.owl-next').removeClass('disabled');
                $this.find('.owl-prev').removeClass('disabled');
                if ( current == 0 ) {
                  $this.find('.owl-prev').addClass('disabled');
                }
                if ( current + photoGalleryItems == property.item.count ) {
                  $this.find('.owl-next').addClass('disabled');
                }
            });
        } 
    });

    //Вешаем масонри
    $(".doctor-special-masonry").each(function(){
         new Masonry(this, {
            itemSelector: '.doctor-special-block',
            columnWidth: '.doctor-special-block'
        });
    });   

    $(".nav-main--inner--content").each(function(){

        if ($(this).find(".col-3").length){
            new Masonry(this, {
                itemSelector: '.col-3',
                columnWidth: '.col-3',
                layoutPriorities: {
                    shelfOrder: 4
                }
            });
        }

        if ($(this).find(".col-9").length){
            new Masonry(this, {
                itemSelector: '.col-9',
                columnWidth: '.col-9',
                layoutPriorities: {
                    shelfOrder: 4
                }
            });
        } 
    });

    //Записаться
    $("body").on("mouseover", ".book-toggle", function () {
        $(this).find(".book-text").show(400);
    });
    $("body").on("mouseleave", ".book-toggle", function () {
        $(this).find(".book-text").stop().hide(400);
    });

    //Отзывы (слайдер)
    //Ссылка на плагин: http://www.owlcarousel.owlgraphic.com
    if ($(this).find(".doctor-review-wrapper").length > 3){
        $(".doctor-reviews").each(function(){
            var reviewSlider = $(this);
            var reviewItemsNum = 3;
            reviewSlider.owlCarousel({
                items: reviewItemsNum,
                pagination: false,
                slideSpeed: 600,
                navigationText: false,
                pullDrag: false,
                touchDrag: false,
                mouseDrag: false,
                nav: true,
                responsive: false,
                onInitialized: function(){
                    $('.doctor-reviews .owl-prev').addClass('disabled');
                    if ( $('.doctor-reviews .owl-item').length < reviewItemsNum + 1 ) {
                      $('.doctor-reviews .owl-next').addClass('disabled');
                    }
                }
            });

            reviewSlider.on('changed.owl.carousel',function(property){
                var current = property.item.index;
                $('.doctor-reviews .owl-next').removeClass('disabled');
                $('.doctor-reviews .owl-prev').removeClass('disabled');
                if ( current == 0 ) {
                  $('.doctor-reviews .owl-prev').addClass('disabled');
                }
                if ( current + reviewItemsNum == property.item.count ) {
                  $('.doctor-reviews .owl-next').addClass('disabled');
                }
            });

        });
    }

    //Скрываем боковое меню
    var minLinkWidht = 0;
    $(".fixed-menu a>div").each(function(){
        if ($(this).width() > minLinkWidht){
            minLinkWidht = $(this).width();
        }
    });
    $(".fixed-menu .background-block").css("min-width",minLinkWidht);
    setTimeout(function(){
        $(".fixed-menu div").fadeOut();

        $(".fixed-menu a").hover(function(){
            $(this).find(">div").fadeIn();
            $(".fixed-menu .background-block").fadeIn();
        },function(){
            $(this).find(">div").fadeOut();
            $(".fixed-menu .background-block").fadeOut();
        });
    },10000);

    //Выдвигаем шапку
    setInnerHeader($(window),0); 

    function setInnerHeader(window,time){

        if (!$(".header-inner").hasClass("main-header-inner")) {
        
            if ( window.scrollTop() > 150 ){
                $(".header-inner").stop().animate({
                    "top":-170
                },time, 'linear');
            } else if(window.scrollTop() <= 150 ) {
                $(".header-inner").stop().animate({
                    "top":0
                },time, 'linear');
            }
        }
    }

    //Автопрокрутка
    $('.fixed-menu').on('click',"a",function (e) {
         
        var target = this.hash;
        var $target = $(target);
         
        if ($target.length){
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 1000, 'swing', function () {
                //console.log($(window).scrollTop())
                var scrollTop = $(window).scrollTop();
                window.location.hash = target;
                if ($(window).scrollTop() != scrollTop){
                    $('html, body').stop().animate({
                        'scrollTop': $target.offset().top
                    }, 0, 'swing');
                }

            });    

            return false;
        } else {
            return true;
        }
    });

    //Слайдер-баннер
    $(".banner-slider").each(function(){
        if ($(this).find(".banner-block").length > 1){
            $(this).owlCarousel({
                items: 1,
                pagination: true,
                slideSpeed: 1000,
                navigationText: false,
                nav: false,
                addClassActive: true,
                mouseDrag: false,
                responsive: false,
                loop: true,
                autoplay: true
            });
        }
    });


    $(document.body).click(function(event){
        if ($(event.target).closest(".question-popup, .more-members-info, .open-video, .image-link, .filter-block, .filter-open-button").length) return;
        $(".question-popup, .more-members-info, .filter-block").fadeOut();
        event.stopPropagation();
    });


    //Всплывающие блоки
    $("body").on("mouseover",".doctor-special-block, .action-full-block",function(){
        $(".hover-block").stop().hide();
        $(this).find(".hover-block").fadeIn(300);
    });
    $("body").on("mouseleave",".doctor-special-block, .action-full-block",function(){
        $(this).find(".hover-block").hide();
    });

    //Вверх
    $(".footer-top").on("click",function(){
        $('html, body').stop().animate({
            'scrollTop': 0
        }, 600, 'swing');
        return false;
    });

    //Показываем подсказки
    $(".show-text").hover(function(e){
        $("body").append('<div class="title-block"><span>' + $(this).data("text") + '</span></div>');
        var X = e.pageX; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
        var Y = e.pageY; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ Y
        var width = $(".title-block").width() + 20;
        $(".title-block").css({
            "top": Y + 35,
            "left": X - width,
        }).show();
    }, function(){
        $(".title-block").remove();
    });

    $(".show-text").mousemove(function(e){
         var X = e.pageX; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ X
        var Y = e.pageY; // Р С—Р С•Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ Р С—Р С• Р С•РЎРѓР С‘ Y
        var width = $(".title-block").width() + 20;
        $(".title-block").css({
            "top": Y + 35,
            "left": X - width,
        }).show();
    });

    //Открываем информацию о докторе или руководителе
    $("body").on("click", ".more-doctor-special",function(){
        var $this = $(this),
            text = $this.text();
        var height = $this.closest(".doctor-block").height();
        var doctorInfo = $this.closest(".about-doctor");

        if (doctorInfo.hasClass("opened")){
            doctorInfo.find(".doctor-scroll-wrapper.scroll-content").scrollbar('destroy');
            doctorInfo.stop().animate({
                height: doctorInfo.data("real-height")
            }, 400, function(){
                doctorInfo.removeClass("opened");
            });
            doctorInfo.find(">.doctor-scroll-wrapper").removeClass("overflow-list");
            doctorInfo.find(".button-wrapper").slideUp(400);
            doctorInfo.find(".doctor-special-hidden-list").slideUp(400);
        } else {
            
            doctorInfo.addClass("opened").stop().animate({
                height: height
            }, 400,function(){
                var list = doctorInfo.find(">.doctor-scroll-wrapper");
                list.scrollbar();
                if (list.height() >= parseInt(list.css("max-height"))){
                    doctorInfo.find(".scroll-wrapper").addClass("overflow-list");
                }
            });
            doctorInfo.find(".button-wrapper").slideDown(400);
            doctorInfo.find(".doctor-special-hidden-list").slideDown(400);
        }        

        $this.text($this.data("opened-text"));
        $this.data("opened-text",text);
        return false;
    });

    //Показываем оборудование
    $(".technology-block .technology-scroll").scrollbar();

    $(".technology-block .technology-scroll").on("mousewheel",function(event, delta) {
        this.scrollTop -= (delta * 50);
      if (this.scrollTop > 0){
        $(this).closest(".scroll-wrapper").addClass("scrolling");
      } else {
        $(this).closest(".scroll-wrapper").removeClass("scrolling");
      }

      return false;
    });

    //Оборудование (выравниваем названия)
    checkTechnologiesHeight();

    $("body").on("click",".technology-block .top-button",function(){
        var techoBlock = $(this).closest(".technology-block");

        if (techoBlock.hasClass("opened")){
            techoBlock.find(".bottom-block").animate({
                bottom: techoBlock.data("bottom")
            }, 400,function(){
                techoBlock.removeClass("opened");
            });
        } else {
            techoBlock.addClass("opened");
            techoBlock.attr("data-bottom",techoBlock.find(".bottom-block").css("bottom"));
            techoBlock.find(".bottom-block").animate({
                bottom: "0px"
            }, 400);
        }
        
        return false;
    });

    //Показываем скрытые блоки оборудования
    $("body").on("click",".open-hidden-technologies",function(){
         $("body").find(".technologies-hidden").eq(0).removeClass("technologies-hidden").slideDown(400);
         if (!$("body").find(".technologies-hidden").length){
            $(this).closest(".more-technologies").css("visibility","hidden");
         }
         return false;
    });

     //Переключение вкладок
    $(".dms-tabs .tab-link").click(function(){
        var $this = $(this);
        $(".dms-tabs .tab-link.active").removeClass("active");
        $this.addClass("active");
        $(".tab-block").hide();
        $('[data-tab=' + $this.attr('href') + ']').show();
        return false;
    });

    //При загрузке
    $(".tab-block").hide();
    if (!$(".tab-link.active").length){
        $(".tab-link").eq(0).addClass("active");
    }
    $(".tab-link.active").trigger("click");



});

$(window).load(function () {
    $(window).trigger("resize");

    //Масонри   
    $(".clinic-service-section").each(function(){
        new Masonry(this,{
            itemSelector: '.service-block',
            columnWidth: '.service-block',
        });
    });

    //Выравниваем таблички
    $(".picture-text-block").each(function(){
        var img = $(this).find(">img");
        if ($(this).height() > img.height()){
            img.css("height",$(this).height());
        }
    });

    if (window.location.hash != ""){
        var scrollTopFirst = $(window).scrollTop();
        var scrollTopSecond = $(window).scrollTop();

        $('html, body').stop().animate({
                'scrollTop': 0
            }, 0, 'swing');

        $('html, body').stop().animate({
            'scrollTop': $(window.location.hash).offset().top 
        }, 1000, 'swing', function () {});
    }
});

$(window).load(function(){
    //Выравниваем блоки докторов
    setDoctorSizes();
});

function setDoctorSizes(){
    //Выравниваем блоки докторов
    $("body").find(".doctor-wrappers-visible .doctor-block .about-doctor").each(function(){
        var padding = $(this).find(".bottom-block").outerHeight() + 35;
        var doctor = $(this).closest(".doctor-block");

        if (!$(this).closest(".doctor-block").hasClass("double-doctor-block")){
            $(this).css("padding-bottom", padding);
        } else {
            if (!$(this).hasClass("checked")){
                $(this).addClass("checked").scrollbar();
            }
        }
    });
  
    $("body").find(".doctor-wrappers-visible .doctors-wrapper").each(function(){

        var doctorMinHeight = 0;

        if (!$(this).find(".doctor-block").hasClass("teacher-small-block")){
            $(this).find(".doctor-block .about-doctor").each(function(){
                if ($(this).outerHeight() > doctorMinHeight){
                    doctorMinHeight = $(this).outerHeight();
                }
            });

            $(this).find(".doctor-block .about-doctor").data("real-height",doctorMinHeight).css("height",doctorMinHeight);
        }
    });
    
}

//Устанавливаем активные кнопки
function setSelectNav(){
    var top = $(window).scrollTop();
    var checkPos = $(window).height()/2;

    $(".fixed-menu a").each(function(){
        var id = $(this).attr("href");
        var link = ".fixed-menu a[href=" + id + "]";
        if ($(id).length) {
            if (top > ($(id).offset().top - checkPos)){
                $(".fixed-menu .active").removeClass("active");
                $(link).addClass("active");
            }
        }
    });
}

//Выравание блоков оборудования
function checkTechnologiesHeight(){
    $(".technologies-wrapper .row-flex").each(function(){
        var techHeight = 72;
        $(this).find(".technology-name-wrapper").each(function(){
            if ($(this).outerHeight() > techHeight){
                techHeight = $(this).outerHeight();
            }
        });
        $(this).find(".technology-name-wrapper").css("height",techHeight);
        $(this).find(".bottom-block").css("bottom", - $(this).find(".technology-block").outerHeight() + techHeight);
    });
}

//Ссылка
function RedirectToPage(hrefUrl) {
    location.href = hrefUrl;
}