





const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  nav: true,
  responsive: {
    992: {
      nav: false
    }
  }
});
// document.querySelector('.prev').onclick = function () {
//   slider.goTo('prev');
// };
document.querySelector('.prev').addEventListener('click', function(){slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function(){slider.goTo('next');
});


// $(document).ready(function(){
//   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
//     $(this)
//       .addClass('.catalog__tab_active').siblings().removeClass('.catalog__tab_active')
//       .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
//   });
// });

(function($) {
  $(function() {
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });

    $('.catalog-item__back').each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });

    //Modal
    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks, #order').fadeOut();
    });
 
    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
      });
    });

 
    
    function validateForms(form){
      $(form).validate({
        rules:{
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите свое имя",
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свой email",
            email: "Неправильно введен адрес почты - name@domain.com"
          }
        }
      });
      $('#order form').validate();
    };
    validateForms('#consultation-form');  
    validateForms('#consultation form');  
    validateForms('#order form');  

    $('input[name=phone]').mask("+3 (999) 999-99-99");

    $('form').submit(function(e){
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
      }).done(function(){
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn();
          $('form').trigger('reset');
      });
      return false;
    });
    //smooth scroll and page up
    $(window).scroll(function(){
      if($(this).scrollTop() > 1600){
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href=#up]").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();
  });
  })(jQuery);