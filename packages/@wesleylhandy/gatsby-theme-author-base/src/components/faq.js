import React from "react"

const Faq = ({ question, answer }) => (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
        <h2 itemProp="name">{question}</h2>
        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <div itemProp="text" dangerouslySetInnerHTML={{__html: answer}} />
        </div>
    </div>
)

export default Faq