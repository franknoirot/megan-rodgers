<template>
  <div class="layout">
    <Navbar v-if="navbar==='true'"></Navbar>
    <main :class="{navbar: (navbar==='true')}">
      <slot/>
    </main>
    <footer>
      Site by&nbsp;<a href="https://franknoirot.co" rel="noopener" target="_blank">Frank Noirot</a>
      <Bee />
    </footer>
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
  import Navbar from "~/components/Navbar.vue"
  import Bee from "~/components/Bee.vue"

  export default {
    components: {
      Navbar,
      Bee
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
  font-family: 'Playfair Display', serif;
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
  font-family: "Playfair Display", serif;
  font-weight: bold;
}

a {
  font-family: "Noto Sans", sans-serif;
  color: inherit;
}

p {
  line-height: 1.9;
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
  font-size: .65rem;
  z-index: 9;
}
@media(orientation: portrait) {
  main {
    padding: 15vh 5vw 8vh 5vw;
  }
  footer {
    bottom: unset;
    top: 2vh;
  }
}
@media (max-device-height: 400px) {
  main.navbar {
    padding: 15vh 5vw 0 5vw;
  }
}
@media (max-width: 450px), (max-height: 400px) {
  footer {
    display: none;
  }
}
</style>
