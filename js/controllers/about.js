
//Страница о компании


(function($){
    $.fn.plaxmove = function(options) {

        this.defaults = {
            ratioH: 0.2,
            ratioV: 0.2,
        }

        var x1 = $('#clinicBlock').offset().left + $('#clinicBlock').outerWidth() - $(this).width();
        var y1 = 0;
        var x2 = $('#clinicBlock').offset().left;
        var y2 = $('#clinicBlock').height() - $(this).height();
     
        var settings = $.extend({},this.defaults,options),
            layer = $(this),
            center = {
                x: $('#clinicBlock').width()/2,
                y: $('#clinicBlock').height()/2
                //x: layer.position().top/2,
                //y: layer.position().left/2
            },
            y0 = layer.position().top,
            x0 = layer.position().left;
            

                var eqH = function(e) {
                    var result = x0+(e.pageX - center.x)*settings.ratioH;

                    if ((result <= x2) && (result >= x1)){
                        return result 
                    } else {
                        return false
                    }
                }
            
                var eqW = function(e) {
                    var result = y0+(e.pageY - center.y)*settings.ratioV;

                    if ((result <= y1) && (result >= y2)){
                        return result 
                    } else {
                        return false
                    }
                }       

        $('#clinicBlock').on('mousemove', function(e) {

                x = eqH(e)
                y = eqW(e)

                $(layer).css({top:y,left:x})

        })

    };
})(jQuery);

$(function(){

    $('#clinicBlock').css("height",$(window).height() - $("#topHeader").height());

    //Двигаем слайды
    $(".about-slider .slide-photo img").each(function(){

        if ($('#clinicBlock').length) {

            $(this).css("left", ($('#clinicBlock').width() - parseInt($(this).attr("width")))/2);
            $(this).css("top", ($('#clinicBlock').height() - parseInt($(this).attr("height")))/2);

            var x1 = $('#clinicBlock').offset().left + $('#clinicBlock').outerWidth() - $(this).width();
            var y1 = $('#clinicBlock').offset().top + $('#clinicBlock').outerHeight() - $(this).height();
            var x2 = $('#clinicBlock').offset().left;
            var y2 = $('#clinicBlock').offset().top;

            /*$(this).draggable({
               containment: [x1,y1,x2,y2]
            });*/

            $(this).css("position","relative").plaxmove({ratioH:0.05,ratioV:0.05})
        }
    });

        //Основной слайдер Поликлиники
    if ($(".about-slider .slide").length > 1){
        $(".about-slider").owlCarousel({
            items: 1,
            pagination: true,
            smartSpeed: 1000,
            navigationText: false,
            nav: false,
            loop: false,
            mouseDrag: false,
            autoplay: false,
            responsive: false,
            onInitialized: function(){

            }
        });
    }
});