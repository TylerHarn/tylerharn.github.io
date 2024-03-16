$(document).ready(function(){

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
  });

});



// flip animation
document.querySelectorAll('.card-flip').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
