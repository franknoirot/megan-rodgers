<template>
  <Layout>
    <div class="container">    
      <div class="project__info">
        <h1 class="project__title">{{$page.project.title}}</h1>
        <p class="project__desc" v-html="$page.project.content"></p>
        <nav class="project__processes">
          <button v-for="(step, i) in $page.project.processSteps"
                  v-bind:key="i"
                  :id="'process-btn_' + i"
                  class="btn__process" :class="(i == 0) ? 'active' : ''"
                  @click="updateCarousel(i)">
                  {{ step.name }}
          </button>
        </nav>
      </div>
      <Carousel v-bind:images="currentCarousel.images" />
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

<script>
import Carousel from "../components/Carousel.vue"

export default {
  metaInfo() {
   return {
     title: this.$page.project.title
   }
  },
  components: {
    Carousel
  },
  data: function() {
    return {
      currCarouselID: 0
    }
  },
  computed: {
    currentCarousel: function() {
      return this.$page.project.processSteps[this.currCarouselID]
    },
    currCarouselDOM: function() {
      return this.$el.querySelector(`#process-btn_${this.currCarouselID}`)
    }
  },
  methods: {
    updateCarousel(id) {
      this.currCarouselDOM.classList.remove('active')

      this.currCarouselID = id

      this.currCarouselDOM.classList.add('active')
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    max-width: 1440px;
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

  .btn__process {
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    position: relative;
    transition: color .13s ease-in-out;
    z-index: 10;
  }

  .btn__process::after {
    position: absolute;
    z-index: 9;
    content: '';
    width: 100%;
    bottom: 0;
    left: 0;
    height: .2vmin;
    background: var(--work-color);
    transition: height .13s ease-in-out;
    mix-blend-mode: color-dodge;
  }

  .btn__process.active {
    color: var(--bg);
  }

  .btn__process.active::after {
    height: 100%;
  }

  @media(orientation: portrait) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
</style>