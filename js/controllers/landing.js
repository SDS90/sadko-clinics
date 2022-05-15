
$(function(){

    if ($("#equipment-gallery").length){
        utils.initializeFlickityFadeGallery('#equipment-gallery','#equipment-gallery-nav');
    }

    //Смена цены
    $(".landing-doctor-parameters a").click(function(){

        var price = parseInt($("#price").text().replace(' ',''));

        if ($(this).hasClass("active")){
            $(this).removeClass("active");
            $("#price").text(String(price - $(this).data("price")).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        } else {
            $(this).addClass("active");
            $("#price").text(String(price + $(this).data("price")).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        }
        return false;
    });

});

$(window).load(function(){
    var minHeight = 0;
    $(".home-doctor-about .textblock").each(function(){
        if ($(this).outerHeight() > minHeight){
            minHeight = $(this).outerHeight();
        }
    });
    $(".home-doctor-about .textblock").css("height", minHeight);
});