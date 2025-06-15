import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = (props) => {
    const {img , title , link}= props
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <Link to={link}>
                <div style={{"width":"100%", "position": "relative"}}>
                    <img style={{"width": "100%"}} src={img} />
                    <span className="DepartmentName">{title}</span>
                </div>
            </Link>
        </div>
    )
}

export default CategoryItem