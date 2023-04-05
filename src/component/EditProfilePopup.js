import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [descriptionValidationMessage, setDescriptionValidationMessage] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  function handleChangeName(e) {
    setName(e.target.value);
    setNameValidationMessage(e.target.validationMessage);
    setIsNameValid(e.target.validity.valid);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
    setDescriptionValidationMessage(e.target.validationMessage);
    setIsDescriptionValid(e.target.validity.valid)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsDescriptionValid(true);
    setIsNameValid(false);
  }, [currentUser, props.isOpened]);

  return (
    <PopupWithForm onSubmit={handleSubmit}
      isValid={isNameValid && isDescriptionValid}
      buttonText={props.isOpened && props.isApiProcessing ? 'Сохраняю...' : 'Сохранить'}
      isOpened={props.isOpened} onClose={props.onClose}
      name="popup_edit-profile"
      title="Редактировать профиль">
      <input
        value={name || ''}
        onChange={handleChangeName}
        id="username"
        type="text"
        className="popup__inputs popup__inputs_type_name"
        name="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className={nameValidationMessage.length < 1 ?
        "username-error popup__input-error" : "username-error popup__input-error popup__input-error_visible"} >{nameValidationMessage}</span>
      <input
        value={description || ''}
        onChange={handleChangeDescription}
        id="hobby"
        type="text"
        className="popup__inputs popup__inputs_type_hobby"
        name="about"
        placeholder="Вид деятельности"
        minLength={2}
        maxLength={200}
        required=""
      />
      <span className={descriptionValidationMessage.length < 1 ?
        "username-error popup__input-error" : "username-error popup__input-error popup__input-error_visible"} >{descriptionValidationMessage}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup