<template>
  <div id="app">
    <router-view />
    <footer>
      Site by <a href="https://franknoirot.co" rel="noopener" target="_blank">Frank Noirot</a>
      <Bee />
    </footer>
  </div>
</template>

<script>
import Bee from '~/components/Bee.vue'

export default {
  components: {
    Bee
  }
}
</script>

<style>

</style>