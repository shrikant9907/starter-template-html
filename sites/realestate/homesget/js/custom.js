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
  
    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.filter-items'
    });
    $('.filters').on( 'click', 'button', function( event ) {
        var $target = $( event.currentTarget );
        $target.siblings().removeClass('is-checked');
        $target.toggleClass('is-checked');
        var isChecked = $target.hasClass('is-checked');
        var filter = $target.attr('data-filter');
        if (!isChecked)  {
        filter = '*';
        }
        $grid.isotope({ filter: filter });
    });
});