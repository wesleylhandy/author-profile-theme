module.exports = ({
    /* Key/Value Pairs as defaults, i.e. url = "https://some.cool.site/" */
    contentPath = "data",
    basePath = "/",
    ...options
}) => ({
    contentPath, basePath, options
})