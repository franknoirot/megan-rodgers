<template>
  <header>
    <g-link class="site-logomark" to="/"> 
      <g-image src="/uploads/final-logo.jpg"></g-image>
      <span class="nav-title">Megan Rodgers</span>
    </g-link>
    <nav>
      <g-link to="/projects">Projects</g-link>
      <g-link to="/about">About</g-link>
      <a class="contact" href="mailto:frank@franknoirot.co">Contact</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style>
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
    font-family: 'DM Serif Display', serif;
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

  header img.g-image {
    height: 6vh;
    min-height: 40px;
    max-height: 100%;
    object-fit: scale-down;
  }

  header a {
    text-decoration: none;
    color: inherit;
  }

  header nav {
    width: 30vw;
    min-width: 300px;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header nav a {
    position: relative;
  }

  header nav a:not(.contact)::after {
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

  header nav a:not(.contact):focus {
    outline: none;
  }

  header nav a:hover::after,
  header nav a:focus::after {
    height: 30%;
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
  .contact:focus {
    outline: none;
    transform: translate(0, -.25vh) scale(1.03);
    --shadow-1-height: .3vmin;
    --shadow-1-blur: .8vmin;
    --shadow-2-height: .9vmin;
    --shadow-2-blur: 1.2vmin;
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
      top: 1.5vh;
      left: 50%;
      height: min-content;
      display: flex;
      align-items: center;
      padding: .5vh 1vw;
      transform: translate(-50%);
    }
    
    .site-logomark svg {
      display: inline-block;
      height: 5vh;
    }
    
    header nav {
      width: 100vw;
      font-size: calc(.3em + 2vmin);
      justify-content: space-around;
      box-sizing: border-box;
      padding: 0 1.5vmin;
      max-width: unset;
      min-width: unset;
    }
  }
</style>