<template>
  <div class="bee_container">
    <div ref="bee" class="bee" :class="{['bee__animation']: animating}"
      @click="startBee"></div>
    <button class="drop-bee"
      @click="stopBee">DROP BEE</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animating: false,
      t: 0,
      mouse: {
        x: 0,
        y: 0
      },
      mouseOld: {
        x: 0,
        y: 0
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$bee.isAnimating) {
        this.$refs.bee.classList.toggle('bee__animation')
        this.$refs.bee.style.left = this.$bee.position.left
        this.$refs.bee.style.top = this.$bee.position.top
        this.startBee()
      } else {
        this.$refs.bee.style.left = '50%'
        this.$refs.bee.style.top = '50%'
      }
    })
  },
  beforeDestroy() {
    this.animating = false
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('touchmove', this.touchMove)
  },
  methods: {
    startBee() {
      this.animating = true
      
      if (this.$bee.isAnimating) {
        this.mouse = this.$bee.mouse
      } else {
        this.mouse = {x: innerWidth / 2,
                      y: innerHeight / 2}
      }
      this.mouseOld = {x: this.$refs.bee.getBoundingClientRect().left + this.$refs.bee.getBoundingClientRect().width*1.25,
                       y: this.$refs.bee.getBoundingClientRect().top + this.$refs.bee.getBoundingClientRect().height*1.25}
      this.$bee.isAnimating = true

      if (!this.touches) {
        window.addEventListener('mousemove', this.mouseMove, {passive: true})
      } else {
        window.addEventListener('touchmove', this.touchMove, {passive: true})
      }

      this.beeFollow()
    },
    stopBee() {
      this.animating = false
      this.$bee.isAnimating = false
      this.$refs.bee.classList.remove('bee__animation')
      this.$refs.bee.style.left = '50%'
      this.$refs.bee.style.top = '50%'
      this.$beeActions.setPosition({left: 0, top: 0})
      this.$bee.mouse = {x: 0, y: 0}
      this.mouseOld = {x: 0, y: 0}
      this.mouse = {x: 0, y: 0}
      this.t = 0
    },
    beeFollow() {
      let styles = {left: 0, top: 0}

      if (!this.animating) { //reset values to initial
        this.t = 0
        styles = {left: 0, top: 0}
        return
      }
      else {
        requestAnimationFrame(this.beeFollow)

        // slowly (speed set by scale 0.009) approach the last known mouse position
        this.mouseOld.x += (this.mouse.x - this.mouseOld.x)*0.009
        this.mouseOld.y += (this.mouse.y - this.mouseOld.y)*0.011
        // the Math.* stuff is added to make the bee move in a figure eight pattern
        // x = sin(t), y = cos(t)sin(t) 
        styles.left = this.mouseOld.x - this.$refs.bee.getBoundingClientRect().width + Math.sin(3*this.t) * 80 + "px",
        styles.top = this.mouseOld.y - this.$refs.bee.getBoundingClientRect().height - Math.sin(3*this.t)*Math.cos(3*this.t) * 80 + "px"  
  
        this.$refs.bee.style.left = styles.left
        this.$refs.bee.style.top = styles.top
        this.$beeActions.setPosition(styles)
        
        this.t += 0.01;
        if (this.t > 2*Math.PI) this.t = 0;
      }
    },
    touchMove(e) {
      this.mouse.x = e.touches[0].pageX
      this.mouse.y = e.touches[0].pageY
      this.$bee.mouse = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      }
    },
    mouseMove(e) {
      this.mouse.x = e.pageX
      this.mouse.y = e.pageY
      this.$bee.mouse = {
        x: e.pageX,
        y: e.pageY,
      }
    }
  }
}
</script>

<style>
  .bee_container {
    position: fixed;
    left: 3vw;
    bottom: 3vh;
    width: 115px;
    height: 100px;
  }

  .bee {
    position: absolute;
    left: 0;
    top: 0;
    width: 115px;
    height: 100px;
    opacity: .5;
    background: url(https://franknoirot.co/assets/img/img_bee-frames.png);
    background-repeat: no-repeat;
    background-size: 960px 94px;
    --bg-left: -10px; /* This is the variable that updates to move the background for the animation */
    background-position: var(--bg-left) 0;
    border-radius: 0 50% 0 0; /* this is just to hide the overlaps in my poor-quality sprites */
    overflow: hidden;
    z-index: 5;
    transform: translate(-50%, -50%) scale(.5);
  }

  .bee:hover {
    --bg-left: -139px; /* show second frame on hover */
  }

  .bee__animation {
    position: fixed;
    animation: sprite-loop .6s cubic-bezier(.1, .5, .8, .6) infinite;
    pointer-events: none;
  }

  .bee_animation img {
    height: 100%;
  }

  .drop-bee {
    position: absolute;
    left: 50%;
    bottom: 50%;
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    border: solid;
    color: inherit;
    font-size: inherit;
    text-transform: uppercase;
    transform: translate(-50%, 50%);
  }

  .drop-bee:hover {
    background: gold;
  }

  .bee ~ .drop-bee,
  .bee__animation ~ .bee__guide-text {
    display: none;
  }

  .bee__animation ~ .drop-bee {
    display: initial;
  }

  @keyframes sprite-loop {
    /* the hard-coded pixel values below are gross because my spritesheet is gross.
      if your frames and drawings in the frames are all perfectly positioned you can do this a lot cleaner. 
    */
    0% { --bg-left: -8px; }
    12.5% { --bg-left: -134px; }
    25% { --bg-left: -262px; }
    37.5% { --bg-left: -385px; }
    50% { --bg-left: -495px; }
    62.5% { --bg-left: -610px; }
    75% { --bg-left: -727px; }
    87.5% { --bg-left: -838px; }
    100% { --bg-left: -8px; }
  }

  @media(orientation: portrait) {
    .bee_container {
      bottom: unset;
      top: 2vh;
      left: unset;
      right: 2vw;
    }
  }
</style>