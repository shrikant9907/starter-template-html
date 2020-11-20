// Script for multi step form start
var form = jQuery("#multistep-form");
// disbale finish button 
jQuery(".actions ul li:eq(2) a").addClass("disabled");

// Navivation in form
var searchParams = new URLSearchParams(window.location.search);
if (searchParams.get('rstep')) {
  msfStartIndex = (searchParams.get('rstep') - 1);
}  else {
  msfStartIndex = 0;
}

var LocationURi = window.location.href;

jQuery("#multistep-form").validate({
    errorPlacement: function errorPlacement(error, element) { 
      if ((element.attr('id') == 'userEmail') || (element.attr('id') == 'userEmailVerified')) {
        element.closest('.input-group').before(error); 
      } else {
        element.before(error);
      }
    },
    rules: {
        user_email: {
          required: true,
          email: true,
        },
        user_password: {
          minlength: 5,
        },
        user_cpassword: {
            minlength: 5,
            equalTo: "#userPassword"
        },
    },
    messages: { 
        user_name: {
            required: "Name is a required field.",
        },
        user_email: {
            required: "Email is a required field.",
        },
        user_everified: {
          required: "Email verification is required.",
        },
        user_password: {
            required: "Password is a required field.",
            minlength: "Your password must be atleast 5 characters long."
        },
        user_cpassword: {
            required: "Confirm Password is a required field.",
            minlength: "Your password must be atleast 5 characters long.",
            equalTo: "Please add same password as above."
        },
    }
});

jQuery("#multistep-form").children("div").steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slideLeft",
    labels: {
      finish: "Visit Site",
    },
    startIndex: msfStartIndex,
    saveState: true,
    autoFocus: true,
    onStepChanging: function (event, currentIndex, newIndex) {
        step_form_submit('next');
        if (newIndex == 1) {
          jQuery('#login-status').removeClass('hide');
        } 
        jQuery("#multistep-form").validate().settings.ignore = ":disabled";
        return jQuery("#multistep-form").valid();
    },
    onStepChanged: function (event, currentIndex, newIndex) {
        if (currentIndex == 1) {
          jQuery('#login-status').removeClass('hide');
          step_form_submit('register');
        } else {
          step_form_submit('next');
        }
        var newUri = updateQueryStringParameter(LocationURi, 'rstep', currentIndex + 1);
        window.history.pushState({path:newUri},'',newUri);
    },
    onFinishing: function (event, currentIndex) {
      jQuery("#multistep-form").validate().settings.ignore = ":disabled";
      return jQuery("#multistep-form").valid();
    },
    onFinished: function (event, currentIndex) { 
        // step_form_submit('finish');
        var hrefSiteCreate = jQuery('.create-site-alert a').attr('href');
        // sitePath
        var sitePath = jQuery('#sitePath').val();
        var payment_status = jQuery('#payment_status').val();

        if (hrefSiteCreate && sitePath && payment_status) {
          window.location.href = hrefSiteCreate;
        }else {
          document.body.scrollTop = 350;
          document.documentElement.scrollTop = 350;
          jQuery('.subscription_process .mb_0 #sub-error').removeClass('hide').html('<div class="alert alert-danger" role="alert">Please subscribe a plan.</div>');
          jQuery('.create-subsite #site-error').removeClass('hide').html('<div class="alert alert-danger" role="alert">Please create your landing page.</div>');
          setTimeout(function(){ 
            jQuery('.subscription_process .mb_0 #sub-error').addClass('hide');
            jQuery('.create-subsite #site-error').addClass('hide');
          }, 3000);
        }


    }
});
// Script for multi step form end


jQuery('document').ready(function() {

    // Remove disable class if email already filled
    if(jQuery('#userEmail').val() != '') {
      jQuery('#verify_email').removeClass('disabled');
    }

    jQuery('.emptythisfield').on('click focus', function(){
      jQuery(this).removeAttr('readonly');
    });

    // Five Item Slider
    jQuery('.slickFourItems').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1366,
          settings: {
            slidesToShow: 4,
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

    // Three Item Slider
    jQuery('.slickThreeItems').slick({
        dots:true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });

    // Make repeater field 
    if(jQuery('.repeater').length) {
      var  reportRepeater = jQuery('.repeater').repeater({
          defaultValues: {
              'textarea-input': 'foo',
              'text-input': 'bar',
          },
          show: function () {
            jQuery(this).slideDown();
            jQuery('.selectpicker').selectpicker();
            jQuery('.select2-container').remove();
            jQuery('select').select2({
              width: '80%',
                placeholder: "Placeholder text",
                allowClear: false
            });
          },
          hide: function (deleteElement) {
              if(confirm('Are you sure you want to delete this?')) {
                  jQuery(this).slideUp(deleteElement);
              }
          }

      });
    }

    jQuery('body').on('change', '.ajaxFileUpload', function() {
      $this = jQuery(this);
      var fileExtension = ['jpeg', 'jpg', 'png', 'svg'];
      if (jQuery.inArray( $this.val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        jQuery('#alert-modal-title').html('Incorrect image file');
        jQuery('#alert-modal-body').html('Allowed Types: jpeg, jpg, png, svg');
        jQuery('#alert-modal').modal('show');
        // reset empty value
         $this.val('');
      }else{
        file_data = jQuery(this).prop('files')[0];
        form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('action', 'file_upload');
        jQuery.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            contentType: false,
            processData: false,
            dataType: "json",
            data: form_data,
            success: function (response) {
              $this.prev().val(response.url);
              console.log('file uploaded.');
            }
        });
      }
  });  

});

