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

  // Element Animations - Detect if in viewport
  (function($, win) {
    $.fn.inViewport = function(cb) {
       return this.each(function(i,el){
         function visPx(){
           var H = $(this).height()-50,
               r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
           return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));
         } visPx();
         $(win).on("resize scroll", visPx);
       });
    };
  }(jQuery, window));

  // Play Animation when in view
  $(".pop-in").inViewport(function(px){
      if(px) $(this).addClass("animation-pop-in");
  });
  $(".slide-in").inViewport(function(px){
      if(px) $(this).addClass("animation-slide-in");
  });

});
