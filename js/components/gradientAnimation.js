var GradientAnimation;

(function () {
    var defaults = {
        colors: ['#8ecdf6', '#e296bf', '#8582bc', '#edc158', '#d44f68', '#546e7a'],
        colorIndices: [0, 1, 2, 3],
        gradientSpeed: 0.005
    };

    GradientAnimation = function (el, opts) {
        this.$el = typeof el == 'string' ? $(el) : el;
        this.rgb = [];

        this.step = 0;
        this.animation = '';

        this.opts = $.extend(true, {}, defaults, opts);
        this.init();
    };

    GradientAnimation.prototype = {
        init: function () {
            this.createRGBColorsArray();
            this.update();
        },

        createRGBColorsArray: function () {
            var _this = this,
                rgb;

            this.opts.colors.forEach(function (color) {
                rgb = utils.hexToRgb(color);
                _this.rgb.push([rgb.r, rgb.g, rgb.b])
            })
        },

        update: function () {
            var _this = this,
                colorIndices = this.opts.colorIndices,
                colors = this.rgb;

            requestAnimationFrame(function () {
                _this.update();
            });

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - this.step;
            var r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";

            var r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";

            $(this.$el).css(
                {
                    background: "linear-gradient(to right, "+color1+" 0%, "+color2+" 100%)"
                }
            );

            this.step += this.opts.gradientSpeed;

            if ( this.step >= 1 ) {
                this.step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
            }
        }
    }

})();
