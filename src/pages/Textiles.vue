<template>
  <Layout>
    <h1>Textiles</h1>
    <section class="grid" itemscope itemtype="http://schema.org/ItemList">
      <div v-for="(img, i) in $page.data.imageGallery" :key="i" :id="'img-'+i" :class="{ collection_item: true, 'is-vertical':img.isVert }"
        @click="() => openLightbox(i)">
        <div class='img-wrap'>
          <g-image :src="img.src" />
        </div>
      </div>
    </section>
    <div id="lightbox" :class="{ active: isLightboxOpen }" @click.self="() => isLightboxOpen = false">
      <img :src="currLightbox.src" tabindex=0 @keydown.left="() => moveImg(-1)" @keydown.right="() => moveImg(1)"
        @click="handleStageClick" @touchstart="imgTouchStart" @touchend="imgTouchEnd">
      <button class="arrow left" v-on:click="() => moveImg(-1)" tabindex=-1 title="Go to previous image">
        <svg viewBox="0 0 20 10">
          <path d="M 20 5, l -20 0, m 0 0, l 5 5, m -5 -5, l 5 -5"></path>
        </svg>
      </button>
      <button class="arrow right" v-on:click="() => moveImg(1)" tabindex=-1 title="Go to next image">
        <svg viewBox="0 0 20 10">
          <path d="M 0 5, l 20 0, m 0 0, l -5 5, m 5 -5, l -5 -5"></path>
        </svg>
      </button>
      <h2 class="lightbox_heading">{{ currLightbox.collection }}</h2>
      <p class="lightbox_caption">{{ currLightbox.caption }}</p>
      <div class="dots">
        <button v-for="(img, i) in $page.data.imageGallery" :key="i"
          class="dot" :class="{ active: i === lightboxIndex }" v-on:click="() => setImg(i)"
          :id="'dot-'+i"
          :title="dotTitle(i)"></button>
      </div>
      <button class="close" @click="() => isLightboxOpen = false">
        <svg viewBox="0 0 5 5">
          <path stroke="white" stroke-width=".5" stroke-linecap="round"
          d="M 1 1 l 3 3 m -3 0 l 3 -3"/>
        </svg>
      </button>
    </div>
  </Layout>
</template>

<page-query>
  query LookbookPage {
    data: netlifyPage(path: "/netlify-textiles") {
      title
      imageGallery {
        src
        isVert
        collection
        caption
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Textiles',
    meta: [
     { name: 'description', content: 'The textile examples of Megan Rodgers, Kent State University MFA.' }
    ]
  },
  data() {
    return {
      isLightboxOpen: false,
      lightboxIndex: 0,
      drag: {
        start: 0,
        end: 0,
      },
    }
  },
  computed: {
    lightbox() {
      return this.$el.querySelector('#lightbox')
    },
    currLightbox() {
      return this.$page.data.imageGallery[this.lightboxIndex]
    },
    dots() {
      return this.$el.querySelectorAll('.dot')
    },
  },
  methods: {
    openLightbox(index) {
      this.lightboxIndex = index
      this.isLightboxOpen = true
    },
    moveImg(i) {
      if (this.lightboxIndex + i > this.$page.data.imageGallery.length - 1) {
        this.lightboxIndex = 0
      } else if (this.lightboxIndex + i < 0) {
        this.lightboxIndex = this.$page.data.imageGallery.length - 1
      } else {
        this.lightboxIndex += i
      }
    },
    setImg(i) {
      this.lightboxIndex = i
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
    dotTitle(i) {
      return `Go to image ${i}`
    },
  }
}
</script>

<style scoped>
  h1 {
    margin: 1em 0 0 5vw;
    border-bottom: solid 2px;
    width: 70%;
  }


  .grid {
    margin: 3vh 0;
    max-width: 100%;
    overflow-y: auto;
    padding: 2vh 5vw 10vh;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 20vh;
    grid-auto-rows: 20vh;
    grid-auto-flow: dense;
    grid-gap: 3vmin;
    position: relative;
    user-select: none;
  }
  .scroll-grad {
    content: '';
    position: fixed;
    bottom: 7.75vh;
    height: 7vh;
    width: 100%;
    background: linear-gradient(to bottom, transparent, var(--bg));
    pointer-events: none;
  }

  .collection_item {
    grid-column: span 1;
    grid-row: span 1;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    position: relative;
    object-fit: cover;
    transition: transform .08s ease-in-out;
  }

  .collection_item.is-vertical {
    grid-row: span 2;
  }
  .collection_item:hover,
  .collection_item:focus {
    transform: scale(1.04);
    outline: none;
  }

  .collection_item .img-wrap {
    border-radius: 1vmax;
    box-shadow: var(--shadows);
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .img-wrap img {
    max-width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .is-vertical img {
    max-height: 100%;
  }

  /* LIGHTBOX */
  #lightbox {
    display: none;
    color: white;
    user-select: none;
  }

  #lightbox.active {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 10vh 5vw;
    background: radial-gradient(circle at center, rgba(0,0,0,0.4), rgba(0,0,0,0.8));
    display: grid;
    grid-template-columns: 5vw 1fr 5vw;
    grid-template-rows: 1fr auto auto 2vh;
    z-index: 9;
  }

  #lightbox img {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    align-self: center;
    justify-self: center;
    object-fit: contain;
    max-width: 80%;
    max-height: 60vh;
  }
  .arrow.left {
    grid-column: 1 / 2;
  }
  .arrow.right {
    grid-column: 3 / 4;
  }
  .arrow {
    grid-row: 1 / 2;
    background: transparent;
    border: none;
  }
  .arrow:hover {
    transform: scale(1.05);
  }
  .arrow:focus-within {
    outline: none;
    /* I don't need the outline because the arrows are not tabindexed.
       I removed these from the screenreader experience because there are three
       other, faster ways to navigate through the images (left/right arrows with
       stage focused, tabs, and individual image buttons) that these arrows are
       simply not useful. */
    animation: dip .2s ease-in-out forwards;
  }

  @keyframes dip {
    0% {
      transform: scale(1.05) translate(0, 0);
    }
    50% {
      transform: scale(1, .95) translate(0, .2em);
    }
    100% {
      transform: scale(1.05) translate(0, 0);
    }
  }

  .arrow svg {
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: visible;
  }

  .arrow path {
    stroke: white;
    stroke-width: 1.5;
    fill: none;
    stroke-linecap: round;
  }

  .lightbox_heading {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  .lightbox_caption {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
  }

  .dots {
    grid-row: 4 / 5;
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
    border: solid 1px white;
    --init-trans: translate(-50%, -50%);
    transform: var(--init-trans) scale(1);
    transition: transform .13s ease-in-out;
  }
  .dot:hover::after {
    transform: var(--init-trans) scale(1.6);
  }
  .dot.active::after {
    transform: var(--init-trans) scale(2);
    background: white;
  }

  .close {
    background: transparent;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    position: fixed;
    top: 5vh;
    right: 5vw;
  }

  @media(max-width:960px) {
    h1 {
      margin-top: 0;
    }
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .scroll-grad {
      display: none;
    }
  }

  @media (max-width: 450px) {
    .grid {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 30vh;
    }

    .arrow {
      display: none;
    }

    #lightbox.active {
      grid-template-columns: 1fr;
    }

    #lightbox img, .dots,
    .lightbox_heading, .lightbox_caption {
      grid-column: 1 / 2;
    }
  }
</style>
