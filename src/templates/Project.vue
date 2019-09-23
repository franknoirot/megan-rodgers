<template>
  <Layout>
    <div class="project__info">
      <h1 class="project__title">{{$page.project.title}}</h1>
      <p class="project__desc" v-html="$page.project.content"></p>
      <nav class="project__processes">
        <button v-for="(step, i) in $page.project.processSteps" class="btn__process" :class="(i == 0) ? 'active' : ''">{{ step.name }}</button>
      </nav>
    </div>
    <div v-for="(step, i) in $page.project.processSteps" class="carousel" :class="(i == 0) ? 'active' : ''">
      <div class="carousel__track-container">
        <ul class="carousel__track" tabindex="0">
          <li class="carousel__slide" v-for="image in step.images">
            <img class="carousel__item" :src="image"/>
          </li>
        </ul>
      </div>
      <button class="carousel__button carousel__button-left" name="Previous Image"><img src="https://franknoirot.co/assets/img/carousel-arrow-left.svg" alt="Previous"/></button>
      <button class="carousel__button carousel__button-right" name="Next Image"><img src="https://franknoirot.co/assets/img/carousel-arrow-right.svg" alt="Next"/></button>
      <div class="carousel__nav">
        <button v-for="(image, i) in step.images" class="carousel__indicator" :class="(i == 0) ? 'active' : ''" ></button>
      </div>
    </div>
  </Layout>
</template>

<page-query>
 query Project ($path: String!) {
   project: project (path: $path) {
      title
      content
      processSteps {
        name
        images
      }
   }
 }
</page-query>


