
let sliderWrapper = $('#slider');
let slidesCont = sliderWrapper.children('.slides-container');
let pager = sliderWrapper.children('.pager');

var slidesNum = 4;

function createSlidesAndBullets(num) {
    for(let i = 1; i <= num; i++){
        slidesCont.append(`<div class="slide"><img src="img/img-${i}.jpg"></div>`)
        pager.append("<div class='bullet'></div>")
    }
}
createSlidesAndBullets(slidesNum);


let auto = true;
let pause = 5000;

let slides = slidesCont.children('.slide');

let arrowsCont = sliderWrapper.children('.arrows');
let prevSlide = arrowsCont.children('.prev');
let nextSlide = arrowsCont.children('.next');
    
let slidesCount = slidesNum;
    
let currentSlide = slides.first();
let currentSlideIndex = 1;
    
let autoPlay = null;



$(function() { 
    slides.not(':first').css('display', 'none');
    currentSlide.addClass('active');

    function bulletActivator(index){
        let activeBullet = $(".pager .bullet.activeBullet");
    
        if(activeBullet){
            activeBullet.removeClass("activeBullet");
        }
        pager.find(`.bullet:nth-child(${index})`).addClass("activeBullet");

    }

    function fadeNext() {
        currentSlide.removeClass('active').fadeOut(700);
    
        if(currentSlideIndex == slidesCount) {
            currentSlide = slides.first();
            currentSlide.delay(500).addClass('active').fadeIn(700);
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
            currentSlide = currentSlide.next();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }
    
        bulletActivator(currentSlideIndex);
    }

    function fadePrev() {
        currentSlide.removeClass('active').fadeOut(700);
    
        if(currentSlideIndex == 1) {
            currentSlide = slides.last();
            currentSlide.delay(500).addClass('active').fadeIn();
            currentSlideIndex = slidesCount;
        } else {
            currentSlideIndex--;
            currentSlide = currentSlide.prev();
            currentSlide.delay(500).addClass('active').fadeIn(700);
        }

        bulletActivator(currentSlideIndex);

    }
      
    function AutoPlay() {
        clearInterval(autoPlay);
     
        if(auto == true)
            autoPlay = setInterval(function() {fadeNext()}, pause);
    }

 
    $(nextSlide).click(function(e) {
        e.preventDefault();
        fadeNext();
        AutoPlay();
    });
        
    
    $(prevSlide).click(function(e) {
        e.preventDefault();
        fadePrev();
        AutoPlay();
    });
        
    $(".bullet").click(function(){
        currentSlide.removeClass('active').fadeOut(700);

        currentSlide = slides.eq($(this).index());

        currentSlide.delay(500).addClass('active').fadeIn(700);
        currentSlideIndex = $(this).index();

        bulletActivator(currentSlideIndex+1);

        AutoPlay();
    })

    AutoPlay();

 });

