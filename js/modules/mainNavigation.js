var mainNavigation;

(function () {
    var $el = $('.nav-main'),
        $innerTimes = $('.nav-main--inner', $el);

    function init () {
        setInnerMenuHeight();
        applyScroll();
    }

    function setInnerMenuHeight () {
        var $item,
            h;

        $innerTimes.each(function (i, item) {
            $item = $(item);
            h = $('.nav-main--inner--content', $item).height() + 5; // 5 is for custom scroll IE fix

            $item.height(h);
        })
    }

    function applyScroll () {
        $('.custom-scroll-wrap', $innerTimes).scrollbar()
    }

    mainNavigation = {
        init: init
    }

})();
