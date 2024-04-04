$(document).ready(function(){



  // Function to check if the user is on a mobile device
function isMobileDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Add event listeners based on the device
document.querySelectorAll('.card-flip').forEach(card => {
  if (isMobileDevice()) {
    // For mobile devices, add a click event listener
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  } else {
    // For desktop, add a mouseenter event listener to flip the card
    card.addEventListener('mouseenter', () => {
      card.classList.add('flipped');
    });
    // Add a mouseleave event listener to unflip the card
    card.addEventListener('mouseleave', () => {
      card.classList.remove('flipped');
    });
  }
});


  $(window).on('load',function(){
    $('.preloader').addClass('complete')
  });

  $(window).on('scroll',function(){
    var scroll = $(window).scrollTop();
    console.log(scroll);
    if(scroll >=50){
      $(".sticky").addClass("stickyadd");
    }else{
      $(".sticky").removeClass("stickyadd");
    }
  });

  // adding fadeInUp animation to child of div with class .way-col
  var $child = $('.way-fade-up').children();
  $child.each(function(){
    var self= $(this);
    $(this).waypoint(function(){
      self.addClass('animated fadeInUp');
    },{offset: '90%'});
  });

  var $child = $('.way-fade-left').children();
  $child.each(function(){
    var self= $(this);
    $(this).waypoint(function(){
      self.addClass('animated fadeInLeft');
    },{offset: '90%'});
  });

  var $child = $('.way-fade-right').children();
  $child.each(function(){
    var self= $(this);
    $(this).waypoint(function(){
      self.addClass('animated fadeInRight');
    },{offset: '90%'});
  });

  // Adding animation to timeline
  $('.timeline').each(function(){
    var self = $(this);
    self.waypoint(function(){
      self.addClass('animated fadeInLeft');
    },{offset: '90%'});
  });

  $('.owl-carousel').owlCarousel({
      loop:true,
      nav:false,
      autoplay:true,
      autoplayTimeout:4000,
      items:1,
      animateIn : "fadeInRight"
  });

  var filterizd = $('.filter-container').filterizr({
    animationDuration: .5,
  });

  var typed = new Typed(".element", {
    strings: ["Tyler Harnaraine"],
    smartBackspace: true,
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    loopCount: Infinity,
    startDelay: 1000
  });

  $('a').smoothScroll({
    speed:2000,
    offset: -110, 

  });

  $('.navbar-nav .nav-link').click(function(){
    $('.navbar-collapse').collapse('hide');
});


});



// flip animation
document.querySelectorAll('.card-flip').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});




$(document).ready(function(){ 

  // W and S navigation opposed to Tab
  $(document).keydown(function(e) {
    var $focused = $(':focus');
    var $navLinks = $('.navbar-nav .nav-link');
    var index = $navLinks.index($focused);

    if (e.key === 's') { // s key 
      if (index === -1 || index === $navLinks.length - 1) {
        $navLinks.first().focus();
      } else {
        $navLinks.eq(index + 1).focus();
      }
      e.preventDefault(); 
    } else if (e.key === 'w') { // w key 
      if (index === -1 || index === 0) {
        $navLinks.last().focus();
      } else {
        $navLinks.eq(index - 1).focus();
      }
      e.preventDefault(); 
    }
  });
});

//text to speech function - still working on it 
// click on section to read
const toggleTTSButton = document.getElementById('toggle-tts');
let ttsEnabled = false;
let currentUtterance = null;

const speak = (text) => {
  if (currentUtterance) {
    speechSynthesis.cancel();
  }
  currentUtterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(currentUtterance);
};

toggleTTSButton.addEventListener('click', () => {
  ttsEnabled = !ttsEnabled;
  toggleTTSButton.textContent = ttsEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech';
  if (!ttsEnabled && currentUtterance) {
    speechSynthesis.cancel();
    currentUtterance = null;
  }
});

document.addEventListener('click', (event) => {
  if (ttsEnabled) {
    const section = event.target.closest('section');
    if (section) {
      const sectionTitleElement = section.querySelector('h2');
      const sectionTitle = sectionTitleElement ? sectionTitleElement.textContent : '';
      let sectionText = section.textContent;

      if (sectionTitle) {
        sectionText = sectionText.replace(sectionTitle, '').trim();
      }

      speak(sectionTitle + ' ' + sectionText);
    }
  }
});

document.addEventListener('dblclick', () => {
  if (ttsEnabled && currentUtterance) {
    speechSynthesis.cancel();
    currentUtterance = null;
  }
});
