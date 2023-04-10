import React from "react"

function ConfirmDeletePopup({ isOpened, onClose, onSubmit, isApiProcessing }) {

  function handleClick(e) {
    e.stopPropagation();
    onClose();
  }

  function handleClickForChildren(e) {
    e.stopPropagation();
    return
  }

  return (
    <div className={isOpened ? 'popup popup_opened' : 'popup'} onClick={handleClick} id="popup_confirm">
      <div className="popup__container popup__container_form popup__container_target" onClick={handleClickForChildren}>
        <form className="popup__form" onSubmit={onSubmit} name="confirm-form" noValidate>
          <button className="popup__buttons-close" onClick={onClose} type="button"></button>
          <h3 className="popup__title" >Вы уверены?</h3>
          <button className="popup__buttons-save " type="submit">{isOpened && isApiProcessing ? 'Удаляю..' : 'Да'}</button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmDeletePopup