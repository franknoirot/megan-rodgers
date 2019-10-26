<template>
  <Layout>
    <article class="grid" :style="cssProps">    
      <section class='heading'>
        <h1>{{$page.project.title}}</h1>
        <p class="season">{{ $page.project.season }}</p>
      </section>
      <div class="carousel">
        <div class='stage' tabindex=0 @click="handleStageClick"
        @keydown.left="() => moveImg(-1)" @keydown.right="() => moveImg(1)"
        @touchstart="imgTouchStart" @touchend="imgTouchEnd">
          <g-image :src="images[currImg].img"></g-image>
        </div>
        <button class="arrow left" v-on:click="() => moveImg(-1)" tabindex=-1></button>
        <button class="arrow right" v-on:click="() => moveImg(1)" tabindex=-1></button>
        <div class="tabs">
          <button class="step" v-for="(step, j) in processSteps" :key="j"
            v-on:click="() => activateStep(j)"
            :class="{ 
              active: (currStep === j) ? true: false,
              }" >
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
      featuredImage
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
     title: this.$page.project.title,
   }
  },
  components: {
    Carousel
  },
  data: function() {
    return {
      currStep: 0,
      currImg: 0,
      drag: {
        start: 0,
        end: 0,
      }
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
      return this.$page.project.color
    },
    cssProps: function() {
      return {
        '--primary-rgb': this.primaryRGB.r+","+this.primaryRGB.g+","+this.primaryRGB.b
      }
    },
    mobileTabs() {
      let tabs = []
      let stp = this.processSteps
      if (this.currStep == 0) {
        tabs = [stp[stp.length-1], ...stp.slice(0, 2)]
      } else if (this.currStep === stp.length-1) {
        tabs = [...stp.slice(-2), stp[0]]
      }
      else {
        tabs = stp.slice(this.currStep-1, this.currStep+2)
      }
      return tabs
    }
  },
  methods: {
    activateStep(step) {
      this.currStep = step
      this.currImg = this.images.map(img => img.step).indexOf(this.processSteps[this.currStep].toLowerCase())
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
    },
    handleStageClick(e, isTouch=false) {
      let rect = e.target.getBoundingClientRect()
      if (isTouch) {
        if (e.changedTouches[0].clientX > rect.width / 2) this.moveImg(1)
        else this.moveImg(-1)
      } else {
        if (e.offsetX > rect.width / 2) this.moveImg(1)
        else this.moveImg(-1)
      }
    },
    imgTouchStart(e) {
      this.drag.start = e.touches[0].screenX
      this.drag.end = e.touches[0].screenX
    },
    imgTouchEnd(e) {
      e.preventDefault()
      this.drag.end = e.changedTouches[0].screenX
      if (Math.abs(this.drag.end - this.drag.start) > 10) {
        if (this.drag.end - this.drag.start < 0) this.moveImg(1)
        else this.moveImg(-1)
      } else {
        this.handleStageClick(e, true)
      }
    },
    isActiveMobileTab(t) {
      return this.mobileTabs.indexOf(t) > 0
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
    padding: 3vh 0 0 0;
    box-sizing: border-box;
  }

  .heading {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
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
    grid-row: 1 / 3;
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
    background: var(--bg);
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadows);
    max-height: 100%;
    user-select: none;
  }
  .stage, .stage img {
    border-radius: 3vmin;
  }
  .stage img {
    max-height: 100%;
    max-width: 100%;
    pointer-events: none;
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
  .arrow:focus {
    outline: none;
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
    background: var(--bg);
    box-shadow: 0 0 0 rgba(0,0,.9vmin,0.2),
                0 0 0 rgba(0,0,0.3vmin,0.1);
    border-radius: 0 0 2vmin 2vmin;
    width: 100%;
    justify-self: stretch;
    align-self: stretch;
    padding-top: 10vh;
    margin-top: -10vh;
    transition: all .11s ease-in-out;
  }
  .step:hover {
    box-shadow: var(--shadows);
  }
  .active {
    background: rgba(var(--primary-rgb), .6);
    color: var(--bg);
  }
  .dots {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    width: 100%;
    height: 100%;
    display: flex;
    align-self: center;
  }
  .dot {
    position: relative;
    padding: 0;
    background: transparent;
    border: none;
    align-self: stretch;
    justify-self: stretch;
    width: 100%;
    height: 100%;
  }
  .dot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: .75vmin;
    height: .75vmin;
    border-radius: 50%;
    border: solid 1px rgb(var(--primary-rgb));
    --init-trans: translate(-50%, -50%);
    transform: var(--init-trans) scale(1);
    transition: transform .13s ease-in-out;
  }
  .dot:hover::after {
    transform: var(--init-trans) scale(1.6);
  }
  .stepActive::after {
    transform: var(--init-trans) scale(2);
  }
  .imgActive::after {
    background: rgb(var(--primary-rgb));
  }

  *:focus {
    outline-color: rgba(var(--primary-rgb), 1);

  } 

  @media(orientation: portrait) {
    .grid {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding-bottom: 5vh;
      padding-top: 0;
    }
    .heading {
      margin-top: 0;
    }
    h1 {
      margin-top: 0;
    }
    .carousel {
      grid-template-columns: 1fr;
    }
    .stage {
      min-height: 35vh;
      max-width: 100%;
    }
    .stage,
    .tabs,
    .dots,
    .arrow {
      grid-column: 1;
    }
    .arrow {
      display: none;
    }
    .dot:not(.stepActive) {
      display: none;
    }
  }
</style>