<template>
  <Layout>
    <article class="grid" :style="cssProps">    
      <section class='heading'>
        <h1>{{$page.project.title}}</h1>
        <p class="season">{{ $page.project.season }}</p>
      </section>
      <div class="carousel"></div>
      <section class="body" v-html="$page.project.content"></section>
    </article>
  </Layout>
</template>

<page-query>
 query Project ($path: String!) {
   project: project (path: $path) {
      title
      season
      content
      color {
        r
        g
        b
      }
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
      currCarouselID: 0,
      currImg: 0
    }
  },
  computed: {
    primaryRGB: function() {
      return {
        r: this.$page.project.color[0].r,
        g: this.$page.project.color[1].g,
        b: this.$page.project.color[2].b
      }
    },
    cssProps: function() {
      return {
        '--primary-rgb': this.primaryRGB.r+","+this.primaryRGB.g+","+this.primaryRGB.b
      }
    },
    currentStep: function() {
      return this.$page.project.processSteps[this.currCarouselID]
    },
    currCarouselDOM: function() {
      return this.$el.querySelector(`#process-btn_${this.currCarouselID}`)
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .grid {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr 70%;
    grid-template-rows: auto 1fr;
    grid-column-gap: 3vw;
    padding: 3vh 5vw;
    box-sizing: border-box;
  }

  .heading {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    align-items: center;
    margin: 2vh 0;
  }

  h1 {
    font-size: calc(1.25em + 5vmin);
    margin: 0;
    color: rgb(var(--primary-rgb));
  }

  .season {
    font-family: 'Overpass Mono', monospace;
    margin: 0;
    color: rgb(var(--primary-rgb));
  }

  .body {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .carousel {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    align-self: stretch;
    justify-self: stretch;
    background: rgb(var(--primary-rgb));
  }
</style>