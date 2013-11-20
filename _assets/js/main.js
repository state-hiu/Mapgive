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

  // Apply box-sizing: border-box in ie7. See http://goo.gl/fZ6HMK
  (function() {
    if( $('html').hasClass('no-boxsizing') ){
      $('.boxSized, .boxSized *').each(function(){
        var fullW = $(this).outerWidth(),
            actualW = $(this).width(),
            wDiff = fullW - actualW,
            newW = actualW - wDiff;
 
          $(this).css('width',newW);
      });
    }
  })();

  (function() {
    if ( $('html').hasClass('no-svg') ) {
      // Replace SVG with PNG of file with same name
      var $svgs = $("img[src$='.svgz']");
      $svgs.each(function(i) {
        var filename = $(this).attr('src').split('.')[0],
            src = filename + '.png';
        $(this).attr('src', src);
      });
    }
  })();

  $('.navbar').sticky();

})(jQuery, window, document);
