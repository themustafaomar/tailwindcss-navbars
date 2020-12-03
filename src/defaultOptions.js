const keys = require('lodash/keys')
const merge = require('lodash/merge')
const isArray = require('lodash/isArray')
const isEqual = require('lodash/isEqual')
const defaultTheme = require('tailwindcss/resolveConfig')(require('tailwindcss/defaultConfig')).theme
const navbarExpand = require('./partials/navbar-expand')
const dropdown = require('./partials/dropdown')
const { colors, spacing } = defaultTheme

const validBreakpoints = []

// Get list of expand breakpoints
function getExpandBreakpoints(screens, { expandBreakpoints, dropdowns }) {
  return keys(screens)
    .filter(breakpoint => {
      const allow = expandBreakpoints.allow
      const hasExclude = isArray(expandBreakpoints.exclude) && expandBreakpoints.exclude.includes(breakpoint)

      if (isEqual(allow, '*') && !hasExclude) {
        return true
      } else if (hasExclude) {
        return false
      } else if (isArray(allow) && allow.includes(breakpoint)) {
        return true
      }

      return false
    }).map(breakpoint => {
      validBreakpoints.push(`.navbar-expand-${breakpoint}`)

      return navbarExpand({
        spacing,
        dropdownAnimation: dropdowns.animation,
        breakpointSize: screens[breakpoint],
        breakpointName: breakpoint,
        defaultActiveClass: dropdowns.defaultActiveClass
      })
    })
}

module.exports = theme => options => {
  const expandBreakpoints = getExpandBreakpoints(theme('screens'), options)

  return merge({}, {
    '.navbar': {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap', // Wrap in small screens before expand is happened
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing[2]} ${spacing[4]}`,
      borderBottom: `1px solid ${colors.gray[200]}`,
      boxShadow: defaultTheme.boxShadow.sm,
      '> .container': {
        display: 'flex',
        flexWrap: 'inherit',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      '.navbar-brand': {
        marginRight: spacing[3],
        whiteSpace: 'nowrap', // Prevent wrap of texts
      },
      '.navbar-toggler': {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'space-around',
        outline: 'none',
        width: spacing[6],
        height: spacing[8],
        paddingTop: spacing[2],
        paddingBottom: spacing[2],
        borderRadius: defaultTheme.borderRadius.DEFAULT,
        'span': {
          height: '2px',
          width: '100%',
          backgroundColor: colors.gray[400],
          borderRadius: defaultTheme.borderRadius.full,
          display: 'block',
        },
        'span:not(:last-child)': {
          marginBottom: spacing[1]
        }
      },
      '.navbar-collapse': {
        display: 'none',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
        '&.active': {
          display: 'block'
        }
      },
    },

    // Prevent duplication of padding in small screens
    [`${validBreakpoints.join()}`]: {
      '> .container': {
        '@media (max-width: 768px)': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }
    },

    // By default make the links under each other.
    '.navbar-items': {
      display: 'flex',
      flexDirection: 'column',
      '.nav-link': {
        display: 'block',
        padding: `${spacing[2]} ${0}`,
        color: options.links.color,
        '&:hover': {
          color: options.links.hoverColor
        }
      },
      '.dropdown': dropdown(defaultTheme, options.dropdowns)
    },
  }, ...expandBreakpoints)
}
