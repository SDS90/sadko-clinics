;(function (window, $, undefined) {
    var pluginName = 'spoiler',
        defaults = {
            speed: 200,
            target: 'next',
            semiSpoiler: false,
            defaultHeight: '', // If semiSpoiler is true, when this value will be set to spoiler container
            activeText: '',
            ajaxMethod: 'POST',
            ajaxUrl: '',
            ajaxParams: '',
            ajaxSuccessField: '',
            ajaxTarget: '',
            ajaxDataType: 'text',
            onShow: '',
            onHide: ''
        };

    function Plugin( element, options ) {
        this.el = element;
        this.$el = $(element);
        this.visible = false;
        this.ajaxLoaded = false;

        this.opts = $.extend({}, defaults, options, this.$el.data());

        this.$accordionParent = this.$el.closest('.accordion');

        this.isAccordion = this.$accordionParent.length;

        if (this.opts.activeText) {
            this.defaultText = this.$el.text();
        }

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            if (this.opts.semiSpoiler && this.opts.defaultHeight) {
                $(this.opts.target).css('maxHeight', this.opts.defaultHeight)
            }

            this.$el.on('click', $.proxy(this.onClick, this));
        },

        getContent: function () {
            var _this = this;

            return this.xhr = $.ajax({
                url: this.opts.ajaxUrl,
                dataType: this.opts.ajaxDataType,
                beforeSend: function () {
                    _this.$el
                        .addClass('-loading-')
                        .data('xhr', _this.xhr);

                    if (_this.isAccordion) {
                        _this.$accordionParent.data('loading', _this)
                    }

                },
                success: function (data) {
                    _this.$el
                        .removeClass('-loading-')
                        .addClass('-loaded-')
                        .data('xhr', '');

                    _this.xhr = '';

                    _this.$accordionParent.data('loading', '')
                },
                data: this.opts.ajaxParams,
                method: this.opts.ajaxMethod,
                error: function (xhr, textStatus) {

                    _this.xhr = '';

                    _this.removeLoadingStatus();
               }
            })
        },

        removeLoadingStatus: function () {
            this.$el
                .removeClass('-loading-')
                .data('xhr', '');

            if (this.xhr) {
                this.xhr.abort();
            }

            this.xhr = '';

            this.$accordionParent.data('loading', '')
        },

        /**
         * Checks if there is an ajaxUrl param, if so, sends ajax request, and after that
         * replaces html in spoiler container and shows spoiler.
         * If there is no ajaxUrl param, just shows spoiler
         */
        show: function () {
            var _this = this,
                selector = this.opts.target,
                $container = _this._getElement(selector),
                $accordionCurrent;

            if (this.isAccordion) {
                if (_this.$accordionParent.data('loading')) {
                    _this.$accordionParent.data('loading').removeLoadingStatus();
                }
            }

            if (this.opts.ajaxUrl && !this.ajaxLoaded) {
                $.when(this.getContent()).then(function (data) {
                    if (_this.opts.ajaxTarget) {
                        $container = $(_this.opts.ajaxTarget, _this._getElement(selector));
                    }

                    var html = data;

                    if (_this.opts.ajaxSuccessField) {
                        html = data[_this.opts.ajaxSuccessField];
                    }

                    if (html) {
                        $container.html(html);
                        _this.showSpoiler(selector);
                        _this.ajaxLoaded = true;
                    }

                })
            } else {
                this.showSpoiler(selector);
            }
        },

        /**
         * Shows spoiler, adds active class to toggle, turns this.visible to true
         */
        showSpoiler: function () {
            var selector = this.opts.target,
                $spoiler = this._getElement(selector),
                $accordionCurrent = '',
                _this = this;

            if (this.isAccordion) {
                $accordionCurrent = $('.spoiler-toggle.active', this.$accordionParent);

                if ($accordionCurrent.length) {
                    $accordionCurrent.data(pluginName).hide();
                }
            }


            this.visible = true;

            $spoiler.addClass('active');
            this.$el.addClass('active');

            if (this.opts.activeText) {
                this.$el.text(this.opts.activeText)
            }


            if (this.opts.semiSpoiler) {
                var height = this._getActualHeight($spoiler);

                $spoiler.css('maxHeight', height);

            } else {
                $spoiler.slideDown(this.opts.speed, function () {
                    if (_this.opts.onShow) {
                        _this.opts.onShow(_this.$el, $spoiler);
                    }
                });
            }
        },

        /**
         * Hides spoiler. Removes active classes
         */
        hide: function () {
            var $spoiler = this._getElement(this.opts.target),
                _this = this;

            this.visible = false;

            $spoiler.removeClass('active');

            this.$el
                .removeClass('active  -loading-');

            if (this.xhr) this.xhr.abort();


            if (this.opts.activeText) {
                this.$el.text(this.defaultText)
            }

            if (this.opts.semiSpoiler) {
                $spoiler.css('maxHeight', this.opts.defaultHeight);

            }else {
                $spoiler.slideUp(this.opts.speed, function () {
                    if (_this.opts.onHide) {
                        _this.opts.onHide();
                    }
                })

            }

        },

        /**
         * Takes selector as a parameter, and returns element depends on it. If
         * selector equals to 'next', then returns next DOM element towards this.$el
         * @param {String} selector - Selector
         * @returns {*|HTMLElement} - Spoiler DOM element
         * @private
         */
        _getElement: function (selector) {
            var $el = $(selector);

            if (selector === 'next') {
                $el = this.$el.next('.spoiler');
            }

            return $el;
        },

        _getActualHeight: function (elem) {
            return  elem[0].scrollHeight;
        },

        onClick: function (e) {
            if (!this.visible) {
                this.show()
            } else {
                this.hide()
            }
            e.preventDefault();
        }
    };

    $.fn[pluginName] = function ( options ) {
        if (Plugin.prototype[options]) {
            Plugin.prototype[options].apply(this.data(pluginName), Array.prototype.slice.call(arguments, 1));
        } else {
            return this.each(function () {
                if (!$.data(this, pluginName)) {
                    $.data(this, pluginName,
                        new Plugin( this, options ));
                } else {
                    var _this = $.data(this, pluginName),
                        oldOpts = _this.options;

                    _this.options = $.extend({}, oldOpts, options);
                }
            });
        }
    };

    $(function () {
        $('.spoiler-toggle').spoiler();
    })

})(window, jQuery);
