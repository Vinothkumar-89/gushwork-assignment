(function ($) {
	
	"use strict";

    /* Sticky Navigation*/	
$(window).on('scroll', function(){
        if ( $(window).scrollTop() > 70 ) {
            $('.header-top').addClass('navbar-fixed');
        } else {
            $('.header-top').removeClass('navbar-fixed');
        }
    });	
/* Sticky Navigation*/	

/* Top Carousel*/	
const images = Array.from(document.querySelectorAll('#thumbs img'));
const mainImg = document.getElementById('mainImg');
const zoomPanel = document.getElementById('zoomPanel');
const hoverBox = document.getElementById('hoverBox');
const mainBox = document.getElementById('mainBox');

let index = 0;

/* ---------- CAROUSEL ---------- */
function showImage(i) {
  index = i;
  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');
  mainImg.src = images[index].src;
}

document.querySelector('.next').onclick = () => {
  index = (index + 1) % images.length;
  showImage(index);
};

document.querySelector('.prev').onclick = () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
};

images.forEach((img, i) => {
  img.onclick = () => showImage(i);
});

/* ---------- ZOOM ---------- */
mainBox.addEventListener('mouseenter', () => {
  hoverBox.style.display = 'block';
  zoomPanel.style.display = 'block';
});

mainBox.addEventListener('mouseleave', () => {
  hoverBox.style.display = 'none';
  zoomPanel.style.display = 'none';
});

mainBox.addEventListener('mousemove', (e) => {

  const rect = mainImg.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const boxSize = 120;
  const zoom = 2.5;

  // Move hover box
  hoverBox.style.left = (x - boxSize/2) + 'px';
  hoverBox.style.top = (y - boxSize/2) + 'px';

  // Zoom panel background
  zoomPanel.style.backgroundImage = `url(${mainImg.src})`;
  zoomPanel.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
  zoomPanel.style.backgroundPosition =
    `-${x * zoom - zoomPanel.offsetWidth/2}px -${y * zoom - zoomPanel.offsetHeight/2}px`;

});

/* Top Carousel*/	

/* Accordion */	
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
   accordionItemHeader.addEventListener("click", event => {
    
     // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
    
    const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
    if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
       currentlyActiveAccordionItemHeader.classList.toggle("active");
       currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
     }

     accordionItemHeader.classList.toggle("active");
     const accordionItemBody = accordionItemHeader.nextElementSibling;
     if(accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
     }
     else {
       accordionItemBody.style.maxHeight = 0;
     }
    
   });
});
/* Accordion */	


  })(window.jQuery);

/* Toggle Popup */
//   function togglePopup() {
//             const overlay = document.getElementById('popupOverlay');
//             overlay.classList.toggle('show');
//             document.body.classList.toggle('popup-active');

//             const overlaynew = document.getElementById('popupOverlayNew');
//             alert("hi");
//             console.log(overlaynew);
//             overlaynew.classList.toggle('show');
//             document.body.classList.toggle('popup-active');
//         }


function togglePopup(popupId) {
    const overlay = document.getElementById(popupId);
    if (!overlay) return;

    overlay.classList.toggle('show');

    // Check if ANY popup is open
    const anyOpen = document.querySelector('.overlay.show');

    document.body.classList.toggle('popup-active', !!anyOpen);
}
/* Toggle Popup */

  /* Applications Slider */	
let current = 0;
  const track = document.getElementById('sliderTrack');
  const cards = track.querySelectorAll('.slide-card');
  const total = cards.length;
  const dotsEl = document.getElementById('dotsContainer');

  function getVisible() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 768) return 2;
    if (w <= 1024) return 3;
    return 4;
  }

  function buildDots() {
    const vis = getVisible();
    const pages = Math.max(1, total - vis + 1);
    dotsEl.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const d = document.createElement('button');
      d.className = 'dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.onclick = () => goTo(i);
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    const vis = getVisible();
    const maxIdx = Math.max(0, total - vis);
    current = Math.min(Math.max(idx, 0), maxIdx);

    const cardW = cards[0].offsetWidth + 16; // card width + gap
    track.style.transform = 'translateX(-' + (current * cardW) + 'px)';

    document.getElementById('prevBtn').disabled = current === 0;
    document.getElementById('nextBtn').disabled = current >= maxIdx;

    dotsEl.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function moveSlide(dir) {
    goTo(current + dir);
  }

  // Init
  buildDots();
  goTo(0);

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(0);
    }, 150);
  });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) moveSlide(diff > 0 ? 1 : -1);
  });

/* Applications Slider */	

/* Row Slider */	

  const slides = [
  { 
    img: "./js/img/slider-image.jpg", 
    title: "High-Grade Raw Material Selection 1", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
},
  { img: "./js/img/slider-image-1.jpg", 
    title: "High-Grade Raw Material Selection 2", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
 },
  { 
    img: "./js/img/slider-image-2.jpg", 
    title: "High-Grade Raw Material Selection 3", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
  },

  { 
    img: "./js/img/slider-image-3.jpg", 
    title: "High-Grade Raw Material Selection 4", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
  },

  { 
    img: "./js/img/slider-image-4.jpg", 
    title: "High-Grade Raw Material Selection 5", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
  },

  { 
    img: "./js/img/slider-image-5.jpg", 
    title: "High-Grade Raw Material Selection 6", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
  },

  { 
    img: "./js/img/slider-image-2.jpg", 
    title: "High-Grade Raw Material Selection 7", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
  },

  { 
    img: "./js/img/slider-image-5.jpg", 
    title: "High-Grade Raw Material Selection 8", 
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: [
      "PE100 grade material",
      "Maintains perfect roundness"
    ] 
  }

];

let index = 0;

document.addEventListener("DOMContentLoaded", () => {

  const slideImg = document.getElementById('slideImg');
  const title = document.getElementById('title');
  const desc = document.getElementById('desc');
  const list = document.getElementById('list');
  const tabs = document.querySelectorAll('.tab');
  

  function loadSlide(i) {
    index = i;

    slideImg.src = slides[i].img;
    title.innerText = slides[i].title;
    desc.innerText = slides[i].desc;
    list.innerHTML = ""; 

    slides[i].list.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });

    tabs.forEach(btn => btn.classList.remove('active'));
    tabs[i].classList.add('active');
  }

  loadSlide(0);

  document.querySelector('.next-1').onclick = () => {
    index = (index + 1) % slides.length;
    loadSlide(index);
  };

  document.querySelector('.prev-1').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    loadSlide(index);
  };

  window.goSlide = function(i) {
    loadSlide(i);
  };

});


/* Row Slider */	
  