<template>
  <Layout>
    <article class="grid" :style="cssProps">    
      <section class='heading'>
        <h1>{{$page.project.title}}</h1>
        <p class="season">{{ $page.project.season }}</p>
      </section>
      <div class="carousel">
        <div class='stage'></div>
        <button class="arrow left" v-on:click="() => moveImg(-1)"></button>
        <button class="arrow right" v-on:click="() => moveImg(1)"></button>
        <div class="tabs">
          <button class="step" v-for="(step, j) in processSteps" :key="j"
            v-on:click="() => activateStep(j)"
            :class="{active: (currStep === j) ? true: false}" >
            {{ step }}
          </button>
        </div>
        <div class="dots">
            <button v-for="(image, i) in images" :key="i"
              class="dot" :class="{[image.step]: image.step,
              stepActive: (processSteps[currStep].toLowerCase() === image.step) ? true : false,
              imgActive: (currImg === i) ? true : false}"
              :data-to="image.img" v-on:click="() => setImg(i)"></button>
          </div>
        </div>
      </div>
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
      currStep: 0,
      currImg: 0
    }
  },
  computed: {
    processSteps() {
      return this.$page.project.processSteps.map(step => step.name)
    },
    images() {
      let flatten = function(a, shallow, r){
        if(!r){ r = []}
          
        if (shallow) {
        return r.concat.apply(r,a);
        }
          console.log(a, r)
          for(var i=0; i<a.length; i++){
              if(a[i].constructor == Array){
                  flatten(a[i],shallow,r);
              }else{
                  r.push(a[i]);
              }
          }
          return r;
        }

      return flatten(this.$page.project.processSteps.map(step => 
        step.images.map(img => {
          return {
            img,
            step: step.name.toLowerCase()
          }
        }
      )), false)
    },
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
  },
  methods: {
    activateStep(step) {
      this.currStep = step
    },
    moveImg(n) {
      if (this.currImg + n >= this.images.length) {
        this.currImg = 0
      } else if (this.currImg + n < 0) {
        this.currImg = this.images.length - 1
      } else {
        this.currImg += n
      }
      this.currStep = this.processSteps.map(step => step.toLowerCase()).indexOf(this.images[this.currImg].step)
    },
    setImg(n) {
      this.currImg = n
      this.currStep = this.processSteps.map(step => step.toLowerCase()).indexOf(this.images[this.currImg].step)
    }
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
    display: grid;
    grid-template-columns: 5vw 1fr 5vw;
    grid-template-rows: 1fr 5vh 5vh;
  }
  .stage {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    align-self: stretch;
    justify-self: stretch;
    border-radius: 3vmin;
    background: linear-gradient(to bottom, var(--bg), white);
    box-shadow: var(--shadows);
    z-index: 5;
  }
  .arrow {
    grid-row: 1 / 2;
    width: 50%;
    --thick: .5vmin;
    align-self: center;
    justify-self: center;
    border: none;
    position: relative;
    transform: scale(1);
    transition: transform .13s ease-in-out;
  }
  .arrow:hover {
    transform: scale(1.05);
  }
  .arrow, .arrow::before, .arrow::after {
    height: var(--thick);
    background: rgb(var(--primary-rgb));
    border-radius: calc(.5 * var(--thick));
  }
  .arrow::before, .arrow::after {
    content: '';
    position: absolute;
    width: 40%;
    top: 50%;
    left: 0;
    transform-origin: center left;
  }
  .arrow::before {
    transform: translate(0, -50%) rotate(-45deg) translate(0, calc(.25 * var(--thick)));
  }
  .arrow::after {
    transform: translate(0, -50%) rotate(45deg) translate(0, calc(-.25 * var(--thick)));
  }
  .right::after, .right::before {
    left: initial;
    right: 0;
    transform-origin: center right;
  }
  .right::before {
    transform: translate(0, -50%) rotate(-45deg) translate(0, calc(-.25 * var(--thick)));
  }
  .right::after {
    transform: translate(0, -50%) rotate(45deg) translate(0, calc(.25 * var(--thick)));
  }
  .tabs {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .step {
    color: rgb(var(--primary-rgb));
    justify-self: stretch;
    border: none;
    background: transparent;
    border-radius: 0 0 2vmin 2vmin;
    width: 100%;
    justify-self: stretch;
    align-self: stretch;
    padding-top: 10vh;
    margin-top: -10vh;
  }
  .active {
    background: rgba(var(--primary-rgb), .6);
    color: var(--bg);
  }
  .dots {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-self: center;
  }
  .dot {
    width: .75vmin;
    height: .75vmin;
    padding: 0;
    background: transparent;
    border-radius: 50%;
    margin: 1vmin auto;
    border: solid 1px rgb(var(--primary-rgb));
    transform: scale(1);
    transition: transform .13s ease-in-out;
  }
  .stepActive {
    transform: scale(2);
  }
  .imgActive {
    background: rgb(var(--primary-rgb));
  }
</style>