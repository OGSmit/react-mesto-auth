import '../index.css';
import React from 'react';
import logo from '../images/logo.svg'
function Header() {
  return (
    <header className="header">
      <img alt="Логотип - Место" src={logo} className="header__logo" />
      <img alt="Codewars" src='https://www.codewars.com/users/OGSmit/badges/small' className="header__codewars" />
    </header>
  )
}

export default Header

// className="header__codewars" в header.css