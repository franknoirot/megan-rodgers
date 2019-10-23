<template>
  <div class="layout">
    <Navbar v-if="navbar==='true'"></Navbar>
    <main>
      <slot/>
    </main>
    <footer>Site by <a href="https://franknoirot.co" rel="noopener" target="_blank">Frank Noirot</a></footer>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
  import Navbar from "../components/Navbar.vue"

  export default {
    components: {
      Navbar
    },
    props: {
      navbar: {
        type: String,
        default: 'true',
      }
    }
  }
</script>


<style>
:root {
  font-family: 'Open Sans', sans-serif;
  --bg: #FCFEFF;
  --color: #1E1E2F;
  --color-rgb: 30,30,47;
  --primary: #2874A6;
  --mauve: #A34F79;
  --primary-rgb: 40, 116, 166;
  --primary-hue: 204deg;
  --shadows: 0 .4vmin .6vmin rgba(var(--color-rgb), 0.2),
             0 1.2vmin 1.7vmin rgba(var(--color-rgb), 0.08);
  color: var(--color);
  --work-color: var(--primary);
}
h1,h2,h3,h4,h5,h6 {
  font-family: "DM Serif Display", serif;
}

a, code {
  font-family: "Overpass Mono", monospace;
}

a {
  color: inherit;
}

p {
  line-height: 1.5;
}

body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100vw;
}

main {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--bg);
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  margin: 0;
  padding: 8vh 5vw 5vh 5vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

footer {
  position: fixed;
  right: 3vw;
  bottom: 3vh;
  font-size: .75rem;
}

</style>
