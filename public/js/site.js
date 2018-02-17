$( document ).ready(function() {

  // Define HTML elements to load content into
  var mobileNavBar = $('.m-nav-container');
  var desktopNavbar = $('.navbar');
  // Detect if mobile
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // Hide Desktop Nav
    desktopNavbar.hide();
    mobileNavBar.show();
  } else {
    // Hide Mobile Nav
    mobileNavBar.hide();
  }

  // Element Animations
  (function($, win) {
    $.fn.inViewport = function(cb) {
       return this.each(function(i,el){
         function visPx(){
           var H = $(this).height()-250,
               r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
           return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
         } visPx();
         $(win).on("resize scroll", visPx);
       });
    };
  }(jQuery, window));

  $(".pop-in").inViewport(function(px){
      if(px) $(this).addClass("animation-pop-in");
  });
  $(".slide-in").inViewport(function(px){
      if(px) $(this).addClass("animation-slide-in");
  });

  // Current BTC/USD Price
  function setBtcRate(){
    $.get( "https://api.cryptonator.com/api/ticker/btc-usd", function( data ) {
      if (data.success) {
        $('.result').html('$ ' + parseFloat(data.ticker.price).toFixed(2));
      }
    });
  }

  setInterval(function(){
    setBtcRate()
  }, 60000)
  setBtcRate()

});