// Save changes on button Click
jQuery("#multistep-form .save-changes-btn").on( 'click', function(){
  jQuery(this).text('Saving...');
  jQuery('.save-changes-btn').prev().removeClass('hide');
  jQuery('.save-changes-input').val('saved');
  step_form_submit('next');
});

function step_form_submit(steps_status){
  var stepForm = jQuery("#multistep-form");
  var disabled = stepForm.find(':input:disabled').removeAttr('disabled');
  var data = {
      'action': 'step_form',
      'form_data': stepForm.serialize(),
      'steps_status': steps_status 
  }
  disabled.attr('disabled','disabled');
  jQuery.post(ajax_object.ajax_url, data, function(response) {
      jQuery('#multistep-form .save-changes-btn').addClass('hide').text('Save Changes');
      jQuery('#preview-button').removeClass('hide').addClass('show');
      if ((steps_status == 'register') && (response.code == 0)) {
        window.location.href = window.location.href + "?rstep=1&auth-error=true";
      }
      
      if ((steps_status == 'register') && (response.code == 2)) {
        window.location.href = window.location.href;
      }
  });
}

jQuery('#verify_email').on('click',function(e){
      e.preventDefault(); 
      var generated_code = jQuery('#email_generated_code').val();
      var counter_value = jQuery('#counter-value').val();
      if(generated_code){
        console.log('Verification code already sent.');
      }else{
        verfication_code_generator('code_send');
        countdownButtonEnable(counter_value);
      }
});

jQuery('#resend_otp').on('click', function(e){
  e.preventDefault();
  var counter_value = jQuery('#counter-value').val();
  verfication_code_generator('resend_code');
  // recend button disable
  jQuery('#recent-counter').removeClass('hide');
  jQuery('#recent-counter').addClass('show');
  jQuery('#resend_otp').prop('disabled', true);
  countdownButtonEnable(counter_value);
});

// code generator
function verfication_code_generator(status){
  
  var userEmail = jQuery('#userEmail').val(); 
  jQuery('#verify_otp').val('');
  jQuery('#wrong_otp').addClass('hide');
  jQuery('#otp_verified').addClass('hide');
    
    var data = {
      'action': 'email_verification',
      'user_email_address': userEmail,
      'code_status' : status 
    }
    jQuery.post(ajax_object.ajax_url, data, function(response) {
        if(response.status_code == 1){
          jQuery('.code-response').parent().removeClass('hide');
          jQuery('.code-response').text(response.message);
          jQuery('#email_generated_code').val(response.generated_code);
        }
    });

}

// verify button on change enable verify otp button 
// d means digit 
function verifyButtonEnable(d){
  //get value and count
  var count = d.value.length;
  if(count >= 5){
    // enable verify button 
    jQuery('#verify_otp_btn').prop('disabled', false);
    jQuery('#wrong_otp').addClass('hide');
  } else {
    jQuery('#verify_otp_btn').prop('disabled', true);
  }  
}


jQuery('#verify_otp_btn').on('click',function(e){
  e.preventDefault(); 
  jQuery(this).prop('disabled', true);
  var verifyOtp = jQuery('#verify_otp').val(); 
  var userEmail = jQuery('#userEmail').val();
  var userName = jQuery('#userName').val();
  var userPassword = jQuery('#userPassword').val();
  var confirmPassword = jQuery('#confirmPassword').val();
      var data = {
        'action': 'otp_verification',
        'otp_code': verifyOtp,
        'user_email_address': userEmail,
        'user_name' : userName,
        'user_password' : userPassword,
        'user_cpassword' : confirmPassword,
      }

      jQuery('#userEmailVerified-error').remove();
      jQuery.post(ajax_object.ajax_url, data, function(response) {
        if(response.status == 1){
          jQuery('#intiForm')[0].reset(); 
          jQuery('#initModal').modal('toggle');
          jQuery('#userEmail').attr("disabled", true);
          jQuery('#otp_verified').removeClass('hide');
          jQuery('#userEmailVerified').val('Verified');
          jQuery('#verify_email').addClass('bg-green text-white disabled').text('Verified');
          jQuery('#userEmailVerified-error').remove();
          // location.reload();
        } else if(response.status == 0){
          jQuery('#wrong_otp').removeClass('hide');
          jQuery('#verify_otp').val('');
        } else {
          jQuery(this).prop('disabled', true);
        }
      });
});

//email validation 
function emailValidation(email){
  $jthis = jQuery('#userEmail');
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if(emailReg.test(email)){
    // check email address already exist on database or not 
    var data = {
      'action': 'email_address_check',
      'user_email_address': email
    }
    jQuery.post(ajax_object.ajax_url, data, function(response) {
        if(response.status_code == 0){
          jQuery('#verify_email').removeClass('disabled');
        } else if(response.status_code == 1){
          $jthis.parent().before('<label id="userEmail-error" class="error" for="userEmail">'+response.message+'</label>');
          jQuery('#verify_email').addClass('disabled');
        }   
     });
   
  }
  
}

//count down button 
function countdownButtonEnable(timeleft){
  //var timeleft = counterValue;
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      jQuery('#resend_otp').prop('disabled', false);
      jQuery('#recent-counter').addClass('hide');
    } else {
      jQuery('#counter-value').val(timeleft);
      var counter = jQuery('#counter-value').val();
      document.getElementById("countdown").innerHTML = counter;
    }
    timeleft -= 1;
  }, 1000);

}

 
 