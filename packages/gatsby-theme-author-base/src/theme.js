import { tailwind } from '@theme-ui/presets'

export const theme = {
    ...tailwind,
    breakpoints: [
      ...tailwind.breakpoints,
      '1520px'
    ],
    space: [...tailwind.space],
    fonts: {
      body: "Montserrat, serif",
      heading: "'Open Sans', sans-serif",
    },
    fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80],
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
      tertiary: "#FF8D81",
      modes: {
        dark: {
          text: "#fff",
          background: "#000",
          primary: "#9AC3BF",
          secondary: "#EEDFB6",
          tertiary: "#AF3D31",
        }
      }
    },
    sizes: {
      small: "320px",
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
        fontSize: 5,
        textAlign: ["center", "center", "center", "left"],
        a: {
          color: "inherit",
        },
        textShadow: ""
      },
      links: {
        bold: {
          fontWeight: 'bold'
        }
      },
      buttons: {
        backgroundColor: "white",
        '&:hover': {
          color: "white",
        },
        primary: {
          color: "primary",
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "primary",
          '&:hover': {
            color: "white",
            backgroundColor: "primary",
          }
        },
        secondary: {
          color: "secondary",
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "secondary",
          '&:hover': {
            color: "white",
            backgroundColor: "secondary",
          }
        },
        tertiary: {
          color: "tertiary",
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "tertiary",
          '&:hover': {
            color: "white",
            backgroundColor: "tertiary",
          }
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
        fontSize: 2,
        lineHeight: "body",
        h2: {
          color: "primary",
          fontSize: 6,
          fontWeight: "bold",
          fontFamily: "heading",
          lineHeight: "heading",
          margin: "1rem 0",
        },
        h3: {
          color: "gray.9",
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
        dl: {
          borderTop: "1px solid",
          borderColor: "gray.1",
          listStyle: "none",
          margin: `15px 0`,
          fontSize: 2,
        },
        a: {
          color: "tertiary",
          cursor: "pointer",
          fontSize: 2,
          "&:hover": {
            color: "primary"
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
    },
    styles: {
      h1: {
        color: "gray.9",
        fontFamily: "heading",
        fontSize: "heading",
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h2: {
        color: "gray.9",
        fontFamily: "heading",
        fontSize: 3,
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h3: {
        color: "gray.9",
        fontSize: 2,
        fontWeight: "bold",
        fontFamily: "heading",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      dl: {
        borderTop: "1px solid",
        borderColor: "gray.1",
        listStyle: "none",
        margin: `15px 0`,
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
        color: "gray.9",
        fontSize: "text",
      },
    },
  }
  
  export default theme