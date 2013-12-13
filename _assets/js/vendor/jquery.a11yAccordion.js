/*
 *  a11y Accordion - v.10
 *  An accessible jquery accordion plugin.
 *  
 *
 *  Made by Nathan Kleekamp
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "a11yAccordion",
        keys = {
            enter: 13,
            space: 32,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40
    };

    // The actual plugin constructor
    function Plugin ( element ) {
        this.element = element;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // These are all "dt" elements on the page in an accordion
            this.$allTitles = $(".js-accordion dt");

            // These are only the "dt" elements in the element
            this.$titles = $("dt", this.element);

            this.$panels = $("dd", this.element);

            this.bindUiActions();
            this.setDefaultAriaAttr();
        },

        bindUiActions: function() {
            this.click();
            this.keyDown();
            this.focus();
        },

        setDefaultAriaAttr: function() {
            // Sets all default Aria related attributes on $titles, $panels, and
            // all panel children

            var _this = this;

            _this.$titles.
                attr("aria-selected", "false").
                not(":first").
                attr("tabindex", "-1");

            // Hides and prevents tabbing through all DOM elements in a non-selected panel
            // Also sets aria-expanded="false" by default on $titles.
            _this.$panels.each(function() {
                _this.hide($(this));
            });
        },

        click: function() {
            var _this = this;

            _this.$titles.
                on("click", function() {
                    _this.toggle( $(this) );
            }).
                on("selectstart", function(e) {
                    e.preventDefault();
            });
        },

        keyDown: function() {
            var _this = this;

            _this.$titles.on("keydown", function(e) {
                switch(true) {
                    case(e.which === keys.enter):
                        _this.toggle( $(this) );
                        break;

                    case(e.which === keys.space):
                        _this.toggle( $(this) );
                        break;

                    case(e.which === keys.right):
                        _this.moveTo("next");
                        break;

                    case(e.which === keys.down):
                        _this.moveTo("next");
                        break;

                    case(e.which === keys.left):
                        _this.moveTo("previous");
                        break;

                    case(e.which === keys.up):
                        _this.moveTo("previous");
                        break;

                    case(e.which === keys.home):
                        _this.moveTo("first");
                        break;

                    case(e.which === keys.end):
                        _this.moveTo("last");
                        break;
                }
            });

            _this.$panels.on("keydown", function(e) {
                if (e.which === keys.up && e.ctrlKey) {
                    // $(this).prev() is the title
                    $(this).prev().focus();
                }
            });
        },

        focus: function() {
            var _this = this;

            _this.$titles.
                on("focus", function() {
                    var $self = $(this),
                        $otherTitles = _this.$titles.not($self),
                        $allOtherTitles = _this.$allTitles.not($self);

                    // Set appropriate attributes on selected title
                    $self.attr({
                        "aria-selected": "true",
                        "tabindex": "0"
                    });

                    // Disable tabing to other titles in the current accordion
                    $otherTitles.attr("tabindex", "-1");

                    // Set aria-selected="false" on all other accordion titles on the page
                    $allOtherTitles.attr("aria-selected", "false");
            });
        },

        // Removes "hide" class and sets appropriate aria/tabindex attr on title, panel,
        // and all panel children.
        show: function($panel) {
            var $title = $panel.prev();

            $panel.
                removeClass("hide").
                attr("aria-hidden", "false").
                find("*").each(function() {
                    $(this).attr("tabindex", "0");
            });

            $title.attr("aria-expanded", "true").prepend('<span class="js-control" aria-hidden="true">&ndash;</span>');

        },

        // Adds "hide" class and sets appropriate aria/tabindex attr on title, panel,
        // and all panel children.
        hide: function($panel) {
            var $title = $panel.prev();

            $panel.
                addClass("hide").
                attr("aria-hidden", "true").
                find("*").each(function() {
                    $(this).attr("tabindex", "-1");
            });

            // panel.prev() is the "title"
            $title.attr("aria-expanded", "false").prepend('<span class="js-control" aria-hidden="true">&#43;</span>');
        },

        toggle: function($title) {
            var $panel = $title.next();

            $title.children().remove('.js-control');

            if ( $panel.hasClass("hide") ) {
                this.show($panel);
            } else {
                this.hide($panel);
            }
        },

        moveTo: function(target) {
            // Simple switch statement facilitating focus movement 
            var _this = this,
                $focused = $(document.activeElement),

                // Grab the next "dt"
                $next = $focused.nextAll("dt").first(),

                // Grab the previous "dt"
                $previous = $focused.prevAll("dt").first();

            switch(true) {
                case(target === "first"):
                    _this.$titles.first().focus();
                    break;

                case(target === "last"):
                    _this.$titles.last().focus();
                    break;

                case(target === "next"):
                    $next.focus();
                    break;

                case(target === "previous"):
                    $previous.focus();
                    break;
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
