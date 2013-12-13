;(function($, window, document, undefined) {
  var $html = $('html');
  var $panels = $('#accordion .panel-collapse');
  var $panelTitles = $('#accordion .panel-title');

  // Collapse accordions at page load and set appropriate default aria attributes
  // in case Javascript is turned off
  function initAccordion() {
    $panels.removeClass('in').addClass('collapse').attr('aria-hidden', 'true');
    $panelTitles.attr('aria-expanded', 'false');
  }

  // Set appropriate aria attributes on accordion when changed
  function setAriaAttr() {
    var $this = $(this);
    var $expanded = $this.attr('aria-expanded');
    var $target = $('#' + $this.attr('aria-controls'));

    if ($expanded == 'false') {
      $this.attr({
        'aria-expanded': 'true',
        'aria-selected': 'true'
      });
      $target.attr('aria-hidden', 'false');
    } else {
      $this.attr({
        'aria-expanded': 'false',
        'aria-selected': 'false'
      });
      $target.attr('aria-hidden', 'true');
    }
  }

  // Init the accordion
  initAccordion();

  $panelTitles.on('click', setAriaAttr);
  $panelTitles.on('keydown', function(e) {
    if (e.which == 13) {
      setAriaAttr();
    }
  });

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
  
  if (!($html.hasClass('lt-ie8'))) {
    $('.navbar').affix({
      offset: {
        top: $('#site-header').height()
      }
    });
  }

})(jQuery, window, document);
