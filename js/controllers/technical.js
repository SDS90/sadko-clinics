
//Техника и оборудование

$(function(){

    if ($(".technical-bottom-page #clinic-tiles").length){
        new Masonry('.technical-bottom-page #clinic-tiles', {
            itemSelector: '.clinic-tile',
            columnWidth: '.clinic-tile'
        });
    }

    $(".countries-gallery--img").css("left", ($('#countries-gallery').width() - parseInt($(".countries-gallery--img").attr("width")))/2);

    //Просмотр участников
	$(".country-info .more-info").click(function(){
		$(this).next().show();
		return false;
	});

	$(".full-list-wrapper .closed").click(function(){
		$(this).closest(".full-list-wrapper").hide();
		return false;
	});

	$(".country-info .full-list").scrollbar();

});

function initializeGalleries () {
    utils.initializeFlickityFadeGallery('#equipment-gallery','#equipment-gallery-nav');

    var $nav = $('#countries-gallery-nav');
    var navItem = $nav.children(),
	    wholeWidth = navItem.outerWidth() * navItem.length,
	    visibleWidth = $nav.width(),
	    difference = wholeWidth - visibleWidth;

    new Flickity('#countries-gallery', {
        pageDots: false
    });

    var galleryNav = new Flickity('#countries-gallery-nav', {
        asNavFor: '#countries-gallery',
        contain: true,
        prevNextButtons: false,
        pageDots: false
    });    

    galleryNav.on('settle', setEquipmentSliderClasses);
    galleryNav.on('dragMove', setEquipmentSliderClasses);

    function setEquipmentSliderClasses () {
            var x = galleryNav.x + visibleWidth/2;

            $nav.removeClass('-left- -right-');
            if (x < -10) {
               $nav.addClass('-left-')
            }

            if (x > -(difference - 100)) {
                $nav.addClass('-right-')
            }
        }
}

$(window).load(function(){

	//Галереи
    if ($(".technical-page").length || $(".technical-bottom-page").length){
	   initializeGalleries();
    }
});