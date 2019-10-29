// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config
const siteName = 'Megan Rodgers'
// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName,
  siteDescription: 'Fashion designs by Megan Rodgers',
  titleTemplate: '%s | '+siteName,
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './collections/**/*.md',
        route: '/collections/:slug',
        typeName: 'Collection',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './pages/**/*.md',
        route: '/netlify-:slug',
        typeName: 'NetlifyPage',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin'
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        // ...global plugins
      ]
    }
  }
}
