$(document).ready(function(){
    // Activate Carousel
    $("#myCarousel").carousel();
      
    // Enable Carousel Indicators
    $(".main__review .item1").click(function(){
      $(".main__review #myCarousel").carousel(0);
    });
    $(".main__review .item2").click(function(){
      $(".main__review #myCarousel").carousel(1);
    });
    $(".main__review .item3").click(function(){
      $(".main__review #myCarousel").carousel(2);
    });
      
    // Enable Carousel Controls
    $(".main__review .left").click(function(){
      $(".main__review #myCarousel").carousel("prev");
    });
    $(".main__review .right").click(function(){
      $(".main__review #myCarousel").carousel("next");
    });
  });