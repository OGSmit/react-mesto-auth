import '../index.css';
import React from 'react';
import logo from '../images/logo.svg'
import BurgerMenu from './BurgerMenu';
import { useLocation } from 'react-router-dom';

// Поместил компонент BurgerMenu в хедер , т.к. он использует одинаковые пропсы , вроде логично )

function Header({onClose, toExit, toRegistration, email, isLoggedIn, toEnter, handleOpenBurger , handleCloseBurger, isBurgerOpened  }) {
  const location = useLocation()
  const isRegistaration = location.pathname === '/sign-up' ? true : false;
  return (
    <>
    <BurgerMenu onClose={onClose} email={email} isOpened={isBurgerOpened} isLoggedIn={isLoggedIn} toEnter={toEnter} toExit={toExit} toRegistration={toRegistration}/>
    <header className="header">
      <img alt="Логотип - Место" src={logo} className="header__logo" />
      <div className='header__account-container'>
        <button className={isBurgerOpened ? "header__button-burger_close": "header__button-burger" } onClick={isBurgerOpened ? handleCloseBurger : handleOpenBurger} />
        {isLoggedIn ? <p className='header__account-email'>{email}</p> : ''}
        <button onClick={isLoggedIn ? toExit : isRegistaration ? toEnter : toRegistration} className="header__button">{isLoggedIn ? 'Выйти' : isRegistaration ? 'Войти' : 'Регистрация'}</button>
      </div>
    </header>
    </>
  )
}

export default Header

// className="header__codewars" в header.css