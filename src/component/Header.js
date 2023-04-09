import '../index.css';
import React from 'react';
import logo from '../images/logo.svg'

function Header({ toExit, toRegistration, email, isLoggedIn, toEnter }) {
  const isRegistaration = document.location.pathname === '/sign-up' ? true : false;

  return (
    <header className="header">
      <img alt="Логотип - Место" src={logo} className="header__logo" />
      <div className='header__account-container'>
        {isLoggedIn ? <p className='header__account-email'>{email}</p> : ''}
        <button onClick={isLoggedIn ? toExit : isRegistaration ? toEnter : toRegistration} className="header__button">{isLoggedIn ? 'Выйти' : isRegistaration ? 'Войти' : 'Регистрация'}</button>
      </div>
    </header>
  )
}

export default Header

// className="header__codewars" в header.css