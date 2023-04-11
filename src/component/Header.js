import '../index.css';
import React from 'react';
import logo from '../images/logo.svg'

function Header({ toExit, toRegistration, email, isLoggedIn, toEnter, handleOpenBurger , handleCloseBurger, isBurgerOpened  }) {
  const isRegistaration = document.location.pathname === '/sign-up' ? true : false;

  return (
    <header className="header">
      <img alt="Логотип - Место" src={logo} className="header__logo" />
      <div className='header__account-container'>
        <button className={isBurgerOpened ? "header__button-burger_close": "header__button-burger" } onClick={isBurgerOpened ? handleCloseBurger : handleOpenBurger} />
        {isLoggedIn ? <p className='header__account-email'>{email}</p> : ''}
        <button onClick={isLoggedIn ? toExit : isRegistaration ? toEnter : toRegistration} className="header__button">{isLoggedIn ? 'Выйти' : isRegistaration ? 'Войти' : 'Регистрация'}</button>
      </div>
    </header>
  )
}

export default Header

// className="header__codewars" в header.css