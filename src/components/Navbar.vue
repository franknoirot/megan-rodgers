<template>
  <header>
    <g-link class="site-logomark" to="/"> 
      <g-image src="/uploads/final-logo.jpg" alt="Megan Rodgers logo: 'MR' centered in an incomplete circle, with greenery growing out of the circle's broken ends, and a bee and butterfly visiting each."></g-image>
      <span class="nav-title">Megan Rodgers</span>
    </g-link>
    <nav>
      <svg @click="open = !open" v-bind:class="{ hamburger: true, open, 'mobile-only': true }" viewBox="0 0 10 10">
        <path d="M 1 1, l 8 0"></path>
        <path d="M 1 5, l 8 0"></path>
        <path d="M 1 5, l 8 0"></path>
        <path d="M 1 9, l 8 0"></path>
      </svg>
      <div :class="{ 'secondary-nav': true, open }">
        <g-link :class="{ active: ($page == '/collections') ? true : false }" to="/collections">Collections</g-link>
        <g-link :class="{ active: ($page == '/about') ? true : false }" to="/about">About</g-link>
        <!-- <g-link :class="{ active: ($page == '/lookbook') ? true : false }" to="/lookbook">Lookbook</g-link>
        <g-link :class="{ active: ($page == '/textiles') ? true : false }" to="/textiles">Textiles</g-link> -->
        <a class="social-icon" href="https://www.instagram.com/megann.carsonn/" target="_blank" rel="noopener">
          <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M7.64899 2.24644C9.40853 2.24644 9.61693 2.25317 10.3119 2.28487C10.9544 2.31419 11.3033 2.42152 11.5355 2.51176C11.8217 2.6174 12.0806 2.78584 12.2932 3.00471C12.512 3.21727 12.6805 3.47618 12.7861 3.7624C12.8764 3.9946 12.9837 4.34352 13.013 4.98601C13.0447 5.6809 13.0514 5.8893 13.0514 7.64889C13.0514 9.40848 13.0447 9.61683 13.013 10.3118C12.9837 10.9543 12.8763 11.3032 12.7861 11.5354C12.6765 11.8196 12.5086 12.0777 12.2932 12.2931C12.0778 12.5085 11.8197 12.6764 11.5355 12.786C11.3033 12.8763 10.9544 12.9836 10.3119 13.0129C9.61712 13.0446 9.40872 13.0513 7.64899 13.0513C5.88927 13.0513 5.68095 13.0446 4.98612 13.0129C4.34363 12.9836 3.99473 12.8762 3.7625 12.786C3.47628 12.6804 3.21737 12.5119 3.00481 12.2931C2.78595 12.0805 2.61751 11.8216 2.51187 11.5354C2.42162 11.3032 2.31427 10.9543 2.28497 10.3118C2.25327 9.61691 2.24655 9.40848 2.24655 7.64889C2.24655 5.8893 2.25327 5.68095 2.28497 4.98601C2.3143 4.34352 2.42162 3.99463 2.51187 3.7624C2.61752 3.47616 2.78598 3.21724 3.00486 3.00468C3.21743 2.78582 3.47633 2.61738 3.76256 2.51174C3.99476 2.42149 4.34368 2.31414 4.98617 2.28484C5.68106 2.25314 5.88946 2.24642 7.64905 2.24642L7.64899 2.24644ZM7.64905 1.05908C5.85937 1.05908 5.63489 1.06667 4.93213 1.09874C4.2307 1.13075 3.7517 1.24214 3.33255 1.40505C2.89285 1.57051 2.49453 1.8299 2.16538 2.16512C1.83008 2.49425 1.57063 2.89257 1.4051 3.33228C1.24232 3.75147 1.13094 4.23047 1.09905 4.93189C1.06685 5.63465 1.05927 5.85914 1.05927 7.64881C1.05927 9.43849 1.06685 9.66297 1.09905 10.3657C1.13107 11.0672 1.24245 11.5462 1.40536 11.9653C1.57083 12.405 1.83021 12.8033 2.16543 13.1325C2.49458 13.4677 2.8929 13.7271 3.3326 13.8926C3.75178 14.0555 4.23078 14.1668 4.93218 14.1989C5.63504 14.2309 5.85945 14.2385 7.6491 14.2385C9.43875 14.2385 9.66326 14.2309 10.366 14.1989C11.0674 14.1668 11.5464 14.0555 11.9656 13.8926C12.4033 13.7232 12.8009 13.4644 13.1328 13.1325C13.4646 12.8006 13.7235 12.4031 13.8928 11.9653C14.0557 11.5461 14.1671 11.0671 14.1991 10.3657C14.2312 9.66287 14.2388 9.43846 14.2388 7.64881C14.2388 5.85917 14.2312 5.63465 14.1991 4.93189C14.1671 4.23047 14.0557 3.75147 13.8928 3.33231C13.7274 2.89261 13.468 2.4943 13.1328 2.16514C12.8036 1.82986 12.4053 1.57042 11.9655 1.40492C11.5463 1.24214 11.0673 1.13075 10.3659 1.09887C9.66315 1.06667 9.43867 1.05908 7.64899 1.05908H7.64905Z" fill="#13151A"/>
              <path d="M7.649 4.26465C6.97972 4.26465 6.32547 4.46311 5.76899 4.83494C5.21251 5.20677 4.77878 5.73527 4.52266 6.3536C4.26654 6.97193 4.19953 7.65232 4.3301 8.30874C4.46067 8.96515 4.78295 9.56811 5.2562 10.0414C5.72945 10.5146 6.33241 10.8369 6.98883 10.9675C7.64524 11.098 8.32564 11.031 8.94397 10.7749C9.5623 10.5188 10.0908 10.0851 10.4626 9.52857C10.8345 8.97209 11.0329 8.31784 11.0329 7.64857C11.0329 6.7511 10.6764 5.89038 10.0418 5.25577C9.40718 4.62117 8.54647 4.26465 7.649 4.26465V4.26465ZM7.649 9.84512C7.21456 9.84512 6.78988 9.71629 6.42866 9.47492C6.06744 9.23356 5.78591 8.8905 5.61966 8.48913C5.45341 8.08776 5.40992 7.64611 5.49467 7.22002C5.57943 6.79393 5.78863 6.40255 6.09583 6.09536C6.40303 5.78816 6.79442 5.57896 7.22051 5.49421C7.6466 5.40946 8.08825 5.45296 8.48962 5.61921C8.89098 5.78547 9.23404 6.067 9.4754 6.42823C9.71676 6.78945 9.84558 7.21413 9.84558 7.64857C9.84557 8.23113 9.61415 8.78983 9.20221 9.20177C8.79027 9.6137 8.23156 9.84512 7.649 9.84512Z" fill="#13151A"/>
              <path d="M11.1666 4.92185C11.6033 4.92185 11.9574 4.56781 11.9574 4.13109C11.9574 3.69437 11.6033 3.34033 11.1666 3.34033C10.7299 3.34033 10.3759 3.69437 10.3759 4.13109C10.3759 4.56781 10.7299 4.92185 11.1666 4.92185Z" fill="#13151A"/>
            </g>
          </svg>
        </a>
        <a class="social-icon" href="https://www.linkedin.com/in/megan-rodgers-128036a8/" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M4.14948 13.604C4.14948 13.8481 3.95031 14.0459 3.70459 14.0459H1.81083C1.56511 14.0459 1.36594 13.8481 1.36594 13.604V5.71871C1.36594 5.47465 1.56511 5.27681 1.81083 5.27681H3.70459C3.95031 5.27681 4.14948 5.47465 4.14948 5.71871V13.604ZM2.75771 4.5335C1.76411 4.5335 0.958618 3.73342 0.958618 2.74649C0.958618 1.75956 1.76411 0.959473 2.75771 0.959473C3.75131 0.959473 4.5568 1.75956 4.5568 2.74649C4.5568 3.73342 3.75135 4.5335 2.75771 4.5335ZM14.0462 13.6396C14.0462 13.864 13.8631 14.0459 13.6372 14.0459H11.605C11.3792 14.0459 11.196 13.864 11.196 13.6396V9.94096C11.196 9.3892 11.3589 7.52313 9.74433 7.52313C8.49192 7.52313 8.23789 8.8004 8.18688 9.3736V13.6396C8.18688 13.864 8.00377 14.0459 7.77783 14.0459H5.81239C5.5865 14.0459 5.40335 13.864 5.40335 13.6396V5.68312C5.40335 5.45874 5.5865 5.27681 5.81239 5.27681H7.77783C8.00372 5.27681 8.18688 5.45874 8.18688 5.68312V6.37106C8.65127 5.67881 9.34143 5.1445 10.8109 5.1445C14.0649 5.1445 14.0462 8.16414 14.0462 9.82328V13.6396Z" fill="#13151A"/>
            </g>
          </svg>
        </a>
      </div>
      <a class="contact" href="mailto:mrodge11@kent.edu">Contact</a>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        open: false,
      }
    }
  }
</script>

<style scoped>
  header {
    z-index: 5;
    box-sizing: border-box;
    position: fixed;
    width: 100vw;
    height: 8vh;
    min-height: 50px;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right, var(--bg), white 30%);
    padding: 1vh 3.5vw;
    box-shadow: 0 .1vmin .4vmin rgba(var(--color-rgb), .08);
  }

  .nav-title {
    font-family: 'Playfair Display', serif;
    font-weight: bold;
    font-size: calc(1.25em + .75vh);
    margin-left: 1em;
  }

  .site-logomark {
    max-height: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .site-logomark img {
    height: 6vh;
    min-height: 40px;
    max-height: 100%;
    object-fit: scale-down;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  nav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    user-select: none;
    position: relative;
  }

  nav a {
    position: relative;
    display: inline-block;
    margin: 0 2vw;
  }

  nav a:not(.contact)::after {
    content: '';
    position: absolute;
    bottom: 0%;
    left: -.5vw;
    height: 0;
    width: calc(100% + 1vw);
    background: var(--mauve);
    z-index: -1;
    transition: height .12s ease-in-out;
  }

  nav a:not(.contact):focus {
    outline: none;
  }

  nav a.active::after {
    height: 15%;
  }
  nav a:not(.social-icon):hover::after,
  nav a:not(.social-icon):focus::after {
    height: 30%;
  }

  /* Social Icons */
  .social-icon {
    width: calc(.75em + 1vmin);
    height: calc(.75em + 1vmin);
    margin: 0 1vw;
    border-radius: 50%;
    border: solid 1px var(--bg);
    vertical-align: middle;
    padding: .75vmin;
    --shadow-1-height: .2vmin;
    --shadow-1-blur: .2vmin;
    --shadow-2-height: .3vmin;
    --shadow-2-blur: .4vmin;
    box-shadow: 0 var(--shadow-1-height) var(--shadow-1-blur) rgba(var(--primary-rgb), 0.2),
              0 var(--shadow-2-height) var(--shadow-2-blur) rgba(var(--color-rgb),0.06);
    transition: all .12s ease-in-out;
  }

  .social-icon svg {
    width: 100%;
    height: 100%;
  }

  .social-icon path {
    fill: var(--mauve);
  }

  /* Contact Badge */
  .contact {
    color: white;
    background: var(--mauve);
    background-size: 250% 250%;
    background-position: center;
    text-decoration: none;
    display: inline-block;
    padding: .5em 1em;
    border-radius: 1vmin;
    transform: translate(0, 0) scale(1);
    --shadow-1-height: 0;
    --shadow-1-blur: 0;
    --shadow-2-height: 0;
    --shadow-2-blur: 0;
    box-shadow: 0 var(--shadow-1-height) var(--shadow-1-blur) rgba(var(--primary-rgb), 0.2),
                0 var(--shadow-2-height) var(--shadow-2-blur) rgba(var(--color-rgb),0.06);
    transition: all .12s ease-in-out;
  }

  .contact:hover,
  .contact:focus,
  .social-icon:hover,
  .social-icon:focus {
    outline: none;
    transform: translate(0, -.25vh) scale(1.03);
    --shadow-1-height: .3vmin;
    --shadow-1-blur: .8vmin;
    --shadow-2-height: .9vmin;
    --shadow-2-blur: 1.2vmin;
  }

  svg.hamburger {
    width: 3vh;
    height: 3vh;
    position: relative;
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

  .mobile-only {
    display: none;
  }


  @media(orientation: portrait) {
    header {
      top: unset;
      bottom: 0;
      justify-content: center;
      border-bottom: none;
      border-top: solid rgba(var(--color-rgb), 0.3) 1px;
      box-shadow: 0 -.1vmin .4vmin rgba(var(--color-rgb), .08);
    }
    
    .site-logomark {
      position: fixed;
      top: 3vh;
      left: 50%;
      transform: translate(-50%);
    }
    .site-logomark img {
      height: 10vh;
      width: 10vh;
    }
    .nav-title {
      display: none;
    }
    
    header nav {
      width: 100vw;
      font-size: calc(.3em + 2vmin);
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 1.5vmin;
      max-width: unset;
      min-width: unset;
      position: relative;
      z-index: 2;
    }

    header nav::before {
      content:'';
      position: absolute;
      background: var(--bg);
      left: 0;
      width: 100%;
      height: 100%;
      padding: 1.5vh;
      top: -.8vh;
    }

    .contact {
      margin: 0;
    }

    .secondary-nav {
      position: absolute;
      bottom: calc(100% + .3em + 1vmin - 1px);
      left: -3.5vw;
      width: 100vw;
      padding: 1.5vh 3vw;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      border-top: solid transparent 1px;
      background: var(--bg);
      transform: translateY(105%);
      z-index: -1;
      transition: transform .11s ease-in-out;
    }

    .secondary-nav.open {
      transform: translateY(0);
      border-color: rgba(var(--color-rgb), 0.3);
    }

    .mobile-only {
      display: initial;
    }
  }
</style>