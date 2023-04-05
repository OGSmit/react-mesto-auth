import { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [linkValidationMessage, setLinkValidationMessage] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isLinkValid, setIsLinkValid] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    })
  }

  function handleChangeName(e) {
    setName(e.target.value)
    setNameValidationMessage(e.target.validationMessage);
    setIsNameValid(e.target.validity.valid);
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
    setLinkValidationMessage(e.target.validationMessage);
    setIsLinkValid(e.target.validity.valid);
  }

  useEffect(() => {
    setName('');
    setLink('');
    setIsLinkValid(false);
    setIsNameValid(true);
    setLinkValidationMessage('');
    setNameValidationMessage('');
  }, [props.isOpened])


  return (
    <PopupWithForm onSubmit={handleSubmit}
      isValid={isNameValid && isLinkValid}
      buttonText={props.isOpened && props.isApiProcessing ? 'Добавляю...' : 'Добавить'}
      isOpened={props.isOpened}
      onClose={props.onClose}
      name="popup_add-card"
      title="Новое место">
      <input
        value={name || ''}
        onChange={handleChangeName}
        type="text"
        id="place"
        className="popup__inputs popup__inputs_type_name"
        placeholder="Название"
        name="name"
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className={nameValidationMessage.length < 1 ?
        "place-error popup__input-error" : "place-error popup__input-error popup__input-error_visible"} >{nameValidationMessage}</span>
      <input
        value={link || ''}
        onChange={handleChangeLink}
        type="url"
        id="place-link"
        className="popup__inputs popup__inputs_type_hobby"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
      />
      <span className={linkValidationMessage.length < 1 ?
        "place-link-error popup__input-error" : "place-link-error popup__input-error popup__input-error_visible"} >{linkValidationMessage}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup