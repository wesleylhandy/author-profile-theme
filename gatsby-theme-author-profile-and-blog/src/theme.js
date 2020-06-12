import { tailwind } from '@theme-ui/presets'

export const theme = {
    ...tailwind,
    breakpoints: [
      ...tailwind.breakpoints,
      '1520px'
    ],
    space: [...tailwind.space],
    fonts: {
      body: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    },
    fontSizes: [...tailwind.space],
    lineHeights: {
      body: 1.45,
      heading: 1.1,
    },
    useColorSchemeMediaQuery: true,
    colors: {
      ...tailwind.colors,
      background: "#fff",
      primary: "#579CA8",
      secondary: "#E5D591",
      modes: {
        dark: {
          text: "#fff",
          background: "#000",
          primary: "#9AC3BF",
          secondary: "#EEDFB6"
        }
      }
    },
    sizes: {
      default: "90vw",
      full: "100vw",
      max: "1920px",
    },
    text: {
      heading: {
        backgroundColor: "primary",
        color: "background",
        fontWeight: "bold",
        margin: "0 auto",
        maxWidth: ["full", "full", "full", "max"],
        width: ["full", "full", "full", "max"],
        padding: 4,
        fontSize: 4,
        textAlign: ["center", "center", "center", "left"],
        a: {
          color: "inherit",
        },
      },
      links: {
        bold: {
          fontWeight: 'bold'
        }
      }
    },
    layout: {
      container: {
        margin: "0 auto",
        maxWidth: ["full", "full", "full", "max"],
        width: ["full", "full", "full", "default"],
        padding: 3,
        color: "gray.9",
        fontFamily: "body",
        fontSize: 3,
        lineHeight: "body",
        h2: {
          color: "secondary",
          fontSize: 4,
          fontWeight: "bold",
          lineHeight: "heading",
          margin: "1rem 0",
        },
        p: {
          marginBottom: 3,
        }
      },
    },
    styles: {
      ...tailwind.styles,
      h1: {
        color: "gray.9",
        fontSize: "heading",
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h2: {
        color: "gray.9",
        fontSize: 3,
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h3: {
        color: "gray.9",
        fontSize: 2,
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      ul: {
        borderTop: "1px solid",
        borderColor: "gray.1",
        listStyle: "none",
        padding: 0,
      },
      li: {
        borderBottom: "1px solid",
        borderColor: "gray.1",
        padding: 3,
        "&:focus-within,&:hover": {
          backgroundColor: "gray.1",
        },
      },
      a: {
        color: "primary",
        cursor: "pointer",
        "&:hover": {
          color: "secondary"
        }
      },
      p: {
        lineHeight: "body",
        marginBottom: 4,
        color: "gray.9"
      }
    },
  }
  
  export default theme