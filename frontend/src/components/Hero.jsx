import React from 'react'
import logo from '../assets/img/logoBig.png'
import icon_join from '../assets/img/ion_add-circle-outline.png'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <header className="header">
        <div className="contaientBox">
            {/* <!-- <img src="{{ asset('user/img/Vector 1.png') }}"> --> */}
            <img src={logo}/>
            <span className="BoxTixt">Get your project from the best engineers and designers.
                Implement your engineering services in a professional, specialized and safe environment with simple steps.
                Add your project, get different offers and choose the most suitable one.</span>
            <Link className="addProjectBtn" to="/signup">
                <img src={icon_join}/>
                <span className="AddYourPro">Join our community</span>
            </Link>
        </div>
    </header>
  )
}

export default Hero