import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import arrow_icon from '../assets/arrow_icon.png'
import { CoinContext } from '../Context/CoinContextDef'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const {setCurrency} = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  const currencyHandler = (event)=> {
    switch(event.target.value) {
      case "USD":
        setCurrency({
          name: "USD",
          symbol: "$"
        })
        break;
      case "EUR":
        setCurrency({
          name: "EUR",
          symbol: "€"
        })
        break;
      case "INR":
        setCurrency({
          name: "INR",
          symbol: "₹"
        })
        break;
      default:
        setCurrency({
          name: "USD",
          symbol: "$"
        })
    }
  }

  return (
    <nav className='navbar'>
      <div className="navbar-logo">
        <Link to={"/"}>
        <h2>Crypto-Market</h2>
      </Link>
      </div>

      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <Link to ={"/"}><li className="active">Home</li></Link>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>

      <div className='nav-right'>
        <select onChange={currencyHandler} className="currency-select">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        
        <button className="signup-btn">
          Sign Up
          <img src={arrow_icon} alt="arrow" />
        </button>

        {/* <button 
          className={`menu-btn ${isMenuOpen ? 'active' : ''}`} 
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          aria-label="Toggle menu"
        > */}
          {/* <span></span>
          <span></span>
          <span></span>
        </button> */}
      </div>
    </nav>
  )
}

export default Navbar
