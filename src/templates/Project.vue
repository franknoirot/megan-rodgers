<template>
  <Layout>
    <h1>{{ $page.project.title }}</h1>
    <g-image :src="$page.project.featuredImage" />
    <div v-html="$page.project.content" />
  </Layout>
</template>

<page-query>
 query Project ($path: String!) {
   project: project (path: $path) {
     title
     featuredImage (width: 720, quality: 90)
     content
   }
 }
</page-query>

<script>
export default {
  metaInfo() {
   return {
     title: this.$page.project.title
   }
 }
}
</script>

<style>

</style>