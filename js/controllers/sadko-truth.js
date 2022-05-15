
//Вся правда о Садко

$(function(){
	//Слайдер - успехи компании
    var companySuccessSlider = $("#companySuccessSlider");
    var companySuccessItemsNum = 3;

    if (companySuccessSlider.find(".company-success-block").length > companySuccessItemsNum){
	    companySuccessSlider.owlCarousel({
	        items: companySuccessItemsNum,
	        pagination: false,
	        slideSpeed: 1000,
	        navigationText: false,
	        nav: true,
	        responsive: false,
	        onInitialized: function(){
	            $('#companySuccessSlider .owl-prev').addClass('disabled');
	            if ( $('#companySuccessSlider .owl-item').length < companySuccessItemsNum + 1 ) {
	              $('#companySuccessSlider .owl-next').addClass('disabled');
	            }
	        }
	    });
	}

    companySuccessSlider.on('changed.owl.carousel',function(property){
        var current = property.item.index;
        $('#companySuccessSlider .owl-next').removeClass('disabled');
        $('#companySuccessSlider .owl-prev').removeClass('disabled');
        if ( current == 0 ) {
          $('#companySuccessSlider .owl-prev').addClass('disabled');
        }
        if ( current + companySuccessItemsNum == property.item.count ) {
          $('#companySuccessSlider .owl-next').addClass('disabled');
        }
    });

    //Показываем статистику
    $(window).scroll(function(){

       var sadkoScrollTop = $(window).scrollTop();
       var sadkoCheckPos = $(window).height()/3;

       if ($("#statisticNN").length) {

         if (sadkoScrollTop > ($("#statisticNN").offset().top - sadkoCheckPos)){
            $("#statisticNN .statistic-shadow").stop().animate({opacity: 0.75},400);
              $("#statisticNN .statistic-numbers").stop().animate({
                bottom: "116px",
                opacity: "1"
              }, 400, function(){
                $("#statisticNN .statistic-info").fadeIn(400);
              });
          }
      }
	});
});