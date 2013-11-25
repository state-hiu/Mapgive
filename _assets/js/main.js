;(function($, window, document, undefined) {
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

  // Activate OSM tabs on Instructions page
  $('#osmTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // Activate HOT tabs on Instructions page
  $('#hotTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // Init the accordion
  initAccordion();

  $panelTitles.on('click', setAriaAttr);
  $panelTitles.on('keydown', function(e) {
    if (e.which == 13) {
      setAriaAttr();
    }
  });

  // @todo: look for a better way to do this than looping through $thumbs twice
  // Also, it doesn't automatically resize when window size changes, and it should
  (function(){
    var $thumbs = $('.thumbnail'),
        padding = 15,
        tallest = 0,
        _this;

    $thumbs.each(function() {
      _this = $(this);
      tallest = (tallest < _this.outerHeight()) ? (_this.outerHeight() + padding) : (tallest);
    });

    $thumbs.each(function() {
      $(this).height(tallest);
    });

  })();

  if (!($('html').hasClass('lt-ie8'))) {
    $('.navbar').affix({
      offset: {
        top: $('#site-header').height()
      }
    });
  }

})(jQuery, window, document);
