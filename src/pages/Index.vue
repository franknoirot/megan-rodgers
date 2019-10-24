<template>
  <Layout navbar=false>
    <div class="grid">
      <g-image class="main-logo" :src="$page.data.logo"></g-image>
      <nav>
        <g-link to="/about">About</g-link>
        <g-link to="/projects">Projects</g-link>
        <a class="link_contact" href="mailto:frank@franknoirot.co"
          @mouseleave="setHover" @mouseenter="setHover" :style="hover">Contact</a>
      </nav>
      <g-link class='featured_project' :to="featuredHref" :style="featuredStyle">
        <g-image :src="featuredProject.featuredImage"></g-image>
        <span >featured project:{{ (isMobile) ? ' '+featuredProject.title : '' }}</span>
      </g-link>
    </div>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-home") {
      title
      featured: featuredProject
      logo
    }
  }
</page-query>

<script>
import FeaturedProject from '../components/FeaturedProject.vue'

export default {
  data() {
    return {
      featuredProject: {
        title: '',
        featuredImage: '',
        color: {
          r: 0,
          g: 0,
          b: 0
        }
      },
      hover: {
        '--hov-x': '70%',
        '--hov-y': '80%',
      }
    }
  },
  metaInfo: {
    title: 'Home'
  },
  components: {
    FeaturedProject
  },
  computed: {
    featuredHref() {
      return '/projects/'+this.$page.data.featured
    },
    featuredStyle() {
      return { '--theme': this.featuredProject.color.r+','+this.featuredProject.color.g+','+this.featuredProject.color.b }
    },
    isMobile() {
      return window.innerWidth < 450
    },
  },
  async mounted () {
    try {
      const results = await this.$fetch(this.featuredHref)
      this.featuredProject = results.data.project
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    setHover(e) {
      console.log('hovering, it = ', this.hover)
      let rect = e.target.getBoundingClientRect()
      this.hover['--hov-x'] = (e.offsetX / rect.width *100).toFixed(1) + '%'
      this.hover['--hov-y'] = (e.offsetY / rect.height *100).toFixed(1) + '%'
      console.log('finished hovering, it = ', this.hover)
    },
  }
}
</script>

<style scoped>
  .grid {
    height: 100%;
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
    position: relative;
  }
  nav a:not(.link_contact)::after {
    content: '';
    position: absolute;
    top: calc(100% + .1em);
    left: -.2vmin;
    width: 0;
    height: .3vmin;
    background: black;
    transition: width .11s ease-in-out;
  }
  nav a:hover::after {
    width: calc(100% + .4vmin);
  }
  a.link_contact {
    outline: solid var(--mauve) .2em;
    filter: drop-shadow(-4px 5px 3px rgba(0,0,0,0.2));
    color: inherit;
    transition: all .11s ease-in-out;
    position: relative;
  }
  a.link_contact::before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: hsl(330deg, 55%, 30%);
    background-image: radial-gradient(circle at 30% 50%, transparent 20%, var(--mauve) 110%),
                      linear-gradient(-36deg, hsla(46deg, 90%, 70%, 0.7), hsla(260deg, 80%, 30%, 1));
    z-index: -1;
    clip-path: circle(0% at var(--hov-x) var(--hov-y));
    transition: clip-path .13s ease-in-out;
  }
  a.link_contact:hover {
    color: var(--bg);
  }
  a.link_contact:hover::before {
    clip-path: circle(200% at var(--hov-x) var(--hov-y));
  }

  .featured_project {
    display: inline-block;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    height: 100%;
    width: 100%;
    align-self: flex-end;
    justify-self: flex-start;
    position: relative;
    overflow: hidden;
    border-radius: 3vmin;
    box-shadow: var(--shadow);
    transform: translate(0, 0) scale(1);
    transition: all .12s ease-in-out;
  }
  .featured_project:hover {
    transform: translate(0, -.4vh) scale(1.03);
  }
  .featured_project::after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(var(--theme), .6);
    transition: all .15s ease-in-out;
  }
  .featured_project:hover::after {
    background: rgba(var(--theme), .3);
  }
  .featured_project img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
  .featured_project span {
    position: absolute;
    bottom: 1em;
    right: 20%;
    color: var(--bg);
    z-index: 5;
  }
  .featured_project span::before,
  .featured_project span::after {
    position: absolute;
    content: '';
    background: var(--bg);
  }
  .featured_project span::before {
    width: 25%;
    height: .1vmax;
    top: 40%;
    left: calc(100% + 1vmax);
    transform: translate(0, -50%);
  }
  .featured_project span::after {
    width: .5vmax;
    height: .5vmax;
    clip-path: polygon(0 0, 100% 0, 0 100%);
    left: calc(125% + .5vmax);
    top: 50%;
    transform: translate(0, -72%) rotate(135deg);
  }

  @media(orientation: portrait) {
    .grid {
      grid-template-columns: 50% 50%;
      grid-template-rows: 50% 50%;
      grid-gap: 2vmax;
      height: 100%;
      width: 100%;
    }

    .main-logo {
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      max-height: 50vh;
      justify-self: center;
      align-self: flex-end;
    }

    nav {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      border-left: none;
      border-right: solid .3vmin;
      padding: 1em 0;
      margin: 0;
      margin-right: 5vw;
      justify-self: flex-end;
      align-self: center;
      align-items: flex-end;
    }

    .featured_project {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      align-self: center;
      height: 80%;
      transform: translate(50%);
    }
    .featured_project img {
      object-fit: cover;
      width: unset;
    }
    .featured_project span {
      font-size: calc(.5em + 1vmax);
      width: fit-content;
      height: fit-content;
      left: unset;
      right: calc(95% - .5em - 1vmax);
      transform-origin: bottom right;
      top: 0;
      transform: rotate(-90deg);
      opacity: .9;
      text-align: right;
    }
    .featured_project span::before,
    .featured_project span::after {
      display: none;
    }
  }
</style>
