<template>
  <svg class="hamburger" viewBox="0 0 10 10">
    <path d="M 1 1, l 8 0"></path>
    <path d="M 1 5, l 8 0"></path>
    <path d="M 1 5, l 8 0"></path>
    <path d="M 1 9, l 8 0"></path>
  </svg>
</template>

<script>
export default {
  methods: {
    burgerClick(el, burger) {
      if (burger === el || !el.parentElement) {
        el.classList.toggle('open')
        return
      }
      else return burgerClick(el.parentElement, burger)
    }
  }
}
</script>

<style scoped>
  svg.hamburger {
    width: 3vh;
    height: 3vh;
  }

  svg.hamburger path {
    stroke: #000b0b;
    stroke-width: 1;
    transition: d .13s ease-in-out, stroke-width .09s ease-in-out;
    stroke-linecap: round;
  }

  svg.hamburger.open path:nth-child(1),
  svg.hamburger.open path:nth-child(4)
  {
    stroke-width: 0;
  }

  svg.hamburger.open path:nth-child(2)
  {
    d: path("M 1 1, l 9 9");
  }

  svg.hamburger.open path:nth-child(3)
  {
    d: path("M 1 9, L 9 1");
  }
</style>