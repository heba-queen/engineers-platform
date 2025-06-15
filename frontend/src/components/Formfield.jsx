import React from 'react'

const Formfield = (props) => {
    const {col, hint, type , name , onChange , error } = props
    return (
        <div className={col}>
            <div className="formgroup" style={{"width": "97% !important", 'paddingBottom':'20px'}}>
                <input onChange={onChange}  type={type} name={name} placeholder={hint} />
            { error && (<span className='text-danger'>{error}</span>)}
            </div>
        </div>
    )
}

export default Formfield