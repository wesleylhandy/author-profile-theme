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
      primary: "#77aec2",
      secondary: "#e7dbba",
      tertiary: "#bd263c",
      light: "#dee4ea",
      modes: {
        dark: {
          text: "#fff",
          background: "#000",
          opaqueBackground: "rgba(0,0,0, .4)",
          primary: "#275E72",
          secondary: "#978B6A",
          tertiary: "#A91228",
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