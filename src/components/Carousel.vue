<template>
<div class="carousel" :class="{lightbox: lightboxActive}">
  <div class="carousel__track-container">
    <ul class="carousel__track" tabindex="0"
      @keyup.right="setSlide(nextSlideRight)"
      @keyup.left="setSlide(nextSlideLeft)"
      @keyup.space="toggleLightbox()"
      @keyup.enter="toggleLightbox()"
      @click="toggleLightbox()"
      @keyup.esc="() => lightboxActive = false">
      <li class="carousel__slide" v-for="(url, i) in images" :key="i"
       >
        <g-image class="carousel__item" :src="url"/>
      </li>
    </ul>
  </div>
  <button @click="setSlide(nextSlideLeft)"
          class="carousel__button carousel__button-left" name="Previous Image"><img src="https://franknoirot.co/assets/img/carousel-arrow-left.svg"
          alt="Previous" /></button>
  <button @click="setSlide(nextSlideRight)"
          class="carousel__button carousel__button-right" name="Next Image"><img src="https://franknoirot.co/assets/img/carousel-arrow-right.svg"
          alt="Next"/></button>
  <div class="carousel__nav">
    <button v-for="(img, i) in images" class="carousel__indicator" :key="i"
        :class="(i == 0) ? 'active' : ''"
        @click="setSlide(i)"></button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    images: Array
  },
  data() {
    return {
      currSlide: 0,
      lightboxActive: false,
    }
  },
  watch: {
    images: function(newImgs, oldImgs) {
      console.log('IMAGES HAVE CHANGED')
      this.currSlide = 0
      this.lightboxActive = false
      this.setSlide(this.currSlide)
    }
  },
  computed: {
    slideWidth: function() {
      return this.$el.querySelector('.carousel__item').getBoundingClientRect().width
    },
    nextSlideLeft: function() {
      return (this.currSlide > 0) ? this.currSlide - 1 : this.images.length - 1
    },
    nextSlideRight: function() {
      return (this.currSlide < this.images.length - 1) ? this.currSlide + 1 : 0
    },
    imagesDOM: function() {
      return [].slice.call(this.$el.querySelectorAll('.carousel__slide'))
    },
    navDOM: function() {
      return [].slice.call(this.$el.querySelectorAll('.carousel__indicator'))
    },
    carouselTrack: function() {
      return this.$el.querySelector('.carousel__track')
    },
    currSlideDOM: function() {
      return this.imagesDOM[this.currSlide]
    },
    currNavDOM: function() {
      return this.navDOM[this.currSlide]
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('IMAGESDOM = ', this.imagesDOM)
      this.imagesDOM.forEach((img, i) => {
        console.log('hihihihihihihihih', img, i)
        img.style.left = this.slideWidth * i
      })
    })
  },
  methods: {
    setSlide: function(val) {
      this.currSlideDOM.classList.remove('active')
      this.currNavDOM.classList.remove('active')
      this.currSlide = val
      this.carouselTrack.style.transform = `translate(-${ this.currSlide * this.slideWidth }px)`
      this.currSlideDOM.classList.add('active')
      this.currNavDOM.classList.add('active')
    },
    toggleLightbox: function() {
      this.lightboxActive = !this.lightboxActive
    }
  }
}
</script>

<style scoped>
  .carousel {
    top: 0;
    position: relative;
    margin: 0 auto;
    height: 40vh;
    width: 100%;
    counter-reset: slide-count;
    grid-column: 2 / 3;
    transform: scale(1);
    transition: transform .09s ease-in-out;
  }

  .carousel:hover,
  .carousel:focus-within {
    transform: scale(1.02);
  }

  .carousel__item {
      height: 100%;
      width: 100%;
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
    .carousel {
      grid-column: auto;
      grid-row: 2 / 3;
    }
  }
</style>