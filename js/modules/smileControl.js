var smileControl;

(function () {
    var $smiles = $('.smile-svg');

    function autoInit () {
        $smiles.each(function () {
            new Smile($(this).find('path'))
        })
    }

    function Smile (el) {
        this.$smile = typeof el == 'string' ? (el) : el;

        this.curValue = 10;
        this.progressValue = 10;

        this.animation = '';

        this.init();
    }

    Smile.prototype = {
        init: function () {
            this.defineTriggers();

            this.$triggers.on('mouseenter', $.proxy(this.onMouseEnter, this));
            this.$triggers.on('mouseleave', $.proxy(this.onMouseLeave, this));
        },

        defineTriggers: function () {
            this.$triggers = $('[data-smile=#' + this.$smile.attr('id') + ']')
        },

        animate: function (val,width) {

            var start = new Date,
                difference = val - this.curValue,
                _this = this,
                dur = 250;

            function render (val) {
                _this.animation = requestAnimationFrame(render);


                var progress = (new Date - start) / dur;

                if (progress >= 1) {
                    progress = 1
                }

                var newValue = _this.progressValue = _this.curValue + difference * progress;

                _this.$smile.attr('d', 'M0 10 Q ' + width/2 + ' ' + newValue + ' ' + width + ' 10');

                if (progress == 1) {
                    cancelAnimationFrame(_this.animation);
                    _this.curValue = newValue;
                }
            }

            this.animation = requestAnimationFrame(render)
        },

        onMouseEnter: function () {
            var val = 35, width = 86;
            if (((this.$smile.attr('id')) == "smile")){
                val = 35;
                width = 86;
            }

            if ( ((this.$smile.attr('id')) == "doctors-smile") || (this.$smile.closest(".smile-toggle").hasClass("doctors-rating")) || (this.$smile.closest(".smile-toggle").hasClass("banner-action")) || (this.$smile.closest(".smile-toggle").hasClass("banner-inner")) ){
                val = 25;
                width = 42;
            }

            this.stop();
            this.animate(val,width);
        },

        onMouseLeave: function () {
            var val = 10, width = 86;
            if ((this.$smile.attr('id')) == "smile"){
                width = 86;
            }

            if ( ((this.$smile.attr('id')) == "doctors-smile") || (this.$smile.closest(".smile-toggle").hasClass("doctors-rating")) || (this.$smile.closest(".smile-toggle").hasClass("banner-action")) || (this.$smile.closest(".smile-toggle").hasClass("banner-inner")) ){
                width = 42;
            }
            this.stop();
            this.animate(val,width);
        },

        stop: function () {
            cancelAnimationFrame(this.animation);
            this.curValue = this.progressValue;
        }
    };

    smileControl = {
        init: autoInit
    }

})();