<style>
  :root {
    font-family: 'Open Sans', sans-serif;
    --bg: white;
    --color: #222;
    --color-rgb: 32, 32, 32;
    --primary: #2874A6;
    --primary-rgb: 40, 116, 166;
    --primary-hue: 204deg;
    color: var(--color);
    --work-color: var(--primary);
  }

  h1,h2,h3,h4,h5,h6,
  .site-motto, .site-logomark {
    font-family: "Domine", serif;
  }

  body {
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg);
  }

  header {
    box-sizing: border-box;
    position: fixed;
    width: 100vw;
    height: 8vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg);
    padding: 1vh 3.5vw;
    box-shadow: 0 .7vmin 1.3vmin rgba(var(--color-rgb), .05),
                0 .2vmin .6vmin rgba(var(--color-rgb), 0.18);
  }

  header a {
    text-decoration: none;
    color: inherit;
  }

  .site-logomark {
    font-weight: bold;
    font-size: 140%;
    transition: color .12s ease-in-out, background .12s ease-in-out;
    padding: .25em .5em;
    height: 90%;
  }

  .site-logomark svg {
    height: 100%;
  }

  .cls-1 {
    fill: var(--color);
    transition: fill .12s ease-in-out;
  }

  .site-logomark:hover,
  .site-logomark:focus {
    background: var(--primary);
    outline: none;
  }

  .site-logomark:hover .cls-1,
  .site-logomark:focus .cls-1 {
    fill: var(--bg);
  }

  header nav {
    width: 30vw;
    min-width: 200px;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header nav a {
    position: relative;
  }

  header nav a:not(.contact)::after {
    content: '';
    position: absolute;
    top: 100%;
    left: -.5vw;
    height: 2px;
    width: 0;
    background: var(--primary);
    transition: width .12s ease-in-out;
  }

  header nav a:not(.contact):focus {
    outline: none;
  }

  header nav a:hover::after,
  header nav a:focus::after {
    width: calc(100% + 1vw);
  }

  /* Contact Badge */
  .contact {
    color: white;
    background: var(--primary);
    text-decoration: none;
    display: inline-block;
    padding: .5em 1em;
    border-radius: 1vmin;
    transform: translate(0, 0) scale(1);
    --shadow-1-height: 0;
    --shadow-1-blur: 0;
    --shadow-2-height: 0;
    --shadow-2-blur: 0;
    box-shadow: 0 var(--shadow-1-height) var(--shadow-1-blur) rgba(var(--primary-rgb), 0.3),
                0 var(--shadow-2-height) var(--shadow-2-blur) rgba(var(--primary-rgb),0.08);
    transition: all .12s ease-in-out;
  }

  .contact:hover,
  .contact:focus {
    outline: none;
    transform: translate(0, -.5vh) scale(1.1);
    --shadow-1-height: .6vmin;
    --shadow-1-blur: .9vmin;
    --shadow-2-height: 1.3vmin;
    --shadow-2-blur: 1.6vmin;
  }

  .site-motto {
    z-index: 5;
    width: 70vmin;
    color: var(--color);
    font-size: calc(1.3em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21)));
    line-height: calc(1.3em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21))); 
    transition: all .12s ease-in-out;
  }

  .drop-cap::first-letter {
    color: var(--bg);
    margin: 0 .1em;
    margin-left: 0;
    padding: 0 calc(.4em + (1.5 - 1.1) * ((100vw - 21em)/(35 - 21)));
    background: var(--color);
    font-size: calc(2em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21)));
    border-radius: 0 0 3vw 0;
  }

  .featured-projects {
    --w: 94;
    --h: 70;
    width: calc(var(--w)* 1vw);
    height: calc(var(--h)*1vh);
    position: absolute;
    top: calc((100 - var(--h)) * .5vh);
    left: calc((100 - var(--w)) * .5vw);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .featured-projects:focus-within ~ .site-motto,
  .featured-projects:hover ~ .site-motto {
    filter: blur(3vmin);
    opacity: 0;
    pointer-events: none;
    transform: scale(1.2);
  }

  .project {
    --bg-sat: calc(100% - (var(--nth-child) - 1) * 33%);
    --bg-light: calc(90% - (var(--nth-child) - 1) * 25%);
    background: hsla(var(--primary-hue), var(--bg-sat), var(--bg-light), .2);
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    transform: scale(1);
    filter: blur(.5vmin);
    transition: all .12s .06s ease-in-out;
  }

  .featured-projects:hover .project,
  .featured-projects:focus-within .project {
    transition: all .12s ease-in-out;
    /* remove transition delay when focus is already within the projects area */
  }

  .featured-projects > .project:nth-child(1) { --nth-child: 1; }
  .featured-projects > .project:nth-child(2) { --nth-child: 2; }
  .featured-projects > .project:nth-child(3) { --nth-child: 3; }

  .project:hover,
  .project:focus {
    transform: scale(1.04);
    outline: none;
    filter: none;
    z-index: 2;
  }

  .project img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    max-height: 100%;
    filter: grayscale(1);
    opacity: .2;
    transition: all .12s ease-in-out;
  }

  .project:hover img,
  .project:focus img {
    opacity: 1;
    filter: none;
  }

  main {
    max-width: 1260px;
    display: grid;
    grid-template-columns: 35% 65%;
    box-sizing: border-box;
    padding: 4vh 4vw;
    grid-gap: 5vmin;
  }

  /* Process UL and Buttons */
  .project__processes {
    width: 100%;
    display: grid;
    grid-gap: .2vmin;
    grid-template-columns: repeat(3,1fr);
  }

  .project__processes button {
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    position: relative;
    transition: color .13s ease-in-out;
    --work-color: inherit;
  }

  .project__processes button::after {
    position: absolute;
    z-index: -1;
    content: '';
    width: 100%;
    bottom: 0;
    left: 0;
    height: .2vmin;
    background: #2874A6;
    transition: height .13s ease-in-out;
  }

  .project__processes button.active {
    color: var(--bg);
  }

  .project__processes button.active::after {
    height: 100%;
  }

  /* CAROUSEL */
  .carousel {
    top: 0;
    position: absolute;
    margin: 0 auto;
    height: 0;
    width: 0;
    height: 0;
    opacity: 0;
    counter-reset: slide-count;
    transform: scale(1);
    transition: transform .09s ease-in-out;
  }

  .carousel.active {
    width: 100%;
    height: 40vh;
    opacity: 1;
    grid-column: 2 / 3;
    position: relative;
  }

  .carousel:hover,
  .carousel:focus-within {
    transform: scale(1.02);
  }

  .carousel__item {
      height: 100%;
      object-fit: contain;
  }

  .carousel__track-container {
      height: 100%;
      overflow: hidden;
      top: inherit;
  }

  .carousel__track {
      height: 100%;
      top: 0;
      padding: 0;
      margin: 0;
      list-style: none;
      position: relative;
      transition: transform .22s ease-in;
  }

  .carousel__track:focus {
      outline: none;
  }

  .carousel__track:focus .carousel__slide img {
    outline: solid var(--work-color); 
  }

  .carousel__slide {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
  }

  .carousel__button {
      position: absolute;
      background: transparent;
      border: 0;
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 32px;
      height: 100%;
  }

  .carousel__button:focus {
    outline: none;
  }

  .carousel__button-left { left: 12px; --shadow-dir: -1; }
  .carousel__button-right { right: 12px; --shadow-dir: 1; }

  .carousel__button img {
      width: 10px;
      fill: var(--work-color);
      filter: drop-shadow(calc(var(--shadow-dir) * .4vmin) 0 0px var(--work-color));
      transform: scale(1);
      transition: all .09s ease-in-out;
  }
  .carousel__button:hover img,
  .carousel__button:focus img {
      filter: drop-shadow(calc(var(--shadow-dir) * 1vmin) 0 0px var(--work-color));
      transform: scale(1.1);
  }

  .carousel__nav {
      width: 75%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      padding: .5em 0;
  }

  .carousel__indicator {
      flex-basis: 100%;
      background: transparent;
      border: 0;
      margin: 0 1em;
      height: 3vh;
      position: relative;
      cursor: pointer;
      transform: scale(1);
      transition: all .09s ease-in-out;
  }

  .carousel__indicator:hover,
  .carousel__indicator:focus {
      transform: scale(1.2);
      outline: none;
  }

  .carousel__indicator::after {
      counter-increment: slide-count;
      content: counter(slide-count);
      text-align: center;
      vertical-align: center;
      color: rgba(51,51,51,0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }

  .carousel__indicator::before {
      content: "";
      width: 100%;
      --indicator-height: 2px;
      height: var(--indicator-height);
      background: rgba(51,51,51,0.1);
      position: absolute;
      top: calc(50% - var(--indicator-height));
      left: 0;
  }

  .carousel__indicator.active::after {
      color: var(--dark-gray);
  }

  .carousel__indicator.active::before {
      background: var(--work-color);
  }

  @media (orientation: portrait) {
      .work-item {
          display: block;
      }
  }

  /* CAROUSEL LIGHTBOX */
  .carousel.lightbox {
      position: fixed;
      width: 90vw;
      height: 90vh;
      top: 5vh;
      left: 5vw;
      z-index: 50;
      transform: none;
  }

  .carousel.lightbox::before {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(51,51,51,0.8);
  }

  .carousel.lightbox .carousel__track {
      outline: none;
  }

  .carousel.lightbox .active .carousel__item-info {
      transform: translateY(-100%);
      opacity: 1;
  }

  .carousel.lightbox .carousel__indicator.active::after {
      color: white;
  }


  @media(orientation: portrait) {
    .featured-projects {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3,1fr);
    }
    
    main {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
    
    .carousel {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }
</style>


<script>
export default {
  metaInfo() {
   return {
     title: this.$page.project.title
   }
 },
 mounted() {
   let carousels = [].slice.call(document.querySelectorAll(".carousel"));

  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var lazyImgs = [].slice.call(document.querySelectorAll(".lazy"));


    if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
      var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var lazyImage = entry.target;
            console.log(lazyImage, lazyImage.tagName, lazyImage.tagName === "VIDEO");
            if (lazyImage.tagName === "VIDEO") lazyImage.children[0].src = lazyImage.children[0].dataset.src;else lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      lazyImgs.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      let active = false;

      const lazyLoad = function() {
          if (active === false) {
          active = true;

          setTimeout(function() {
              lazyImgs.forEach(function(lazyImage) {
              if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.srcset = lazyImage.dataset.srcset;
                  lazyImage.classList.remove("lazy");

                  lazyImgs = lazyImgs.filter(function(image) {
                  return image !== lazyImage;
                  });

                  if (lazyImgs.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationchange", lazyLoad);
                  }
              }
              });

              active = false;
          }, 200);
          }
      };

      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
    }
  });

  var setup = function setup(carousel) {
    var container = carousel.querySelector(".carousel__track-container");
    var track = carousel.querySelector(".carousel__track");
    var slides = [].slice.call(track.children);
    var nextBtn = carousel.querySelector(".carousel__button-right");
    var prevBtn = carousel.querySelector(".carousel__button-left");
    var dotsNav = carousel.querySelector(".carousel__nav");
    var dots = [].slice.call(dotsNav.children);

    function setSlidePos(slides) {
      var slideW = slides[0].getBoundingClientRect().width;
      slides.forEach(function (slide, i) {
        slide.style.left = slideW * i + "px";
      });
    };
    
    let processBtns = [].slice.call(document.querySelectorAll('.btn__process'))
    processBtns.forEach(btn => btn.addEventListener('click', handleProcessBtnClick))
    
    function handleProcessBtnClick(e) {
      e.preventDefault()
      let index = processBtns.indexOf(e.target)
      
      processBtns.forEach(btn => btn.classList.remove('active'))
      processBtns[index].classList.add('active')
      
      carousels.forEach(carousel => carousel.classList.remove('active'))
      carousels[index].classList.add('active')
      setSlidePos([].slice.call(carousels[index].querySelector('.carousel__track').children))
    }
    

    setSlidePos(slides);

    var updateCarousel = function updateCarousel(current, target, track) {
      if (track) track.style.transform = "translateX(-".concat(target.style.left, ")");
      current.classList.remove('active');
      target.classList.add('active');
    };

    var slideRight = function slideRight() {
      var curSlide = track.querySelector(".active");
      var nextSlide = curSlide.nextElementSibling ? curSlide.nextElementSibling : slides[0];
      updateCarousel(curSlide, nextSlide, track);
      var curDot = dotsNav.querySelector(".active");
      var nextDot = curDot.nextElementSibling ? curDot.nextElementSibling : dots[0];
      updateCarousel(curDot, nextDot);
    };

    nextBtn.addEventListener('click', slideRight); // slide right on nextBtn click

    var slideLeft = function slideLeft() {
      var curSlide = track.querySelector(".active");
      var prevSlide = curSlide.previousElementSibling ? curSlide.previousElementSibling : slides[slides.length - 1];
      updateCarousel(curSlide, prevSlide, track);
      var curDot = dotsNav.querySelector(".active");
      var prevDot = curDot.previousElementSibling ? curDot.previousElementSibling : dots[dots.length - 1];
      updateCarousel(curDot, prevDot);
    };

    prevBtn.addEventListener('click', slideLeft); // slide left on prevBtn click

    dotsNav.addEventListener('click', function (e) {
      var targetDot = e.target.closest("button");
      if (!targetDot) return;
      var curSlide = track.querySelector('.active');
      var curDot = dotsNav.querySelector('.active');
      var targetIndex = dots.findIndex(function (d) {
        return d === targetDot;
      });
      var targetSlide = slides[targetIndex];
      updateCarousel(curSlide, targetSlide, track);
      updateCarousel(curDot, targetDot);
    });

    function keyboardDispatch(e) {
      if (e.code === "Tab" || e.repeat || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      var digit = parseInt(e.code.replace("Digit", "")) - 1;

      if (digit !== NaN && digit >= 0 && digit < slides.length) {
        var curSlide = track.querySelector('.active');
        var curDot = dotsNav.querySelector('.active');
        var targetSlide = slides[digit];
        var targetDot = dots[digit];
        updateCarousel(curSlide, targetSlide, track);
        updateCarousel(curDot, targetDot);
      }

      switch (e.code) {
        case "Escape":
          lightBoxSetup();
          break;

        case "ArrowLeft":
          slideLeft();
          break;

        case "ArrowRight":
          slideRight();
      }
    }

    ;

    function lightBoxSetup() {
      carousel.classList.toggle('lightbox');

      if (carousel.classList.contains('lightbox')) {
        document.addEventListener('keydown', keyboardDispatch);
        track.removeEventListener('keydown', trackKeyCheck);
      } else {
        document.removeEventListener('keydown', keyboardDispatch);
        track.addEventListener('keydown', trackKeyCheck);
      }

      setSlidePos(slides);
      var curSlide = track.querySelector('.active');
      updateCarousel(curSlide, curSlide, track);
    }

    ;

    function trackKeyCheck(e) {
      if (e.code === "Tab" || e.repeat || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      lightBoxSetup();
    }

    ;
    track.addEventListener('click', lightBoxSetup);
    track.addEventListener('keydown', trackKeyCheck); // SWIPE LISTENING

    var swipeX = null, swipeY = null;
    var swipeThresh = 50;
    track.addEventListener('touchstart', function (e) {
      swipeX = e.changedTouches[0].pageX;
      swipeY = e.changedTouches[0].pageY;
    }, false);
    track.addEventListener('touchend', function (e) {
      if (!swipeX) return;
      var distX = swipeX - e.changedTouches[0].pageX;
      var distY = swipeY - e.changedTouches[0].pageY;
      if (Math.abs(distY) >= Math.abs(distX)) return;

      if (Math.abs(distX) > swipeThresh) {
        if (distX >= 0) slideRight();else slideLeft();
      }
    }, false);
  };

  // DO THE DANG THING
  carousels.forEach(carousel => setup(carousel));



  // POLYFILLS
  // Array.findIndex()
  // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }

        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];

        // 5. Let k be 0.
        var k = 0;

        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return -1.
        return -1;
      },
      configurable: true,
      writable: true
    });
  }

  // Element.closest()
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  // Carousel Slides


  // Process Buttons
  let processBtns = [].slice.call(document.querySelectorAll('.project__processes button'))

  processBtns.forEach(el => el.addEventListener('click', () => {
    
  }))
 }
}
</script>