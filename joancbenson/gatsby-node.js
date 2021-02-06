const convertPathToTitle = (path) => {
  let str = path.replace(/\//g, "")
  str = str.slice(0,1).toUpperCase() + str.slice(1)
  return str
}
  
exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/(subscribe)/)) {
    const { createPage, deletePage } = actions
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        navLink: convertPathToTitle(page.path),
        sortOrder: 11
      }
    })
  }
}