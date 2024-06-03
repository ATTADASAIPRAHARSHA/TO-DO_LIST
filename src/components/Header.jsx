import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="logo"><img src="to-do-list.png" width={60} height={60} alt=" img" /></div>
        <div className="Navlist">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
