<template>
  <Layout>
    <h1>{{ $page.data.title }}</h1>
    <div class="content" v-html="$page.data.content"></div>
    <div class="img-grid">
      <g-image v-for="(img, i) in $page.data.images" :key="i"
     :src="img"  />
    </div>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-about") {
      title
      content
      images
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About'
  }
}
</script>

<style scoped>
  .img-grid {
    max-width: 100vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .img-grid img {
    object-fit: scale-down;
    max-width: 100%;
  }
</style>
