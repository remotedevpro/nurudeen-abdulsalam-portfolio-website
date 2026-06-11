import React from 'react'
import './Hero.css'
import my_profile_photo  from '../../assets/profile_photo.png' 
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id="home" className='hero'>
        <img src={my_profile_photo} alt='PROFILE IMAGE' />
        <h1>I'm<span> Nurudeen AbdulSalam,</span> a Passionate Web Developer. </h1>
        <p>Discover my projects and skills.</p>
        <div className='hero-action'>
          <div className="hero-connect"><AnchorLink className="anchor-link" offset={50} href="#contact">Connect with me</AnchorLink></div>
          <div className="hero-resume">My resume</div>

        </div>

      
    </div>
  )
}

export default Hero
