var utils = {
    initializeFlickityFadeGallery: function (gallery, nav) {
        var $gallery = $(gallery),
            $nav = $(nav),
            navItem = $nav.children(),
            wholeWidth = navItem.outerWidth() * navItem.length,
            visibleWidth = $nav.width(),
            difference = wholeWidth - visibleWidth,
            prevNext = false,
            galleryNav;

        new Flickity(gallery, {
            prevNextButtons: prevNext,
            pageDots: false,
            cellSelect: setEquipmentSliderClasses,
            draggable: false
        });

        if ($(nav).hasClass("doc-gallery-nav")){
            prevNext = true;
        } else {
            prevNext = false;
        }

        galleryNav = new Flickity(nav, {
            asNavFor: gallery,
            prevNextButtons: prevNext,
            contain: true,
            pageDots: false,
        });

        galleryNav.on('settle', setEquipmentSliderClasses);
        galleryNav.on('dragMove', setEquipmentSliderClasses);

        function setEquipmentSliderClasses () {
            var x = galleryNav.x + visibleWidth/2;

            $nav.removeClass('-left- -right-');
            if (x < -10) {
               $nav.addClass('-left-')
            }

            if (x > -(difference - 240)) {
                $nav.addClass('-right-')
            }
        }
    },

    hexToRgb: function (hex) {
        hex = hex.replace(/\s/gi,'');
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    qTipDefaults: {
        content: function () {
            return $(this).data('tip')
        },
        position: {
            my: 'top center',
            at: 'bottom center'
        },
        style: {
            tip: {
                height: 8,
                width: 20
            }
        }
    },
    numberFormat: function (number, separator) {
        var num = ('' + number).replace(/\s/gi, ''),
            _separator = (separator || ' '),
            nums = num.split(''),
            len = nums.length;


        return nums.reverse().map(function (digit, i) {
            var index = i + 1;

            if (index == len) {
                _separator = '';
            }

            return !(index % 3) ? _separator + digit : digit;
        }).reverse().join('');
    }

};
