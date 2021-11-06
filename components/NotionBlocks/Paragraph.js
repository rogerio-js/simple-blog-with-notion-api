import React from 'react'

const Paragraph = ({paragraph}) => {
    return (
        <>
         {paragraph.text && <p> {paragraph.text[0]?.plain_text} </p>}   
        </>
    )
}

export default Paragraph
