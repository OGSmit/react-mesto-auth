import React from "react"
import succesIcon from '../images/succes.png'
import denied from '../images/denied.png'

function InfoTooltip(props) {
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
        <img src={props.title ? succesIcon : denied} />
        <h3 className="popup__title-tooltip">{props.message}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip