import { tailwind } from '@theme-ui/presets'

export const theme = {
    ...tailwind,
    breakpoints: [
      ...tailwind.breakpoints,
      '1520px'
    ],
    space: [...tailwind.space],
    fonts: {
      body: "Georgia, serif",
      heading: "Arial, sans-serif",
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
      text: "gray.9",
      opaqueBackground: "rgba(255,255,255, .8)",
      primary: "#579CA8",
      secondary: "#e7dbba",
      tertiary: "#FF8D81",
      light: "gray.3",
      modes: {
        dark: {
          text: "gray.2",
          background: "#000",
          opaqueBackground: "rgba(255,255,255, .2)",
          primary: "#9AC3BF",
          secondary: "#EEDFB6",
          tertiary: "#AF3D31",
          light: "gray.7,"
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
        maxWidth: "full",
        width: "full",
        padding: 4,
        fontSize: 5,
        textAlign: ["center", "center", "center", "left"],
        a: {
          color: "inherit",
        },
        textShadow: "",
      },
    },
    links: {
      bold: {
        fontWeight: 'bold'
      },
      footer: {
        color: "tertiary",
        transition: "color 250ms ease-in-out",
        "&:hover": {
          color: "primary"
        }
      }
    },
    buttons: {
      backgroundColor: "transparent",
      fontWeight: "bold",
      transition: "color 250ms ease-in-out, background-color 250ms ease-in-out",
      '&:hover': {
        color: "white",
      },
      primary: {
        color: "white",
        backgroundColor: "primary",
        border: "3px solid",
        borderColor: "primary",
        fontWeight: "bold",
        transition: "color 250ms ease-in-out, background-color 250ms ease-in-out",
        '&:hover': {
          backgroundColor: "white",
          color: "primary",
        }
      },
      secondary: {
        color: "white",
        backgroundColor: "secondary",
        border: "3px solid",
        borderColor: "secondary",
        fontWeight: "bold",
        transition: "color 250ms ease-in-out, background-color 250ms ease-in-out",
        '&:hover': {
          backgroundColor: "white",
          color: "secondary",
        }
      },
      tertiary: {
        color: "white",
        backgroundColor: "tertiary",
        border: "2px solid",
        borderColor: "tertiary",
        fontWeight: "bold",
        transition: "color 250ms ease-in-out, background-color 250ms ease-in-out",
        '&:hover': {
          backgroundColor: "white",
          color: "tertiary",
        }
      }
    },
    layout: {
      container: {
        backgroundColor: "opaqueBackground",
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
        },
        a: {
          color: "tertiary",
          cursor: "pointer",
          fontSize: 2,
          fontWeight: "bold",
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
      html: {
        background: "light",
      },
      h1: {
        color: "text",
        fontFamily: "heading",
        fontSize: "heading",
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h2: {
        color: "text",
        fontFamily: "heading",
        fontSize: 3,
        fontWeight: "bold",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h3: {
        color: "text",
        fontSize: 2,
        fontWeight: "bold",
        fontFamily: "heading",
        lineHeight: "heading",
        margin: "1rem 0 0",
      },
      h4: {
        color: "text",
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
        color: "text",
        fontSize: "text",
      },
      blockquote: {
        fontFamily: "body",
      },
      cite: {
        fontFamily: "body",
      }
    },
  }
  
  export default theme