const merge = require("lodash/merge")
const dropdownMenu = { position: 'absolute' }

function dropdownAnimationProps() {
  return {
    display: 'block',
    top: '120%',
    opacity: '0',
    pointerEvents: 'none',
    transition: '.25s ease-in-out',
  }
}

module.exports = ({ spacing, breakpointSize, breakpointName, dropdownAnimation, defaultActiveClass }) => ({
  [`@media (min-width: ${breakpointSize})`]: {
    [`.navbar-expand-${breakpointName}`]: {
      flexWrap: 'nowrap',
      justifyContent: 'flex-start', // Set justify content to the default value
      '.navbar-toggler': {
        display: 'none'
      },
      '.navbar-collapse': {
        // Force display flex in case the user resized the window and open menu and resize it again
        display: 'flex !important',
        width: 'auto'
      },
      '.navbar-items': {
        flexDirection: 'row',
        '.nav-link': {
          padding: `${spacing[4]} ${spacing[4]}`
        },
        '.dropdown-menu': dropdownAnimation
          ? merge({}, dropdownAnimationProps(), dropdownMenu)
          : dropdownMenu
        ,
        [`.dropdown:not(.dropdown\\:clickable):hover .dropdown-menu, .dropdown-menu.${defaultActiveClass}`]: {
          top: '100%',
          opacity: 1,
          pointerEvents: 'visible',
        }
      }
    }
  },
})
