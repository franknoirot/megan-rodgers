<template>
  <span>{{ $static.project.title }}</span>
</template>

<script>
  export default {
    props: {
      href: String
    },
    computed: {
      path: function() {
        return '/projects/' + this.href
      }
    }
  }
</script>

<style>
</style>