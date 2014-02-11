;(function ($, window, document, undefined) {
  var $html = $('html');

  $html.removeClass('no-js');
 
  // Resizes the divs on the stories aggregation page if they exceed the min-width.
  // Couldn't get this to work reliablly in IE8 so bypassing for now...
  (function () {
    if (!($html.hasClass('lt-ie9'))) {
    
      var $thumbs = $('.thumbnail'),
      padding = 15;
    
      function getTallest($ele) {
        var tallest = 0;

        $ele.each(function() {
          var _this = $(this);

          tallest = (tallest < $(this).outerHeight()) ? ($(this).outerHeight() + padding) : (tallest);
        });

        return tallest;
      }

      function resizeIt($ele) {
        var tallest = getTallest($ele);

        $ele.each(function() {
          $(this).css("height", tallest);
        });
      }

      resizeIt($thumbs);
    }
  })();
  
  // Activate fixed menu on all browsers less than IE8
  (function () {
    if (!($html.hasClass('lt-ie8'))) {
      $('.navbar').affix({
        offset: {
          top: $('#site-header').height()
        }
      });
    }
  })();

  (function () {
    if ( $html.hasClass('lt-ie8') ) {
      var $quote = $(".quote blockquote");
      $quote.prepend("&ldquo;");
    }
  })();

  
  // Safely remove focus ring on accordion titles when clicked but keep for keyboard navigation
  (function () {
    var styleTag = '<style id="outline-none">dt:focus{outline:none}</style>';

    $("body").on("mousedown", function() {
      var $outlineNone = $("#outline-none");

      if ( $outlineNone.length === 0) {
        $("head").append(styleTag);
      }
    });

    $("body").on("keydown", function() {
      $("#outline-none").remove();
    });
  })();

  // Switch out YouTube videos when clicked
  (function () {
    var videos = $('.video-player-container'),
        keys = {
          space: 32,
          enter: 13
        };

    function loadVideo (i) {
      var _this = i,
          params = {
            rel: 0,
            autoplay: 1,
            showinfo: 0,
            modestbranding: 1,
            html5: 1
          },
          baseurl = 'http://www.youtube.com/embed/',
          videoId = _this.attr('data'),
          param = $.param(params),
          url = baseurl + videoId + '?' + param,
          code = $('<iframe />', {
            frameborder: '0',
            allowfullscreen: 'true',
            src: url
          });

      _this.children().remove()
      _this.append(code);
      _this.css('padding-bottom', '56.25%');
    }

    videos.on('click', function() {
      var _this = $(this);
      loadVideo(_this);
    });

    videos.on('keydown', function(e) {
      var _this = $(this);
      switch(true) {
        case(e.which === keys.space):
          e.preventDefault();
          loadVideo(_this);
          _this.children('iframe').attr('tabindex', '0');
          break;
        case(e.which === keys.enter):
          loadVideo(_this);
          _this.children('iframe').attr('tabindex', '0');
          break;
      }
    });
  })();

  // Init accordions
  $(".js-accordion").a11yAccordion();

})(jQuery, window, document);
