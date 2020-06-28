import React from "react"
import Layout from "../components/layout"

const FourOhFour = ({location}) => (
    <Layout heading="404 Not Found" location={location}>
        The page you were looking for does not exist...
    </Layout>
)

export default FourOhFour