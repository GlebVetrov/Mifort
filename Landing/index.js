$(document).ready(function(){
    
    $("#navToggle").click(function() {
      $(this).toggleClass("active");
      $(".overlay").toggleClass("open");
      // this line ▼ prevents content scroll-behind
      $("body").toggleClass("locked"); 
    });

    $(window).scroll(function(){
      if ($(this).scrollTop() > 100) {
          $('.header--top').addClass('fixed');
          $('.navBurger').addClass('disableNav');
          $('.header__nav').removeClass('disableNav');
      } else {
          $('.header--top').removeClass('fixed');
          $('.navBurger').removeClass('disableNav');
          $('.header__nav').addClass('disableNav');
      }
    });

    $(".scrolldown").click(function(event){
      $('html').animate({scrollTop: '1000px'}, "slow");
    });
  });



