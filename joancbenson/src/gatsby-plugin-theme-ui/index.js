import baseTheme from '@wesleylhandy/gatsby-theme-author-base/src/gatsby-plugin-theme-ui/index'

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
          opaqueBackground: "rgba(0,0,0,.6)",
          primary: "#7A9DA9",
          secondary: "#575246",
          tertiary: "#cc4b4b",
          light: "#343a40",
          affiliations: "#919191",
        }
      }
    },
    sizes: {
      ...baseTheme.sizes,
      max: "1100px",
    },
    borders: {
      box: {
        border: `5px solid`,
        borderColor: `primary`,
      }
    }
  }
  
  export default theme