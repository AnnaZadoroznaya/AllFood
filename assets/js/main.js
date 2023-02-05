(function ($)
  { "use strict"
  
/* 1. Preloder (готовый код, можно использовать в любом проекте) */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. Sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

})(jQuery);


/* Параллакс*/

const scene = $('#scene').get(0); 
/*const scene = document.getElementById('scene');*/ /*на чистом JS*/
const parallaxInstance = new Parallax(scene);

/* Табы */

$('.nav-item').on('click', function () {
  let currTab = $(this).index();

  $('.nav-item').removeClass('active');
  $(this).addClass('active');

  $('.tab-pane').removeClass('show active');
  $('.tab-pane').eq(currTab).addClass('show active');
})

/* Бургер */

  $('.mobile_menu').on('click', function () {
    $('.main-menu').toggleClass('d-none');
    
})


/* Модальное окно */

$('.header-btn').on('click', function (){
  $('.wrapper-modal').fadeIn();
});
$('.form-book').on('click', function (){
  $('.wrapper-modal').fadeOut();
});
$('.overlay').on('click', function (){
  $('.wrapper-modal').fadeOut();
});
$('.form-book').children().on('click', function (e){
  e.stopPropagation();
})



/* Слайдер */

var mySwiper = new Swiper ('.swiper-container', {
  direction : 'horizontal',
  spaceBetween : 20,
  slidesPerView: 1,
  loop : true,
  stopOnLastSlide : false,
  autoplay : {
  delay: 2000
  }
})



/* Валидация */

$('.button-form').on('click', function(e){
  e.preventDefault();
  $(this).parent('form').submit();
})

$.validator.addMethod('regex', function(value, element, regexp){
  let regExsp = new RegExp(regexp);
  return this.optional(element) || regExsp.test(value)
}, 'please check your input.');

function valEl(el){
  el.validate({
    rules : {
      firstName: {
        required: true,
        regex: "[a-zA-Z]"
      },
      email: {
        required: true
      },
      phoneNumber: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 11,
        regex: "[0-9]+"
      }
    },
    
      messages: {
        phoneNumber: {
          required: 'Field is required',
          regex: 'Enter your phone number property'
        },
        firstName: {
          required: 'Field is required',
          regex: 'Enter your name property'
        },
        email: {
          required: 'Field is required',
          regex: 'Enter your email property'
        }
      },
submitHandler: function(form) {
  $('#preloader-active').fadeIn();
  let $form = $(form);
  let $formId = $(form).attr('id');
  switch($formId) {
    case 'form-book':
      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: $form.serialize()
      })
      .done(function(){
        console.log('Success');
      })
      .fail(function() {
        console.log('Fail');
      })
      .always(function() {
        setTimeout( function(){
          $form.trigger('reset');
          $('.wrapper-modal').fadeOut();
        }, 1000);
        serTimeout( function(){
          $('#preloader-active').fadeOut();
        }, 1400);
      });
      break;
      case 'form-book-table':
        $.ajax({
          type: 'POST',
          url: $form.attr('action'),
          data: $form.serialize()
        })
        .done(function(){
          console.log('Success');
        })
        .fail(function(){
          console.log('Fail');
        })
        .always(function() {
          setTimeout( function(){
            $form.trigger('reset');
          }, 1000);
          setTimeout( function() {
            $('#preloader-active').fadeOut();
          }, 1400)
        });
        break;
  }
  return false;
    }
  })
};
$('#form-book-table').each( function() {
  valEl($(this));
})