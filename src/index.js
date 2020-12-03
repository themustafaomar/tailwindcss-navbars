const { has, merge } = require('lodash')
const plugin = require('tailwindcss/plugin')

// Plugin options
const defaultOptions = require('./defaultOptions')

// Register the plugin
module.exports = plugin(({ addComponents, theme }) => {
  const navigationBar = theme('customizeNavbar', {})
  let components = navigationBar._navbarStyle(navigationBar.options)

  if (has(navigationBar, 'navbarStyle')) {
    components = merge(components, navigationBar.navbarStyle)
  }

  addComponents(components)
}, {
  theme: {
    customizeNavbar: theme => ({
      _navbarStyle: defaultOptions(theme),
      options: {
        expandBreakpoints: {
          allow: ['sm', 'md'],
          exclude: [], // `exclude` has the priority over `allow`
        },
        dropdowns: {
          defaultActiveClass: 'active',
          animation: true,
        },
        links: {
          color: false,
          hoverColor: '#66F'
        }
      }
    })
  }
})