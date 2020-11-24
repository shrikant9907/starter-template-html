 
jQuery(document).ready(function(){
    
    jQuery('.signup_btn_event').click(function(e){
        jQuery('#SignupModal').modal('toggle');  
    }); 

    jQuery('.login_btn_event').click(function(e){
        jQuery('#LoginModal').modal('toggle'); 
    });
    
    jQuery('.job_apply_btn').click(function(){
        
        var jthis = jQuery(this);
        var jobid = jthis.data('jobid');
        if(jobid!='') {
            jQuery.ajax({     
                type: 'POST',   
                url: LOCOBJ.ajax_url,     
                data: {     
                    "action": "apply_for_job", 'jobid' : jobid  
                }, 
                success: function(response){
                     jthis.text('Applied');  
                     jthis.addClass('applyed_btn'); 
                     jthis.removeClass('job_apply_btn');
                } 	  
            }); 
        }
        
    });
    
//    Image Picker
    ric_media_uploader(); 
    
    jQuery('.select_date').datepicker({ 
            dateFormat : 'dd MM yy',
            minDate: 0
    }); 
    
    jQuery(function () {
        jQuery('[data-toggle="tooltip"]').tooltip()
    });   
    
    jQuery(".alert-success, .alert-danger").fadeTo(5000, 1000).slideUp(500, function(){
        jQuery(".alert-success, .alert-danger").slideUp(1000);  
    });    
    
 
    jQuery(".slider1").slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
    });
    
    // slider2 jQuery start here
    jQuery('.latest_updates').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
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

});


// jQuery(window).bind('keydown', function(e) {
////  Disable Ctrl + U and S
//  if (e.ctrlKey && 
//        (e.keyCode === 67 || 
//         e.keyCode === 83 || 
//         e.keyCode === 86 || 
//         e.keyCode === 85 || 
//         e.keyCode === 117)) 
//    {
//        e.preventDefault();
//        return false;
//    } else {
//        return true;
//    }
// 
//}); 
// 
 
 
 //Media Uploader Code
function ric_media_uploader() {   

    // Image Media Uploader
    jQuery('#profile_pic_label').click(function(event) { 
        event.preventDefault();
         var mediaUploader; 
         var button_clicked = jQuery(this);
        
            // Reopen Media Uploader if already open
            if (mediaUploader) {
              mediaUploader.open();
              return;
            }
            // Extend the wp.media object
            mediaUploader = wp.media.frames.file_frame = wp.media({
              title: 'Profile Picture',
              button: { 
              text: 'Add Picture'
            }, multiple: false }); 

            // Add Return URL to Text Field
            mediaUploader.on('select', function() {
              var attachment = mediaUploader.state().get('selection').first().toJSON();
              var attachment_id = attachment.id;
              var attachment_url = attachment.url; 
 
              button_clicked.prev().attr('src', attachment_url);   
              jQuery('#profile_pic').val(attachment_url);      
              jQuery('#profile_pic_id').val(attachment_id);   
        
            });
            // Open the uploader dialog
            mediaUploader.open();

    });  

}


//jQuery(window).on('load',function(){
//    jQuery('#HomePageModal1').modal('show');
//}); 
   
jQuery(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 300) {
        $("body").addClass("scrolled");
    } else {
        $("body").removeClass("scrolled");
    }
}); 


 