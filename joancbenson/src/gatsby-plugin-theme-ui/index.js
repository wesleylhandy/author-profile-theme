import baseTheme from '@wesleylhandy/gatsby-theme-author-base/src/gatsby-plugin-theme-ui/index'

const theme = {
    ...baseTheme,
    buttons: {
      ...baseTheme.buttons,

    },
    fonts: {
      ...baseTheme.fonts,
      body: "Montserrat, Georgia, serif",
      heading: "Oswald, Arial, sans-serif",
    },
    colors: {
      ...baseTheme.colors,
      background: "#fff",
      opaqueBackground: "rgba(255,255,255, .95)",
      primary: "#77aec2",
      secondary: "#e7dbba",
      tertiary: "#bd263c",
      light: "#dee4ea",
      ultralight: "#f7faff",
      affiliations: "rgba(255,255,255, .95)",
      modes: {
        dark: {
          text: "#fff",
          background: "#000",
          opaqueBackground: "rgba(0,0,0,.95)",
          primary: "#7A9DA9",
          secondary: "#575246",
          tertiary: "#cc4b4b",
          light: "#343a40",
          ultralight: "#181511",
          affiliations: "rgba(0,0,0,.95)",
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
    },
    layout: {
      container: {
        backgroundColor: "transparent",
        margin: "0 auto",
        maxWidth: ["full", "full", "full", "max"],
        width: ["full", "full", "full", "default"],
        flex: 1,
        padding: 3,
        color: "text",
        fontFamily: "body",
        fontSize: 2,
        lineHeight: "body",
        position: "relative",
        h2: {
          color: "primary",
          fontSize: 6,
          fontWeight: "bold",
          fontFamily: "heading",
          lineHeight: "heading",
          margin: "1rem 0",
        },
        h3: {
          color: "text",
          fontSize: 5,
          fontWeight: "bold",
          fontFamily: "heading",
          lineHeight: "heading",
          margin: "1rem 0",
        },
        p: {
          marginBottom: 3,
          fontSize: 2,
        },
        'h2 > p': {
          display: "inline-block",
          fontSize: "inherit",
          color: "inherit",
          fontWeight: "inherit",
          fontFamily: "inherit",
        },
        h4: {
          color: "text",
          fontSize: 3,
          fontWeight: "bold",
          fontFamily: "heading",
          lineHeight: "heading",
          margin: "1rem 0",
        },
        h5: {
          color: "text",
          fontSize: 2,
          fontStyle: "italic",
          fontFamily: "heading",
          lineHeight: "heading",
          margin: "1rem 0",
        },
        dl: {
          borderTop: "1px solid",
          borderColor: "gray.1",
          listStyle: "none",
          margin: `15px 0`,
          fontSize: 2,
          maxWidth: '100%',
        },
        a: {
          color: "tertiary",
          cursor: "pointer",
          fontSize: 2,
          fontWeight: "bold",
          wordBreak: `break-all`,
          "&:hover": {
            color: "gray.4"
          }
        },
        'h1 > p': {
          color: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
        },
        'h2 > a': {
          color: "inherit",
          textDecoration: "underline",
          fontSize: "inherit",
          "&:hover": {
            color: "tertiary"
          }
        },
        'h3 > a': {
          color: "inherit",
          textDecoration: "underline",
          fontSize: "inherit",
          "&:hover": {
            color: "tertiary"
          }
        }
      },
    }
  }
  
  export default theme