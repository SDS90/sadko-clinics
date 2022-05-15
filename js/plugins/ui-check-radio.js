/**
 * jQuery plugin for replacing default browser from elems,
 * such as checkboxes, radio buttons to custom
 */
;(function (window, $, undefined) {

    var pluginName = 'uiCheckRadio',
        defaults = {
            // Classes to add to checkbox or radio
            classes: '',
            // Unite elems in button group or not
            // If true, original elems must follow by each other
            group: false,
            // Callback that will be initialized when original elem is changed
            // Receives cache {item} as an argument
            onChange: ''
        },
        idCounter = 1,
        valuePrefix = 'undefined',
        idPrefix,
        allTriggers = {};


    function Plugin( element, options ) {
        this.$el = $(element);
        this.el = element;

        this.opts = $.extend({}, defaults, options, this.$el.data()) ;

        this.type = idPrefix = this.$el.attr('type');
        this.id = this.$el.attr('id');
        this.name = this.$el.attr('name');
        this.value = this.$el.attr('value');
        this.checked = this.$el.prop('checked');
        this.isAllTrigger = this.$el.data('checkAll');
        this._indeterminate = this.$el.prop('indeterminate');
        this.allChecked = false;

        this._defaults = defaults;
        this.firstTime = true;

        this.$el.addClass('check-radio');

        // Set custom id if attribute has not been found
        if (!this.id) {
            this.id = idPrefix + idCounter++;
            this.$el.attr('id', this.id);
        }

        // Set custom name attribute (equals to id)
        if (!this.name) {
            this.name = this.id;
            this.$el.attr('name', this.name);
        }

        if (!this.value) {
            this.value = valuePrefix;
        }

        if (this.isAllTrigger) {
            allTriggers[this.name] = this;
        }

        if (this.$el.closest('.btn-group').length) {
            this.opts.group = true;
        }

        this.init();
    }

    Plugin.prototype = {
        cache: {},
        init: function () {
            this.setLabel();
            this.buildHtml();
            this.hideOriginals();
            this.bindEvents();

            if (this._indeterminate) {
                this.indeterminate();
            } else {
                $.proxy(this.events.change, this)();
            }


            this.firstTime = false;

            this.$customized.addClass('-ready-');
        },
        bindEvents: function () {
            this.$el.on('focus', $.proxy(this.events.focus, this));
            this.$el.on('blur', $.proxy(this.events.blur, this));
            this.$el.on('change', $.proxy(this.events.change, this));

            if (this.$label) {
                this.$label.on('mouseover', $.proxy(this.events.mouseover, this));
                this.$label.on('mouseout', $.proxy(this.events.mouseout, this));
                this.$label.on('mousedown', $.proxy(this.events.mousedown, this));
                this.$label.on('mouseup', $.proxy(this.events.mouseup, this));
            }
        },
        setLabel: function () {
            var $label = $('label[for="' + this.id + '"]'),
                $parent;

            if (!$label.length) {
                $parent = this.$el.parent();

                if ($parent[0].tagName.toLowerCase() === 'label') {
                    $label = $parent;
                } else {
                    $label = '';
                }
            }

            this.$label = $label || '';
        },
        /**
         * Creates html markup of custom ui element,
         * depends on it's type and inserts it after original element
         */
        buildHtml: function () {
            var wrapper,
                $label = this.$label;

            if (!this.opts.group) {
                wrapper = $(this.types(this.type));
                this.$el.wrap(wrapper);

                // Save custom element wrapper
                this.$customized = this.$el.parent();
            } else {
                $label
                    .addClass('btn label-btn');

                if (this.opts.classes) {
                    $label
                        .addClass(this.opts.classes);
                }

                this.$customized = $label;
            }
        },
        /**
         * Hides original ui elements
         */
        hideOriginals: function () {
            this.$el
                .addClass('-invisible-');
        },
        /**
         * Contains main templates of form ui elems
         * @param {String} type Template type
         * @return {String} Template HTML
         */
        types: function (type) {
            var _this = this,
                templates = {
                    checkbox: "<span class='checkbox " + ' ' + _this.opts.classes + "'></span>",
                    radio: "<span class='radio" + ' ' + _this.opts.classes + "'></span>",
                    group: "<label class='btn label-btn'></label>"
                };

            return templates[type];
        },
        /**
         * Activates elems depends on its type
         */
        check:  function () {
            // If radio, remove checked status from active
            if (this.type == 'radio') {
                var $siblings = $('.check-radio[name="' + this.name + '"]'),
                    plugin;

                $siblings.each(function (i, el) {
                    plugin = $(el).data('uiCheckRadio');
                    if (plugin && plugin.checked) {
                        plugin.unCheck();
                    }
                })
            }

            if (this.isAllTrigger && !this.allChecked) {
                this.checkAll(this.name);
            }

            this.checked = true;
            this._indeterminate = false;

            this.$el.prop({
                checked: true,
                indeterminate: false
            });

            this.$customized
                .removeClass('-indeterminate-')
                .addClass('-checked-');
        },

        indeterminate: function () {
            if (this.type == 'radio') {
                console.warn('Indeterminate state can only be set to checkbox');
                return;
            }

            this.$customized
                .addClass('-indeterminate-')
                .removeClass('-checked-');

            this._indeterminate = true;
            this.checked = false;

            this.$el.prop({
                checked: false,
                indeterminate: true
            });
        },
        /**
         * Un check current input, remove -checked- html class, sets 'checked' attributes to false
         */
        unCheck: function () {
            if (this.isAllTrigger && this.allChecked) {
                this.unCheckAll(this.name);
            }

            if (!this.isAllTrigger && allTriggers[this.name]) {
                if (allTriggers[this.name].checked) {
                    allTriggers[this.name].allChecked = false;
                    allTriggers[this.name].unCheck();
                }
            }

            this.checked = false;
            this._indeterminate = false;
            this.$el.prop({
                checked: false,
                indeterminate: false
            });

            this.$customized.removeClass('-checked- -indeterminate-');
        },
        /**
         * Sets 'checked' attribute to true on all checkboxes with received 'name' argument
         * @param {String} name - Checkbox 'name' attribute
         */
        checkAll: function (name) {
            this.allChecked = true;

            var $items = $('input[type="checkbox"][name="' + name + '"]'),
                data;

            $items.each(function (i, item) {
               data = $(item).data('uiCheckRadio');

                if (data && !data.isAllTrigger) {
                    data.check();
                }
            })
        },
        /**
         * Un checks all input[type='checkbox'] with the same name attribute
         * @param {String} name - Checkbox 'name' attribute
         */
        unCheckAll: function (name) {
            this.allChecked = false;

            var $items = $('input[type="checkbox"][name="' + name + '"]'),
                data;

            $items.each(function (i, item) {
                data = $(item).data('uiCheckRadio');

                if (data && !data.isAllTrigger) {
                    data.unCheck();
                }
            })
        },

        getOnChangeValues: function () {
            return {
                checked: this.checked,
                indeterminate: this._indeterminate,
                value: this.value,
                name: this.name,
                $el: this.$el,
                $customized: this.$customized,
                $label: this.$label
            }
        },
        /**
         * Base events
         */
        events: {
            mouseover: function () {
                this.$customized
                    .addClass('-hover-');
            },
            mouseout: function () {
                this.$customized
                    .removeClass('-hover- -active-');
            },
            mousedown: function () {
                this.$customized
                    .addClass('-active-');
            },
            mouseup: function () {
                this.$customized
                    .removeClass('-active-');
            },
            focus: function () {
                this.$customized
                    .addClass('-hover-')
            },
            blur: function () {
                this.$customized
                    .removeClass('-hover-');
            },
            change: function () {
                var checked = this.$el.prop('checked');

                if (checked) {
                    $.proxy(this.check, this)();
                } else {
                    $.proxy(this.unCheck, this)();
                }

                if (this.opts.onChange && !this.firstTime) {
                    this.opts.onChange(this.getOnChangeValues());
                }
            }
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
                        oldOpts = _this.opts;

                    _this.opts = $.extend({}, oldOpts, options);
                }
            });
        }
    };

    $(function() {
       $('.check-radio').uiCheckRadio();
    });
})(window, jQuery);
