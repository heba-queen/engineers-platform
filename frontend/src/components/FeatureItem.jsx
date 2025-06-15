import React from 'react'

const FeatureItem = (props) => {
  const { img, title, body } = props
  return (
    <div className="col-md-4">
      <div className="FeaturesCon">
        <img src={img} />
        <h2>{title}</h2>
        <span>{body}</span>
      </div>
    </div>
  )
}

export default FeatureItem