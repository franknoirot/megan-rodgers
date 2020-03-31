<template>
  <Layout>
    <h1>Collections</h1>
    <div class="grid" itemscope itemtype="http://schema.org/ItemList">
      <a class='collection_item'
      v-for="(proj, i) in $page.allCollections.edges" :key="i"
      :href="proj.node.path" :style="{ '--theme': cssProps[i] }"
      itemprop="itemListElement" itemscope itemtype="http://schema.org/CreativeWork">
        <h2 itemprop="name">{{proj.node.title}}</h2>
        <span itemprop="dateCreated">{{ proj.node.season }}</span>
        <div class='img-wrap'>
          <img :src="proj.node.featuredImage.src" :alt="proj.node.featuredImage.alt"
               :title="proj.node.featuredImage.title" itemprop="mainEntity">
        </div>
      </a>
      <div class="scroll-grad"></div>
    </div>
  </Layout>
</template>

<page-query>
 query ProjectConnection {
  allCollections: allCollection(sortBy: "order", order: ASC) {
    edges {
      node {
        path
        title
        season
        color {
          r
          g
          b
        }
        featuredImage {
          src
          title
          alt
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Collections',
    meta: [
     { name: 'description', content: 'The fashion collections of Megan Rodgers, Kent State University MFA.' }
    ]
  },
  computed: {
    rgb() {
      return this.$page.allCollections.edges.map(proj => proj.node.color)
    },
    cssProps() {
      return this.rgb.map(color => `${color.r},${color.g},${color.b}`)
    }
  },
  methods: {
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
    box-sizing: border-box;
    width: 100%;
    overflow-y: auto;
    padding: 2vh 5vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10vmin;
    justify-content: stretch;
    align-items: stretch;
    position: relative;
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
    width: 100%;
    height: 50vh;
    display: grid;
    grid-template-columns: 2vw 1fr;
    grid-template-rows: 1fr 2rem;
    position: relative;
    text-decoration: none;
    transition: transform .08s ease-in-out;
  }
  .collection_item:hover,
  .collection_item:focus {
    transform: scale(1.04);
    outline: none;
  }
  .collection_item:last-of-type {
    margin-bottom: 10vh;
  }

  .collection_item h2 {
    color: rgb(var(--theme));
    margin: 0;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    justify-self: flex-start;
    margin-top: 1vh;
    margin-left: 2vw;
    font-size: calc(1.25em + 1.25vh);
  }

  .collection_item > span {
    color: rgb(var(--theme));
    text-align: right;
    transform-origin: bottom right;
    position: absolute;
    top: 0;
    right: 100%;
    width: max-content;
    height: fit-content;
    transform: rotate(-90deg) translate(1vh, 2vw);
  }

  .collection_item .img-wrap {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    border-radius: 1vmax;
    box-shadow: var(--shadows);
    overflow: hidden;
    position: relative;
  }
  .img-wrap::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(var(--theme), .3);
    transition: background-color .3s ease-in-out;
  }
  .img-wrap:hover::after {
    background-color: rgba(var(--theme), .1);
  }

  .img-wrap img {
    max-height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media(max-width:960px) {
    h1 {
      margin-top: 0;
    }
    .grid {
      grid-template-columns: 1fr 1fr;
    }
    .scroll-grad {
      display: none;
    }
  }

  @media (max-width: 450px) {
    .grid {
      display: flex;
      flex-direction: column;
    }
    .collection_item {
      grid-template-rows: 1fr auto;
      margin-bottom: 4vh;
    }
  }
</style>
