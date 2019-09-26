<template>
  <Layout>
    <div class="project__info">
      <h1 class="project__title">{{$page.project.title}}</h1>
      <p class="project__desc" v-html="$page.project.content"></p>
      <nav class="project__processes">
        <button v-for="(step, i) in $page.project.processSteps"
                v-bind:key="i"
                class="btn__process" :class="(i == 0) ? 'active' : ''"
                @click="updateCarousel(i)">
                {{ step.name }}
        </button>
      </nav>
    </div>
    <Carousel v-bind:images="currentCarousel.images" />
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
      console.log("UPDATING currentCarousel!")
      return this.$page.project.processSteps[this.currCarouselID]
    }
  },
  methods: {
    updateCarousel(id) {
      this.currCarouselID = id
      console.log("CLICKED! currCarouselID = ", this.currCarouselID)
    }
  }
}
</script>

<style>
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

  @media(orientation: portrait) {
    main {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
</style>