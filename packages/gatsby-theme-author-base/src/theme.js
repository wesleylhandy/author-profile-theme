export const theme = {
    breakpoints: [
      '640px',
      '768px',
      '980px',
      '1280px',
      '1520px'
    ],
    space: [
      '0',
      '0.25rem',
      '0.5rem',
      '0.75rem',
      '1rem',
      '1.25rem',
      '1.5rem',
      '2rem',
      '2.5rem',
      '3rem',
      '4rem',
      '5rem',
      '6rem',
      '8rem',
      '10rem',
      '12rem',
      '14rem',
      '16rem',
    ],
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
      gray: [
        '#f8f9fa',
        '#ededed',
        '#D3D3D3',
        '#ced4da',
        '#9F9F9F',
        '#6c757d',
        '#5B5B5B',
        '#343a40',
        '#25282A',
      ],
      lightblue: '#579CA8',
      blue:    '#007bff',
      indigo:  '#6610f2',
      purple:  '#6f42c1',
      lightred: '#F24A39',
      pink:    '#E26657',
      red:     '#EF4C40',
      darkred: '#AC302B',
      orange:  '#fd7e14',
      yellow:  '#ffc107',
      green:   '#28a745',
      teal:    '#20c997',
      cyan:    '#17a2b8',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      background: "#fff",
      text: "gray.9",
      opaqueBackground: "rgba(255,255,255,.8)",
      primary: "#579CA8",
      secondary: "#e7dbba",
      tertiary: "#FF8D81",
      light: "gray.3",
      affiliations: "transparent",
      modes: {
        dark: {
          text: "gray.2",
          background: "#000",
          opaqueBackground: "rgba(0,0,0,.6)",
          primary: "#9AC3BF",
          secondary: "#EEDFB6",
          tertiary: "#AF3D31",
          light: "gray.7",
          affiliations: "#919191",
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
        color: "text",
        transition: "color 250ms ease-in-out",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        fontSize: 4,
        cursor: "pointer",
        "&:hover": {
          color: "tertiary"
        }
      }
    },
    buttons: {
      backgroundColor: "transparent",
      fontWeight: "bold",
      transition: "color 250ms ease-in-out, background-color 250ms ease-in-out",
      cursor: "pointer",
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
        cursor: "pointer",
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
        cursor: "pointer",
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
        cursor: "pointer",
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
        listStyleType: "none",
        padding: 0,
      },
      li: {
        borderBottom: "1px solid",
        borderColor: "gray.1",
        padding: 3,
        listStyle: "none",
        "&:focus-within,&:hover": {
          backgroundColor: "gray.1",
        },
      },
      a: {
        color: "primary",
        cursor: "pointer",
        wordBreak: `break-all`,
        "&:hover": {
          color: "gray.4"
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
        marginBlockStart: 0,
        marginBlockEnd: 0,
      },
      cite: {
        fontFamily: "body",
      },
    },
  }
  
  export default theme