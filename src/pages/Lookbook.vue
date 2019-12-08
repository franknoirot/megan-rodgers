<template>
  <Layout>
    <h1>Lookbook</h1>
    <section class="grid" itemscope itemtype="http://schema.org/ItemList">
      <div v-for="(img, i) in $page.data.imageGallery" :key="i" :id="'img-'+i" :class="{ collection_item: true, 'is-vertical':img.isVert }" >
        <div class='img-wrap'>
          <g-image :src="img.src" />
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-lookbook") {
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
    title: 'Lookbook',
    meta: [
     { name: 'description', content: 'The fashion collections of Megan Rodgers, Kent State University MFA.' }
    ]
  },
  computed: {
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
      display: flex;
      flex-direction: column;
    }
    .collection_item {
      grid-template-rows: 1fr auto;
      margin-bottom: 4vh;
    }
  }
</style>
