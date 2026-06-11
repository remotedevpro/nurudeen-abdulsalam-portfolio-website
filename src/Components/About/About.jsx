import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import my_profile_photo from '../../assets/profile_photo.png'
const About = () => {
  return (
    <div id="about" className="about">
        <div  className="about-title">
            <h1>About Me</h1>
            <img src={theme_pattern}  alt="About me theme pattern" />
        </div>
        <div className="about-sections">
            <div className="about-left">
                <img src={my_profile_photo } alt="Profile photo"  className="about-me-image" />
            </div>
            <div className="about-right">
                <div className="about-para">
                    <p>
                        I’m a passionate Web Developer and IT Professional  
                        with a strong focus on creating dynamic, user-friendly web applications 
                        that merge design, functionality, and performance.
                    </p>
                    
                    <p>
                        My passion extends to collaborating with clients and teams to deliver solutions that not only meet but exceed expectations.

                    </p>
                    

                </div>
                <div className="about-skills">
                    <div className="about-skill"><p>HTML & CSS</p><hr style={{width:"70%"}} /></div>
                    <div className="about-skill"><p>React JS</p><hr style={{width:"50%"}} /></div>
                    <div className="about-skill"><p>JavaScript</p><hr style={{width:"60%"}} /></div>
                    <div className="about-skill"><p>Next JS</p><hr style={{width:"40%"}} /></div>
                    <div className="about-skill"><p>Django (Python)</p><hr style={{width:"60%"}} /></div>
                    <div className="about-skill"><p>PostgreSQL</p><hr style={{width:"50%"}} /></div>
                    <div className="about-skill"><p>MongoDB</p><hr style={{width:"40%"}} /></div>
                    <div className="about-skill"><p>Git & GitHub</p><hr style={{width:"40%"}} /></div>
                    <div className="about-skill"><p>DevOps / Linux</p><hr style={{width:"60%"}} /></div>
                    <div className="about-skill"><p>Network Security</p><hr style={{width:"90%"}} /></div>
                    <div className="about-skill"><p>IT infrastructure and Systems Integration</p><hr style={{width:"90%"}} /></div>
                    
                </div>
            </div>
        </div>
        <div className="about-achievements">
            <div className="about-achievement">
                <h1>10+</h1>
                <p>YEARS OF EXPERIENCE IN <br />WEB COMPUTING, <br />NETWORK SECURITY <br />AND IT SYSTEMS <br />INFRASTRUCTURE & INTEGRATION</p>
            </div>
            <hr />
            <div className="about-achievement">
                <h1>20+</h1>
                <p>PROJECTS COMPLETED</p>
            </div>
            <hr />
            <div className="about-achievement">
                <h1>15+</h1>
                <p>HAPPY CLIENTS AND PARTNERS</p>
            </div>
        </div>
      
    </div>
  )
}

export default About
