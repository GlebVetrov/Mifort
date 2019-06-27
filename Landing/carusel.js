//TODO: Refactor to a module pattern for the whole slider

$(function () {
    var width = 600;
    var aniSpeed = 1000;
    var delay = 3000;
    
    var $slider = $('.main__review__slider ul');
    var myInt;
    
    var $slides = $slider.find('li');
    var slideIndex = 0;
    
    var first = $slider.find('li:first').clone();

    var last = $slider.find('li:last').clone();
    first.appendTo($slider);    
    last.prependTo($slider);
    $slider.css({'margin-left': -width});
    
    function createTracker() {
        $('.main__review__slider').after("<div id='tracker'></div>");
        for(i = 0; i < $slides.length; i++)
        {
            $('#tracker').append("<div class='slide-tracker-" + i + "'></div>");
        }
        
        $('.slide-tracker-0').addClass('active1');
    }
    
    function createButtons(){
        $('.main__review__slider').append("<div id='leftButton'><</div>");
        $('.main__review__slider').append("<div id='rightButton'>></div>");
        $('#leftButton').on('click', shiftLeft);
        $('#rightButton').on('click', shiftRight);
    }
    
    //TODO: DRY this
    function shiftLeft() {
        $slider.animate({'margin-left': '+=' + width}, aniSpeed, function(){
            slideIndex--;
            $('.active1').removeClass('active1');
            $('.slide-tracker-' + slideIndex).addClass('active1');
            
            if(slideIndex === -1) {
                $slider.css({'margin-left': (-width * $slides.length)});
                slideIndex = $slides.length - 1;
                $('.slide-tracker-' + slideIndex).addClass('active1');
            }
        });
    }
    
    function shiftRight() {
        $slider.animate({'margin-left': '-=' + width}, aniSpeed, function(){
            slideIndex++;
            $('.active1').removeClass('active1');
            $('.slide-tracker-' + slideIndex).addClass('active1');
            
            if (slideIndex === $slides.length)
            {
                $slider.css({'margin-left': -width});
                slideIndex = 0;
                $('.slide-tracker-' + slideIndex).addClass('active1');
            }  
        });
    }
    
    function startSlider() {
        myInt = setInterval(function(){ shiftRight(); }, delay);
    }
    
    function stopSlider() {
        clearInterval(myInt);
    }
    
    function slideToIndex(tracker) {
        var number = tracker.attr('class').split('-');
        number = number[number.length - 1];
        
        $slider.animate({'margin-left': '+=' + width * (slideIndex - number)}, 1000);
        $('.active1').removeClass('active1');
        tracker.addClass('active1');
        slideIndex = number;
    }
    
    createTracker();
    createButtons();

    //TODO: clean up events, this is lazy
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $('#leftButton').on('mouseenter', stopSlider);
    $('#rightButton').on('mouseenter', stopSlider);
    $('[class^=slide-tracker-]').on('mouseenter', stopSlider).on('mouseleave', startSlider);;
    
    $('[class^=slide-tracker-]').click(function(){ slideToIndex($(this)); });
    
    startSlider();
});

//TODO: Refactor to a module pattern for the whole slider

$(function () {
    var height = 250;
    var aniSpeed = 1000;
    var delay = 3000;
    
    var $slider = $('.main__about__slider ul');


    var myInt;
    
    var $slides = $slider.find('li');
    var slideIndex = 0;
    
    var first = $slider.find('li:first').clone();
    var last = $slider.find('li:last').clone();
    first.appendTo($slider);    
    last.prependTo($slider);
    $slider.css({'margin-top': -height});
    
    function createTracker() {
        $('.main__about__slider').after("<div id='tracker2'></div>");
        for(i = 0; i < $slides.length; i++)
        {
            $('#tracker2').append("<div class='slide-tracker2-" + i + "'></div>");
        }
        
        $('.slide-tracker2-0').addClass('active2');
    }
    //TODO: DRY this
    function shiftLeft() {
        $slider.animate({'margin-top': '+=' + height}, aniSpeed, function(){
            slideIndex--;
            $('.active2').removeClass('active2');
            $('.slide-tracker2-' + slideIndex).addClass('active2');
            
            if(slideIndex === -1) {
                $slider.css({'margin-top': (-height * $slides.length)});
                slideIndex = $slides.length - 1;
                $('.slide-tracker2-' + slideIndex).addClass('active2');
            }
        });
    }
    
    function shiftRight() {
        $slider.animate({'margin-top': '-=' + height}, aniSpeed, function(){
            slideIndex++;
            $('.active2').removeClass('active2');
            $('.slide-tracker2-' + slideIndex).addClass('active2');
            
            if (slideIndex === $slides.length)
            {
                $slider.css({'margin-top': -height});
                slideIndex = 0;
                $('.slide-tracker2-' + slideIndex).addClass('active2');
            }  
        });
    }
    
    function startSlider() {
        myInt = setInterval(function(){ shiftRight(); }, delay);
    }
    
    function stopSlider() {
        clearInterval(myInt);
    }
    
    function slideToIndex(tracker) {
        var number = tracker.attr('class').split('-');
        number = number[number.length - 1];
        
        $slider.animate({'margin-top': '+=' + height * (slideIndex - number)}, 1000);
        $('.active2').removeClass('active2');
        tracker.addClass('active2');
        slideIndex = number;
    }
    
    createTracker();

    //TODO: clean up events, this is lazy
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);
    $('[class^=slide-tracker2-]').on('mouseenter', stopSlider).on('mouseleave', startSlider);;
    
    $('[class^=slide-tracker2-]').click(function(){ slideToIndex($(this)); });
    
    startSlider();
});