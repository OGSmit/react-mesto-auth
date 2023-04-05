import '../index.css';
import React from 'react';

function PopupWithForm(props) {

  function handleClick(e) {
    e.stopPropagation();
    props.onClose();
  }

  function handleClickForChildren(e) {
    e.stopPropagation();
    return
  }
  

  return (
    <div onClick={handleClick} className={props.isOpened ? 'popup popup_opened' : 'popup'} id={props.name}>
      <div onClick={handleClickForChildren} className="popup__container popup__container_form popup__container_target">
        <button className="popup__buttons-close" type="button" onClick={props.onClose} />
        <h3 className="popup__title">{props.title}</h3>
        <form onSubmit={props.onSubmit} className="popup__form" name={props.name} noValidate>
          {props.children}
          <button disabled={!props.isValid}
                  className={props.isValid ? "popup__buttons-save " : "popup__buttons-save popup__buttons-save_invalid"} 
                  type="submit">{props.buttonText}
            </button>
        </form>
      </div>
    </div>
  )
}
//props.isValid 
export default PopupWithForm