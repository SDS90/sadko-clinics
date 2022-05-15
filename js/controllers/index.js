;(function (window, $, Masonry, Flickity, utils, GradientAnimation) {
    var patientGallery,
        //gradientColors = ['#8ecdf6', '#e296bf', '#8582bc', '#edc158', '#97c89a', '#6bbfbe', '#efbf88', '#93cac4', '#d44f68', '#88a3d6', '#92c37c', '#da6f5b', '#546e7a'],
        gradientColors = ['#686aad', '#93cac4', '#52C1C5','#CE81C5','#6ACCCA']
        $patientGalleryBtn = $('#patient-gallery-btn');

    function init () {
        initializeMasonry();
        initializeTileGallery();

        if (!$(".technical-page").length || !$(".technical-bottom-page").length){
            initializeEquipmentGallery();
        }
        initializePatientGallery();
        initializeTips();

        smileControl.init(86,33,35);

        new GradientAnimation('#clinic-tile-gradient', {
            colors: gradientColors
        })

        $patientGalleryBtn.on('click', onClickPatientGalleryBtn);
    }

    function initializeMasonry() {
        if ($('.main-page #clinic-tiles').length){
            new Masonry('.main-page #clinic-tiles, .main-page  #clinic-tiles-hidden', {
                itemSelector: '.clinic-tile',
                columnWidth: 386
            })
        }
    }

    function initializeTileGallery () {
        if ($("#tile-gallery").length){
            new Flickity('#tile-gallery', {
                prevNextButtons: false,
                autoPlay: 5000 
            })
        }
    }

    function initializeEquipmentGallery () {
        if ($("#equipment-gallery").length){
            utils.initializeFlickityFadeGallery('#equipment-gallery','#equipment-gallery-nav')
        }
        if ($("#doc-gallery").length){
            utils.initializeFlickityFadeGallery('#doc-gallery','#doc-gallery-nav')
        }
    }

    function initializePatientGallery() {
        if ($("#patient-gallery").length){
            patientGallery = new Flickity('#patient-gallery', {
                prevNextButtons: false,
                pageDots: false,
                wrapAround: true,
                draggable: false,
                selectedAttraction: 1.0,
                friction: 1.0
            })
        }
    }

    function initializeTips () {
        $('.dot-note').tooltipster({
            position: 'bottom',
            interactive: true,
            trigger: 'click',
            delay: 0,
            maxWidth: 220,
            offsetY: -20
        });
    }


    //  Events
    // -------------------------------------------------

    function onClickPatientGalleryBtn() {
        patientGallery.next()
    }

    init();

    
    $(function(){

        var mainVideoIframe = $('.header .video-frame iframe')[0];
        var mainPlayer = $f(mainVideoIframe);

        // When the player is ready, add listeners for pause, finish, and playProgress
        mainPlayer.addEvent('ready', function() {
            
            mainPlayer.addEvent('playProgress', function(){
                $("#headerBg").addClass("load");
                $(".video-section .video-overblock").addClass("play-video");
            });
        });

        var headerVideo = document.getElementById("headerVideo");
        if ($("#headerVideo").length){
            setTimeout(function(){ 
                headerVideo.play();
            },3000);
        }

        //Выдвигаем шапку
        setTopHeader($(window),0);
        $(window).scroll(function(){ 
            setTopHeader($(this),400);
        });

        function setTopHeader(window,time){
            if ( window.scrollTop() > $(".header").height() ){
                $(".main-header-inner").stop().animate({
                    "top":0
                },time, 'linear');
            } else if(window.scrollTop() <= $(".header").height() ) {
                $(".main-header-inner").stop().animate({
                    "top":-170
                },time, 'linear');
            }
        }

    });

})(window, jQuery, Masonry, Flickity, utils, GradientAnimation);