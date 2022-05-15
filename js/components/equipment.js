//Оборудование

;(function (window, $, Flickity, utils) {

    function init () {
        initializeEquipmentGallery();
    }

    function initializeEquipmentGallery () {
        utils.initializeFlickityFadeGallery('#equipment-gallery','#equipment-gallery-nav')
    }

    init();


})(window, jQuery, Flickity, utils);