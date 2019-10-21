<template>
  <Layout navbar=false>
    <div class="grid">
      <g-image class="main-logo" :src="$page.data.logo"></g-image>
      <nav>
        <g-link to="/about">About</g-link>
        <g-link to="/about">Projects</g-link>
        <a class="link_contact" href="mailto:frank@franknoirot.co">Contact</a>
      </nav>
    </div>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-home") {
      title
      featuredProject
      logo
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
  }
}
</script>

<style scoped>

  .grid {
    display: grid;
    flex-direction: unset;
    align-items: unset;
    justify-content: unset;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr 4fr;
  }

  .main-logo {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    align-self: flex-end;
    justify-self: flex-end;
  }

  nav {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    font-size: calc(1em + 1.2vmin);
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    width: max-content;
    margin-bottom: 22vmin;
    margin-left: 20vmin;
    padding: 2.5em 0;
    border-left: solid .3vmin;
  }

  nav a {
    text-decoration: none;
    margin: .75em 0;
    padding: .2em .8em;
    display: inline-block;
    width: fit-content;
  }

  a.link_contact {
    outline: solid var(--mauve) .2em;
    filter: drop-shadow(-4px 5px 3px rgba(0,0,0,0.2));
  }

  @media(orientation: portrait) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      align-self: flex-start;
      justify-self: flex-start;
      height: 100%;
      width: 100%;
    }

    .main-logo {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      max-height: 50vh;
      justify-self: center;
      align-self: center;
    }

    nav {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      border-left: none;
      border-right: solid .3vmin;
      padding: 1em 0;
      margin: 0;
      justify-self: center;
      align-items: flex-end;
      margin-left: -25vmin;
    }
  }
</style>
