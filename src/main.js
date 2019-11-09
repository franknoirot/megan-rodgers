// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  //Google Fonts
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Fredericka+the+Great|Noto+Sans|Playfair+Display'
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Add Bee global state
  const beeStore = Vue.observable({
    isAnimating: false,
    position: {
      left: 0,
      top: 0
    },
    mouse: {
      x: 0,
      y: 0
    }
  })

  const beeActions = {
    setPosition({top, left}) {
      beeStore.position.top = top
      beeStore.position.left = left
    }
  }

  Vue.prototype.$bee = beeStore
  Vue.prototype.$beeActions = beeActions
}
