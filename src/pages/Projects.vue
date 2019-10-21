<template>
  <Layout>
    <h1>Projects</h1>
    <div class="grid">
      <a class='project_item'
      v-for="(proj, i) in $page.allProjects.edges" :key="i"
        :href="proj.node.path">
        <h2>{{proj.node.title}}</h2>
        <span>{{ proj.node.season }}</span>
        <div class='img-wrap'>
          <img :src="proj.node.featuredImage">
        </div>
      </a>
    </div>
  </Layout>
</template>

<page-query>
 query ProjectConnection {
  allProjects: allProject {
    edges {
      node {
        path
        title
        season
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

<style scoped>
  h1 {
    margin: 1em 0 0 5vw;
    border-bottom: solid 2px;
    width: 70%;
  }


  .grid {
    box-sizing: border-box;
    width: 100%;
    height: 80vh;
    padding: 2vh 5vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10vmin;
    justify-content: stretch;
    align-items: stretch;
  }

  .project_item {
    width: 100%;
    height: 50vh;
    display: grid;
    grid-template-columns: 2vw 1fr;
    grid-template-rows: 1fr 2rem;
    position: relative;
    text-decoration: none;
    transition: transform .08s ease-in-out;
  }
  .project_item:hover,
  .project_item:focus {
    transform: scale(1.03);
  }

  .project_item h2 {
    margin: 0;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    justify-self: flex-start;
    margin-top: 1vh;
    margin-left: 2vw;
    font-size: calc(1.25em + 1.25vh);
  }

  .project_item > span {
    text-align: right;
    transform-origin: bottom right;
    position: absolute;
    top: 0;
    left: 0;
    width: max-content;
    height: fit-content;
    transform: rotate(-90deg) translate(1vh, -3vw);
  }

  .project_item .img-wrap {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    border-radius: 1vmax;
    box-shadow: var(--shadows);
    overflow: hidden;
  }

  .img-wrap img {
    max-height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>
