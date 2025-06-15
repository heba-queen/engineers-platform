import React from 'react'

const QuestionItem = (props) => {
    const {num, que, ans}= props
    return (
        <div className="tap">
            <input type="radio" name="acc" id={num} />
            <label for={num}>
                <h2>Q{num}</h2>
                <h3>{que}</h3>
            </label>
            <div className="content">
                <p>{ans}</p>
            </div>
        </div>
    )
}

export default QuestionItem