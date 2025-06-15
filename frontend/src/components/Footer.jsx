import React from 'react'
import facebook from '../assets/img/logos_facebook.png'
import whatsapp from '../assets/img/logos_whatsapp-icon.png'
import twitter from '../assets/img/akar-icons_twitter-fill.png'
import linkedin from '../assets/img/simple-icons_linkedin.png'
import logo from '../assets/img/logoBig.png'
import phone from '../assets/img/material-symbols_phone-callback-rounded.png'
import location from '../assets/img/material-symbols_location-on-outline.png'
import mail from '../assets/img/ic_baseline-email.png'

const Footer = () => {
    return (
        <footer>
            <img style={{ "width": "100px" }} src={logo} />

            <div className="conactInfo media">
                <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
                    <img src={phone} />
                    <span className='icons_footer'>0999341042</span>
                </div>
                <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <img src={location} />
                    <span className='icons_footer'>Saudi Arabia</span>
                </div>
                <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                    <img src={mail} />
                    <span className='icons_footer'>Saudi Arabia</span>
                </div>
            </div>

            
            <div className="sochialCon media footer-social-icons">
                <img src={facebook} />
                <img src={whatsapp} />
                <img src={twitter} />
                <img src={linkedin} />
            </div>
        </footer>
    )
}

export default Footer