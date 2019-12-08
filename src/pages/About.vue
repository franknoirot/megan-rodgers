<template>
  <Layout>
    <div class='grid'>
      <g-image v-for="(img, i) in $page.data.images" :key="i" :id="'img-'+i" :src="img"  />
      <div id='color-bar-1' class='color-bar'></div>
      <section>
        <h1>{{ $page.data.title }}</h1>
        <div class="content" v-html="$page.data.content"></div>
        <a class="resume-download" :href='$page.data.resume' download>Download Resumé</a>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query NetlifyPage {
    data: netlifyPage(path: "/netlify-about") {
      title
      content
      images
      resume
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About',
    meta: [
      { name: 'description', content: 'Megan Rodgers is an award-winning Fashion Designer studying for her MFA at Kent State University.' },
      { property: "og:type", content:"article" },
      { property: "og:title", content: "About | Megan Rodgers" },
      { property: "og:description", content: `Megan Rodgers is an award-winning fashion designer studying at Kent State University for her MFA.` },
    ]
  }
}
</script>

<style scoped>
  .grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 35vw 1fr;
    grid-template-rows: 35vh 1fr;
    box-sizing: border-box;
    padding: 0 5vw;
    overflow-y: auto;
    overflow-x: hidden;

  }
  
  section {
    grid-row: 2 / 3;
    width: fit-content;
    max-height: 100%;
  }

  h1 {
    color: var(--mauve);
    font-size: calc(1.5em + 2vh);
    margin: 1.5vw 0;
  }

  p {
    line-height: 2;
  }
  .content {
    margin-block-end: 1.5vw;
  }

  .resume-download {
    display: inline-block;
    width: fit-content;
    height: fit-content;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    align-self: center;
    font-size: calc(.75em + 1vh);
    text-decoration: none;
    padding: .4em 1.2em;
    border-radius: .25em;
    background: var(--mauve);
    color: white;
    box-shadow: var(--shadows);
    transform: scale(1);
    transition: transform .08s ease-in-out;
  }
  .resume-download:hover {
    transform: scale(1.04);
  }

  img.g-image, .color-bar {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: var(--shadows);
    overflow: hidden;
    position: relative;
  }

  img.g-image::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99;
  }

  #img-0 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 23vmax;
    max-height: 50vh;
    margin-top: 10vh;
    margin-left: 12vw;
    z-index: 10;
  }
  #img-1 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    width: 38vmax;
    height: 11vmax;
    margin-top: 15vh;
    margin-left: 25vw;
    z-index: 9;
  }
  #img-2 {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width: 20vmax;
    height: 9vmax;
    margin-top: 13vh;
    margin-left: 27vw;
    z-index: 9;
  }
  #img-2::after {
    background-color: rgba(155,76,76,.4);
  }
  #img-3 {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    object-fit: cover;
    width: 47vw;
    max-width: 100vw;
    height: 15vmax;
    margin-top: 6vh;
    margin-left: 10vw;
    z-index: 9;
  }
  #img-3::after {
    background-color: rgba(167,126,66,.22);
  }
  #img-4 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    object-fit: cover;
    width: 13vw;
    height: 40vmax;
    max-height: 60vh;
    margin-top: 8vh;
    margin-left: 26vw;
    z-index: 8;
    background-color: #8D93CC;
  }
  #img-4::after {
    background-color: rgba(141,147,204,.52);
  }
  #color-bar-1 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    object-fit: cover;
    width: 42vw;
    height: 20vmax;
    max-height: 60vh;
    margin-top: 3vh;
    margin-left: 2vw;
    z-index: 7;
    background-color: #3D3C7B;
  }

  @media(orientation: portrait) {
    #img-1, #img-4, #color-bar-1 {
      display: none;
    }
    #img-0, #img-2, #img-3 {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      margin: 0;
      height: 50vh;
      width: auto;
      max-width: 100%;
    }
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      grid-gap: 2vh;
    }

    section {
      margin-bottom: 10vh;
    }

    #img-0 {
      margin-left: 20vw;
      z-index:5;
    }
    #img-2 {
      width: 50%;
      height: 30%;
      align-self: flex-end;
      margin-bottom: 7vh;
      z-index: 0;
    }
    #img-3 {
      height: 32%;
      width: 100%;
      max-width: 100%;
      object-fit: cover;
      z-index: 10;
      transform: translate(-60%, 15%);
    }

  }
</style>
