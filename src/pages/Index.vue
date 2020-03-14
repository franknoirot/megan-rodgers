<template>
  <Layout navbar=false>
    <div class="grid">
      <g-image class="main-logo" :src="$page.data.logo" alt="Megan Rodgers logo: 'MR' centered in an incomplete circle, with greenery growing out of the circle's broken ends, and a bee and butterfly visiting each."></g-image>
      <nav>
        <g-link to="/about">About</g-link>
        <g-link to="/collections">Collections</g-link>
        <g-link to="/lookbook">Lookbook</g-link>
        <g-link to="/textiles">Textiles</g-link>
        <a class="link_contact" href="mailto:mrodge11@kent.edu"
          @mouseleave="setHover" @mouseenter="setHover" :style="hover">Contact</a>
      </nav>
      <g-link class='featured_collection' :to="featuredHref" :style="featuredStyle"
      itemscope itemtype="http://schema.org/CreativeWork">
        <g-image :src="featuredCollection.featuredImage.src" :alt="featuredCollection.featuredImage.alt"
          :title="featuredCollection.featuredImage.title" itemprop="mainEntity"></g-image>
        <p>
          featured collection: <span itemprop="name">{{ featuredCollection.title }}</span>
          <svg viewBox="0 0 20 10">
            <path d="M 0 5, l 20 0, m 0 0, l -2.5 2.5, m 2.5 -2.5, l -2.5 -2.5"></path>
          </svg>
        </p>
      </g-link>
    </div>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-home") {
      title
      featured: featuredCollection
      logo
    }
  }
</page-query>

<script>
import slugify from '../utils/slugify'

export default {
  metaInfo: {
    title: 'Home',
    meta: [
      { name: 'description', content: 'Fashion designs by Megan Rodgers, combining gender-neutral and sustainable practices into a punchy aesthetic.' }
    ]
  },
  data() {
    return {
      featuredCollection: {
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
  computed: {
    featuredHref() {
      return '/collections/'+slugify(this.$page.data.featured)
    },
    featuredStyle() {
      return { '--theme': this.featuredCollection.color.r+','+this.featuredCollection.color.g+','+this.featuredCollection.color.b }
    },
    isMobile() {
      return window.innerWidth < 450
    },
  },
  async mounted () {
    try {
      const results = await this.$fetch(this.featuredHref)
      this.featuredCollection = results.data.collection
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    setHover(e) {
      let rect = e.target.getBoundingClientRect()
      this.hover['--hov-x'] = (e.offsetX / rect.width *100).toFixed(1) + '%'
      this.hover['--hov-y'] = (e.offsetY / rect.height *100).toFixed(1) + '%'
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
    margin-bottom: 10vmin;
    margin-left: 20vmin;
    padding: 2.5em 0;
    border-left: solid .3vmin;
  }

  nav a {
    font-family: "Fredericka the Great", "Noto Sans", sans-serif;
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
  nav a:not(.link_contact):hover::after {
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

  .featured_collection {
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
  .featured_collection:hover {
    transform: translate(0, -.4vh) scale(1.03);
  }
  .featured_collection::after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(var(--theme), .6);
    transition: all .15s ease-in-out;
  }
  .featured_collection:hover::after {
    background: rgba(var(--theme), .3);
  }
  .featured_collection img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
  .featured_collection p {
    margin: 0;
    position: absolute;
    bottom: 1em;
    right: 20%;
    color: var(--bg);
    z-index: 5;
  }
  .featured_collection svg {
    display: inline-block;
    transform: translate(0, 12.5%);
    margin: 0 .5em;
    width: 2em;
    height: 1em;
  }
  .featured_collection path {
    stroke: var(--bg);
    stroke-linecap: round;
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
    nav a {
      margin: .3em 0;
    }

    .featured_collection {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      align-self: center;
      height: 80%;
      transform: translate(50%);
    }
    .featured_collection img {
      object-fit: cover;
      width: unset;
    }
    .featured_collection p {
      font-size: calc(.3em + .8vmax);
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
    .featured_collection svg {
      position: absolute;
      top: 3em;
      right: -1em;
      transform: rotate(90deg);
    }
  }

  @media (max-height: 400px) {
    .main-logo {
      align-self: flex-start;
    }
  }
</style>
