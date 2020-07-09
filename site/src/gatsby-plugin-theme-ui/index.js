import baseTheme from 'gatsby-theme-author-base/src/gatsby-plugin-theme-ui/index'

const theme = {
    ...baseTheme,
    fonts: {
      ...baseTheme.fonts,
      body: "Montserrat, Georgia, serif",
      heading: "Oswald, Arial, sans-serif",
    },
    colors: {
      ...baseTheme.colors,
      background: "#fff",
      opaqueBackground: "rgba(255,255,255, .8)",
      primary: "#579CA8",
      secondary: "#e7dbba",
      tertiary: "#FF8D81",
      light: "#dee4ea",
      modes: {
        dark: {
          text: "#fff",
          background: "#000",
          opaqueBackground: "rgba(0,0,0, .4)",
          primary: "#9AC3BF",
          secondary: "#978B6A",
          tertiary: "#AF3D31",
          light: "#343a40"
        }
      }
    },
    sizes: {
      ...baseTheme.sizes,
      max: "980px",
    },
  }
  
  export default theme