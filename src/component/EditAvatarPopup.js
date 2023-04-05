import { useRef, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false)
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  function handleChangeLink(e) {
    setValidationMessage(e.target.validationMessage)
    setIsValid(e.target.validity.valid)
  }

  useEffect(() => {
    inputRef.current.value = '';
    setValidationMessage('');
    setIsValid(false);
  }, [props.isOpened])

  return (
    <PopupWithForm isValid={isValid} onSubmit={handleSubmit} buttonText={props.isOpened && props.isApiProcessing ? 'Сохраняю...' : 'Сохранить'} isOpened={props.isOpened} onClose={props.onClose} name="popup_edit-avatar" title="Обновить аватар">
      <input
        ref={inputRef || ''}
        onChange={handleChangeLink}
        type="url"
        id="link"
        className="popup__inputs popup__inputs_type_hobby"
        placeholder="Ссылка на картинку"
        name="avatar"
        required=""
        minLength={2}
      />
      <span className={validationMessage.length < 1 ? "link-error popup__input-error" : "link-error popup__input-error popup__input-error_visible"} >{validationMessage}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;