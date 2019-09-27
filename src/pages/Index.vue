<template>
  <Layout>
    <section class="featured-projects">
      <featured-project v-for="(proj, index) in $page.data.featuredProjects"
       :key="index" :href="proj" :index="index" />
    </section>
    <p class="site-motto drop-cap">
      {{$page.data.tagline}}
    </p>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-home") {
      title
      featuredProjects
      tagline
    }
  }
</page-query>

<script>
import FeaturedProject from '../components/FeaturedProject.vue'

export default {
  metaInfo: {
    title: 'Home'
  },
  components: {
    FeaturedProject
  },
  data() {
    return {
      $
    }
  }
}
</script>

<style>
  .site-motto {
    z-index: 5;
    width: 70vmin;
    color: var(--color);
    font-size: calc(1.3em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21)));
    line-height: calc(1.3em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21))); 
    transition: all .12s ease-in-out;
  }

  .drop-cap::first-letter {
    color: var(--bg);
    margin: 0 .1em;
    margin-left: 0;
    padding: 0 calc(.4em + (1.5 - 1.1) * ((100vw - 21em)/(35 - 21)));
    background: var(--color);
    font-size: calc(2em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21)));
    border-radius: 0 0 3vw 0;
  }

  .featured-projects {
    --w: 94;
    --h: 70;
    width: calc(var(--w)* 1vw);
    height: calc(var(--h)*1vh);
    position: absolute;
    top: calc((100 - var(--h)) * .5vh);
    left: calc((100 - var(--w)) * .5vw);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .featured-projects:focus-within ~ .site-motto,
  .featured-projects:hover ~ .site-motto {
    filter: blur(3vmin);
    opacity: 0;
    pointer-events: none;
    transform: scale(1.2);
  }

  .featured-projects:hover .project,
  .featured-projects:focus-within .project {
    transition: all .12s ease-in-out;
    /* remove transition delay when focus is already within the projects area */
  }

  .featured-projects > .project:nth-child(1) { --nth-child: 1; }
  .featured-projects > .project:nth-child(2) { --nth-child: 2; }
  .featured-projects > .project:nth-child(3) { --nth-child: 3; }

  @media(orientation: portrait) {
    .featured-projects {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3,1fr);
    }
  }
</style>
