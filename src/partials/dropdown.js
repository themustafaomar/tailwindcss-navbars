
module.exports = ({ spacing, colors }, options) => {
  const openBehavior = `&:not(.dropdown\\:clickable):hover .dropdown-menu, .dropdown-menu.${options.defaultActiveClass}`

  return {
    position: 'relative',
    '.dropdown-menu': {
      position: 'static',
      display: 'none',
      backgroundColor: colors.white,
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
      minWidth: spacing[48],
      top: '100%',
      left: 0,
      '.dropdown-item': {
        padding: `${spacing[1]} ${spacing[5]}`,
        whiteSpace: 'nowrap',
        display: 'block',
      },
      '.dropdown-divider': {
        display: 'block',
        borderTop: `1px solid ${colors.gray[200]}`,
        marginTop: `${spacing[2]}`,
        marginBottom: `${spacing[2]}`
      }
    },
    [openBehavior]: { display: 'block' },
  }
} 