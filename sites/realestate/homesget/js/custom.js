jQuery(document).ready(function(e){    
     // Home Slick Slider
     jQuery('.home-slider').slick({
        centerMode: false, 
        centerPadding: '0',
        slidesToShow: 1,
        responsive: [
            {
            breakpoint: 768, 
            settings: {
                centerMode: true,
                centerPadding: '0',
                slidesToShow: 1
            }
            },
            {
            breakpoint: 480,
            settings: {
                centerMode: true,
                centerPadding: '0',
                slidesToShow: 1
            }
            }
        ]
    }); 
  
   
});