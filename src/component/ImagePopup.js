
function ImagePopup(props) {

  function handleClick(e) {
    e.stopPropagation();
    props.onClose();
  }

  function handleClickForChildren(e) {
    e.stopPropagation();
    return
  }

  return (
    <div onClick={handleClick} className={props.isOpened ? 'popup popup_dark popup_opened' : 'popup popup_dark'} id="popup_image">
      <div onClick={handleClickForChildren} className="popup__container popup__container_target">
        <button className="popup__buttons-close" type="button" onClick={props.onClose} />
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <h2 className="popup__subtitle">{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup