import React from "react"

const Faq = ({ question, answer }) => (
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h3 itemprop="name">{question}</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text" dangerouslySetInnerHTML={{__html: answer}} />
        </div>
    </div>
)

export default Faq