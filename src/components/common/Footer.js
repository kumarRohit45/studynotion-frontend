import React from 'react'
import Logo from "../../assets - Copy/Logo/Logo-Full-Light.png"
import {CiFacebook} from 'react-icons/ci'
import {AiOutlineGoogle,AiOutlineTwitter,AiFillYoutube} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-left'>
            <div className='footer-sec'>
              <ul>
                <li> <img src={Logo} alt="" /></li>
                <h4>Company</h4>
                <li>About</li>
                <li>Careers</li>
                <li>Affillates</li>
                <div>
                 <CiFacebook/>
                 <AiOutlineGoogle/>
                 <AiOutlineTwitter/>
                 <AiFillYoutube/>
                </div>
              </ul>
              

            </div>
            <div className='footer-sec footer-resources'>
                <h4>Resources</h4>
                <li>Articles</li>
                <li>Blog</li>
                <li>Chart Sheet</li>
                <li>Code Challenges</li>
                <li>Docs</li>
                <li>Projects</li>
                <li>Videos</li>
                <li>Workspaces</li>
                <h4>Support</h4>
                <li>Help Center</li>
            </div>
            <div className='footer-sec'>
                    <h4>Plans</h4>
                    <li>Paid memberships</li>
                    <li>For students</li>
                    <li>Business Solutions</li>
                    <h4>Community</h4>
                    <li>Forums</li>
                    <li>Chapters</li>
                    <li>Events</li>
            </div>
        </div>
        <div className='footer-right'>
            <div className='footer-sec footer-right-1'>
                <h4>Subjects</h4>
                <li>AI</li>
                <li>Clound Computing</li>
                <h5>Code Foundation</h5>
                <li>Computer Science</li>
                <li>CyberSecurity</li>
                <li>Data Analytics</li>
                <li>Data Science</li>
                <li>Data Visualization</li>
                <li>Developer Tools</li>
                <li>DevOps</li>
                <li>Game Development</li>
                <li>IT</li>
                <li>Machine Learning</li>
                <li>Math</li>
                <li>Mobile Development</li>
                <li>Web Design</li>
                <li>Web Development</li>
            </div>
            <div className='footer-sec'>
                <h4>Languages</h4>
                <li>Bash</li>
                <li>C++</li>
                <li>C#</li>
                <li>Go</li>
                <li>HTML & CSS</li>
                <li>Java</li>
                <li>JavaScript</li>
                <li>Kotlin</li>
                <li>PHP</li>
                <li>Python</li>
                <li>R</li>
                <li>Ruby</li>
                <li>SQL</li>
                <li>Swift</li>
            </div>
            <div className='footer-sec'>
                <h4>Career Building</h4>
                <li>Career paths</li>
                <li>Career services</li>
                <li>Interview prep</li>
                <li>Professional certification</li>
                <li>Full Catalog</li>
                <li>Beta Content</li>
                <li></li>
            </div>
        </div>
    </div>
  )
}

export default Footer