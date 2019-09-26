<template>
  <Layout>
    <h1>Projects</h1>
    <a class='project_item'
    v-for="(proj, i) in $page.allProjects.edges" :key="i"
      :href="proj.node.path">
      <h3>{{proj.node.title}}</h3>
      <img :src="proj.node.featuredImage">
    </a>
  </Layout>
</template>

<page-query>
 query ProjectConnection {
  allProjects: allProject {
    edges {
      node {
        path
        title
        featuredImage
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Projects'
  }
}
</script>

<style>
  .project_item {
    display: block;
    width: 70vw;
    position: relative;
    height: max-content;
  }

  .project_item img {
    max-width: 100%;
    max-height: 30vh;
    object-fit: contain;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }
</style>
