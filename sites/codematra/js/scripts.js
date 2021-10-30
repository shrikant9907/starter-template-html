jQuery(function($){
  // Hamburger 
	jQuery('.hamburger').on('click', function(e){
    // e.preventDefault(); 
    jQuery(this).toggleClass('active');
    jQuery('.sidebar').fadeToggle();   
    jQuery('.sidebar').toggleClass('active');   
    jQuery('body').toggleClass('noscroll');   
    jQuery('body').toggleClass('sidebaractive');   
    console.log('clicked');
  });

  // Active Sidebar
	jQuery('.navbar-collapse').on('click', function(e){
		e.preventDefault();	
		if (e.target !== this)
      return;
    console.log(e.target);
    jQuery('.hamburger').trigger('click');
  });

});

// Hide / Show Header for Scroll 
var lastScrollTop = 0;
if (jQuery(window).width() > 991) {
  jQuery( window ).scroll(function() {
    var currentScrollTop = jQuery(this).scrollTop();
    if(lastScrollTop < currentScrollTop) {
      $('.site-header').slideUp('fast');
    } else {
      $('.site-header').slideDown('fast');
    }
    lastScrollTop = currentScrollTop;
  });
}