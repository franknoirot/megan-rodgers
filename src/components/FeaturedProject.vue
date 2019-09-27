<template>
  <g-link :to="path" :id="id" class="project">
    <g-image :src="imgSrc"/>
  </g-link>
</template>

<script>
  export default {
    props: {
      href: String,
      index: Number
    },
    computed: {
      path: function() {
        return '/projects/' + this.href
      },
      imgSrc: function() {
        return `/uploads/${this.href}-1.jpg`
      },
      id: function() {
        return 'project-'+this.index
      }
    }
  }
</script>

<style>
  .project {
    --bg-sat: calc(100% - (var(--nth-child) - 1) * 33%);
    --bg-light: calc(90% - (var(--nth-child) - 1) * 25%);
    background: hsla(var(--primary-hue), var(--bg-sat), var(--bg-light), .2);
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    transform: scale(1);
    filter: blur(.5vmin);
    transition: all .12s .06s ease-in-out;
  }

  .project:hover,
  .project:focus {
    transform: scale(1.04);
    outline: none;
    filter: none;
    z-index: 2;
  }

  .project img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    max-height: 100%;
    filter: grayscale(1);
    opacity: .2;
    transition: all .12s ease-in-out;
  }

  .project:hover img,
  .project:focus img {
    opacity: 1;
    filter: none;
  }
</style>