<template>
  <Layout>
    <section class="featured-projects">
      <h2>Index</h2>
    </section>
    
    <p class="site-motto drop-cap">Edgy genderfluid design aesthetic with a focus on functionality, sustainability and comfort.</p>
  </Layout>
</template>


<script>
export default {
  metaInfo: {
    title: 'Home'
  },
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

.featured-projects:hover .project,
.featured-projects:focus-within .project {
  transition: all .12s ease-in-out;
  /* remove transition delay when focus is already within the projects area */
}

.featured-projects > .project:nth-child(1) { --nth-child: 1; }
.featured-projects > .project:nth-child(2) { --nth-child: 2; }
.featured-projects > .project:nth-child(3) { --nth-child: 3; }

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
