
$(document).ready(function() {
    $(window).scroll(function() {
        // Check if the pin-spacer section is in the viewport
        var pinSpacer = $('.pin-spacer');
        var pinSpacerTop = pinSpacer.offset().top;
        var pinSpacerHeight = pinSpacer.outerHeight();
        var pinSpacerBottom = pinSpacerTop + pinSpacerHeight;
        var windowHeight = $(window).height();
        var windowBottom = $(this).scrollTop() + windowHeight;

        if (pinSpacerTop < windowBottom && pinSpacerBottom > $(this).scrollTop()) {
            pinSpacer.addClass('is-sticky');
        } else {
            pinSpacer.removeClass('is-sticky');
        }

        // Add 'is-inview' class to '.WhatWeDo_whatWeDoWrap' when scrolled down 200px
        var scrollPosition = $(this).scrollTop();
        $('.WhatWeDo_whatWeDoWrap').each(function() {
            var elemTop = $(this).offset().top;
            if (scrollPosition > elemTop - 200) {
                $(this).addClass('is-inview');
            } else {
                $(this).removeClass('is-inview'); // Remove the class when not in view
            }
        });

        // Adjust transform property of '.WhatWeDo_scrollElement' dynamically
        var $inviewWrap = $('.WhatWeDo_whatWeDoWrap.is-inview');
        if ($inviewWrap.length > 0) {
            var inviewTop = $inviewWrap.offset().top;
            var inviewScroll = scrollPosition - inviewTop + 150;
            var containerHeight = $('#whatWeDoContainer').outerHeight();
            inviewScroll = Math.min(containerHeight, Math.max(0, inviewScroll)); // Ensure it doesn't scroll beyond container height
            $('.WhatWeDo_scrollElement').css('transform', 'translateY(' + inviewScroll + 'px)');
        } else {
            $('.WhatWeDo_scrollElement').css('transform', 'translateY(0)');
        }

        // Section reveal on scroll for .WhatWeDo_whatWeDoCotentList
        $('.WhatWeDo_whatWeDoWrap').each(function() {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var parallaxOffset = ($(window).scrollTop() - sectionTop) * 0.2; // Adjust the parallax speed here

            // Check if the section is in view
            if ((scrollPosition + $(window).height() / 2) > sectionTop && scrollPosition < sectionBottom) {
                // Fade in the corresponding .WhatWeDo_whatWeDoCotentList
                $(this).find('.WhatWeDo_whatWeDoCotentList').addClass('fade-in');

                // Apply parallax effect to .WhatWeDo_whatWeDoCotentList
                $(this).find('.WhatWeDo_whatWeDoCotentList').css('transform', 'translateY(' + parallaxOffset + 'px)');
            } else {
                // Fade out the .WhatWeDo_whatWeDoCotentList of other sections
                $(this).find('.WhatWeDo_whatWeDoCotentList').removeClass('fade-in');
            }
        });

        // Remove is-inview class from WhatWeDo_whatWeDoWrap when it's not in view
        $('.WhatWeDo_whatWeDoWrap:not(.is-inview)').find('.WhatWeDo_whatWeDoCotentList').removeClass('fade-in');
    });

    // Trigger scroll event when the page loads to apply changes immediately
    $(window).scroll();
});



// banner js

    // Smooth-scroll enhancement + active state tracking
    const navLinks = Array.from(document.querySelectorAll('.side-nav a'));
    const sections = navLinks.map(a => document.querySelector('#' + a.dataset.target));

    // Click -> smooth scroll (native CSS handles it; JS ensures cross-browser + offset options)
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.target);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Observe which section is in view to highlight the nav
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const corresponding = document.querySelector(`.side-nav a[data-target="${id}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          corresponding?.classList.add('active');
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.6 });

    sections.forEach(sec => sec && io.observe(sec));


    // end section

    // video js start

      // Scroll Animation
      const animatedEls = document.querySelectorAll('.video-wrapper');
      const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
      if(entry.isIntersecting){
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
      }
      });
      }, { threshold: 0.3 });
      animatedEls.forEach(el => observer.observe(el));

    // gallery slider
    const slidesWrapper = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.arrow.right');
    const prevBtn = document.querySelector('.arrow.left');
    let currentIndex = 0;
    const itemsPerView = window.innerWidth < 600 ? 1 : (window.innerWidth < 900 ? 2 : 3);
    
    
    function showSlide(index){
    const offset = index * (100 / itemsPerView);
    slidesWrapper.style.transform = `translateX(-${offset}%)`;
    slideItems.forEach((slide,i)=> slide.classList.remove('active'));
    slideItems[index]?.classList.add('active');
    }
    
    
    nextBtn.addEventListener('click', ()=>{
    currentIndex = (currentIndex + 1) % (slideItems.length - itemsPerView + 1);
    showSlide(currentIndex);
    });
    
    
    prevBtn.addEventListener('click', ()=>{
    currentIndex = (currentIndex - 1 + (slideItems.length - itemsPerView + 1)) % (slideItems.length - itemsPerView + 1);
    showSlide(currentIndex);
    });
    
    
    // Auto slide on scroll
    window.addEventListener('scroll', ()=>{
    const gallery = document.querySelector('#gallery');
    const rect = gallery.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3){
    const scrollPercent = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
    let index = Math.min(slideItems.length - itemsPerView, Math.floor(scrollPercent * slideItems.length));
    if(index !== currentIndex){
    currentIndex = index;
    showSlide(currentIndex);
    }
    }
    });
    
    
    showSlide(currentIndex);
// end


// developer js

const copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);


// event slider
const slider = document.querySelector('.events-slider');
const eventCards = document.querySelectorAll('.event-card');
const nextEventBtn = document.querySelector('.event-arrow.right');
const prevEventBtn = document.querySelector('.event-arrow.left');
const progressBar = document.querySelector('.progress-bar');
let currentEventIndex = 1; // start from first real slide
const totalSlides = eventCards.length;
const autoplayDelay = 5000; // 5 seconds


function updateSlide(){
slider.style.transition = 'transform 0.8s ease-in-out';
slider.style.transform = `translateX(-${currentEventIndex * 100}%)`;
resetProgressBar();
}


nextEventBtn.addEventListener('click', ()=>{
if(currentEventIndex >= totalSlides-1) return;
currentEventIndex++;
updateSlide();
});


prevEventBtn.addEventListener('click', ()=>{
if(currentEventIndex <= 0) return;
currentEventIndex--;
updateSlide();
});


slider.addEventListener('transitionend', ()=>{
if(eventCards[currentEventIndex].classList.contains('clone')){
slider.style.transition = 'none';
currentEventIndex = eventCards[currentEventIndex].innerText.includes('Luxury Villa') ? 1 : totalSlides-2;
slider.style.transform = `translateX(-${currentEventIndex * 100}%)`;
}
});


// Autoplay with progress
let autoplay = setInterval(()=>{
nextEventBtn.click();
}, autoplayDelay);


function resetProgressBar(){
progressBar.style.transition = 'none';
progressBar.style.width = '0';
setTimeout(()=>{
progressBar.style.transition = `width ${autoplayDelay}ms linear`;
progressBar.style.width = '100%';
},50);
}


resetProgressBar();


// end

// video section

// timer
// Add JavaScript code here
 

// timer end