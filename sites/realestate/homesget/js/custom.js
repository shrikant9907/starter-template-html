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
  
    jQuery('.slickFiveItems').slick({
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1366,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          }
        },
         {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
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