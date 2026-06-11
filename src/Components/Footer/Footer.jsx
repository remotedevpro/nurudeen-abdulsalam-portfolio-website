import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/logo.png'
import user_icon from '../../assets/user_icon.svg'

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top-left">
            <img src={footer_logo} alt="footer_logo"  className='footer-logo'/>
            <p>
              I’m a Web Developer with a strong focus on creating dynamic, robust and  user-friendly web applications. 
            </p>
          </div>
          <div className="footer-top-right">
            <div className="footer-email-input">
              <img src={user_icon} alt="user icon" />
              <input type="email" placeholder='Enter your email' name='email' />
            </div>
            <div className="footer-subscribe">Subscribe</div>
          </div>
        </div>
        <hr />
        <div className="footer-bottom">
          <p className="footer-bottom-left">
            &copy; 2025 Nurudeen AbdulSalam. All rights reserved.
          </p>
          <div className="footer-bottom-right">
            <p>Terms of Services</p>
            <p>Privacy Policy</p>
            <p>Connect with me</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer
