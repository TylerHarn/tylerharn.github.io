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


$(document).ready(function(){

  $(document).keydown(function(e) {
    var $focused = $(':focus');
    var $navLinks = $('.navbar-nav .nav-link');
    var index = $navLinks.index($focused);

    if (e.key === 'ArrowDown') {
      if (index === -1 || index === $navLinks.length - 1) {
        $navLinks.first().focus();
      } else {
        $navLinks.eq(index + 1).focus();
      }
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      if (index === -1 || index === 0) {
        $navLinks.last().focus();
      } else {
        $navLinks.eq(index - 1).focus();
      }
      e.preventDefault();
    }
  });

});


// Text to speech
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


// ========== Chatbot ==========
const WORKER_URL = "https://tyler-port-chat.tyler-harnaraine.workers.dev/";

function appendMessage(sender, text) {
  const chatWindow = document.getElementById("chat-window");
  const msg = document.createElement("div");
  msg.style.marginBottom = "10px";
  msg.style.fontSize = "0.85rem";
  msg.innerHTML = `<strong style="color: ${sender === 'You' ? '#00aeff' : '#333'}">${sender}:</strong> <span style="color: #444">${text}</span>`;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage(message) {
  if (!message.trim()) return;
  document.getElementById("chat-input").value = "";

  const chatWindow = document.getElementById("chat-window");
  if (chatWindow.querySelector("p")) chatWindow.innerHTML = "";

  appendMessage("You", message);
  appendMessage("Tyler's AI", "Thinking...");

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: message }),
    });
    const data = await res.json();
    chatWindow.lastChild.innerHTML = `<strong style="color: #333">Tyler's AI:</strong> <span style="color: #444">${data.reply}</span>`;
    chatWindow.lastChild.style.fontSize = "0.85rem";
  } catch (err) {
    chatWindow.lastChild.innerHTML = `<strong style="color: red">Error:</strong> <span style="color: #444">Something went wrong. Please try again.</span>`;
  }
}

$(document).ready(function () {
  $("#chat-send").on("click", function () {
    sendMessage($("#chat-input").val());
  });

  $("#chat-input").on("keypress", function (e) {
    if (e.key === "Enter") sendMessage($(this).val());
  });

  $(".suggested-q").on("click", function () {
    sendMessage($(this).text());
  });
});
// ========== End Chatbot ==========