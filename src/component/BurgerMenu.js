import React from "react";

function BurgerMenu({isOpened, isLoggedIn, toEnter, toExit, toRegistration, email , onClose}) {
  const isRegistaration = document.location.pathname === '/sign-up' ? true : false;

  function handleClick(e) {
    e.stopPropagation();
    onClose();
  }

  function handleClickForChildren(e) {
    e.stopPropagation();
    return
  }

  return(
    <div onClick={handleClick} className={isOpened ? 'burger burger_opened' : 'burger'} >
        {isLoggedIn ? <p onClick={handleClickForChildren} className='burger__account-email'>{email}</p> : ''}
        <button onClick={isLoggedIn ? toExit : isRegistaration ? toEnter : toRegistration}
         className="burger__button">{isLoggedIn ? 'Выйти' : isRegistaration ? 'Войти' : 'Регистрация'}</button>
    </div>
  )
}

export default BurgerMenu

// burger burger_opened в header.css