;(function($, window, document, undefined) {
  var $html = $('html');

  $html.removeClass('no-js');
 
  // Resizes the divs on the stories aggregation page if they exceed the min-width.
  // Couldn't get this to work reliablly in IE8 so bypassing for now...
  (function() {
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
  
  (function() {
    if (!($html.hasClass('lt-ie8'))) {
      $('.navbar').affix({
        offset: {
          top: $('#site-header').height()
        }
      });
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

  // Init accordions
  $(".js-accordion").a11yAccordion();

})(jQuery, window, document);
