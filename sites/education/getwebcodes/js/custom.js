jQuery('document').ready(function(){

	jQuery('.hamburger').click(function(e){
        e.preventDefault(); 
        jQuery(this).toggleClass('active');
        jQuery('.sidebar').fadeToggle();   
        jQuery('.sidebar').toggleClass('active');   
		jQuery('body').toggleClass('noscroll');   
    });
	jQuery('.sidebar').on('click', function(event){
		if (this != event.target) {
			return false;
		} 
		jQuery('.hamburger').click();
	});

	jQuery('.testimonials_slick').slick();
	jQuery('.banner_slider_slick').slick();

	jQuery('.hamburger_sign').on('click',function(){
		jQuery('.hover_menus').toggle();
	});

	jQuery('.hover_menus').hover(function(){
		jQuery(this).show();
	}, function(){
		jQuery(this).hide();
	});  

	// Home Carousel
	jQuery('.home_carousel').slick({
	  centerMode: false,
	  centerPadding: '0',
	  slidesToShow: 1,
	  arrows: true,
	  responsive: [
	    {
	      breakpoint: 768, 
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '0',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '0',
	        slidesToShow: 1
	      }
	    }
	  ]
	}); 


	change_slide();
	jQuery(".home_carousel").on("afterChange", function (){
		change_slide();	
	});


	jQuery('.four_col_carosusel').slick({
		infinite: false,
		autoplay: true,
		autoSlide: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [ 
		{
		  breakpoint: 1024,
		  settings: {
		    slidesToShow: 4,
		    slidesToScroll: 4,
		    infinite: true,
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
		    slidesToShow: 2,
		    slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
		    slidesToShow: 1,
		    slidesToScroll: 1
		  }
		}
		]
	});



// Default selection
selected_stars();

// On hover
jQuery('.start_rating .far').hover(function(){
  
  jQuery(this).addClass('fas').prevAll().addClass('fas').removeClass('far');
  jQuery(this).nextAll().addClass('far').removeClass('fas');
  
  // Selected
   selected_stars();
  
});

// OnClick
jQuery('.start_rating .far').click(function(){
  jQuery(this).addClass('selected').prevAll().removeClass('selected');
  jQuery(this).addClass('selected').nextAll().removeClass('selected');
});



});


// Selected
function selected_stars() {
  jQuery('i.selected').addClass('fas').prevAll().addClass('fas').removeClass('far');
}

function change_slide() {
	var prev_src = jQuery('.home_carousel').find('.slick-current').prev().attr('data-src');
	var next_src = jQuery('.home_carousel').find('.slick-current').next().attr('data-src');
	jQuery('.home_carousel .slick-prev').html('<img src="'+prev_src+'" /> <span>Prev</span>');
	jQuery('.home_carousel .slick-next').html('<img src="'+next_src+'" /> <span>Next</span>'); 
}

   
jQuery(window).scroll(function() {    
    if ($(window).width() > 767) {
	   var scroll = $(window).scrollTop();
       if (scroll >= 400) {
	        $("body").addClass("scrolled");
	    } else {
	        $("body").removeClass("scrolled");
	    }
	}  
}); 