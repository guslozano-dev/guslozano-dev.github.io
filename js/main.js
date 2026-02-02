(function ($)
  { "use strict"

    /* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(1000).fadeOut('slow');
      $('body').delay(1500).css({
        'overflow': 'visible'
      });
    });
 })(jQuery);