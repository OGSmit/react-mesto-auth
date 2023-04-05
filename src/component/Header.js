import '../index.css';
import React from 'react';
import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <img alt="Логотип - Место" src={logo} className="header__logo" />
      <div className='header__account-container'>
        <p className='header__account-email'>lol@email.com</p>
        <button className="header__button">Выйти</button>
      </div>
    </header>
  )
}

export default Header

// className="header__codewars" в header.css