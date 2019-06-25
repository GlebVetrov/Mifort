$(document).ready(function(){
    // Activate Carousel
    
    $('#carousel-example-generic').on('.main__about slide.bs.carousel', function() {
      if ($('.main__about .carousel-inner .item:last').hasClass('active')) {
        $('.main__about .carousel-inner .item:first').addClass('animated slideInUp');
      } else {
        $('.main__about .item.active').next().addClass('animated slideInUp');
      }
      $('.main__about .item.active').addClass('animated slideOutUp');
    });
    
    $('#carousel-example-generic').on('slid.bs.carousel', function() {
      $('.item').removeClass('animated slideInUp slideOutUp')
    });
    
    $('.left').click(function() {
      if ($('.main__about .carousel-inner .item:first').hasClass('active')) {
        $('.main__about .carousel-inner .item:last').addClass('animated slideInUp');
      } else {
        $('.main__about .item.active').prev().addClass('animated slideInUp');
      }
    });
    
    $('.main__about .carousel-indicators > li').click(function() {
      $('.main__about .item').addClass('animated slideInUp');
    });
  });