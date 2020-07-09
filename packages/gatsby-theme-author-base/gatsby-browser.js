require("./src/styles/tailwind.css")
exports.onClientEntry = () => {
    // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
    if (!(`IntersectionObserver` in window)) {
      require(`intersection-observer`)
      console.log(`# IntersectionObserver is polyfilled!`)
    }
}