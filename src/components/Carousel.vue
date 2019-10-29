// TODO: Break this out to its own proper component from the Collection page.

<template>
  <div class="carousel" itemprop="mainEntity">
    <div class='stage' tabindex=0 @click="handleStageClick"
    @keydown.left="() => moveImg(-1)" @keydown.right="() => moveImg(1)"
    @touchstart="imgTouchStart" @touchend="imgTouchEnd">
      <g-image v-for="(image, i) in images" :key="i"
      :src="images[i].img.src" :alt="images[i].img.alt" :title="images[i].img.title"
      :class="{ active: (i===currImg), left: isLeft(i), right: isRight(i) }"></g-image>
    </div>
    <button class="arrow left" v-on:click="() => moveImg(-1)" tabindex=-1 title="Go to previous image"></button>
    <button class="arrow right" v-on:click="() => moveImg(1)" tabindex=-1 title="Go to next image"></button>
    <div class="tabs">
      <button class="step" v-for="(step, j) in processSteps" :key="j"
        v-on:click="() => activateStep(j)"
        :class="{ 
          active: (currStep === j) ? true: false,
          }" :title="stepTitle(step, j)">
        {{ step }}
      </button>
    </div>
    <div class="dots">
      <button v-for="(image, i) in images" :key="i"
        class="dot" :class="{[image.step]: image.step,
        stepActive: (processSteps[currStep].toLowerCase() === image.step) ? true : false,
        imgActive: (currImg === i) ? true : false}"
        :data-to="image.img.src" v-on:click="() => setImg(i)"
        :title="dotTitle(i)"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {

  }
}
</script>

<style>

</style>