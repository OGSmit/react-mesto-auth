import { useState } from "react"

function SignIn({ onLogin }) {
  const [formValue, setFormValue] = useState({});
  // const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  // const [isInvalidPassword, setIsInvalidPassword] = useState(false)
  // const isFormValid = isInvalidEmail && isInvalidPassword

  function handleChangeEmail(e) {
    // setIsInvalidEmail(e.target.validity.valid)
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleChangePassword(e) {
    // setIsInvalidPassword(e.target.validity.valid)
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = formValue;
    onLogin(password, email)
      .then(() => {
        e.target.reset()
      })
  }

  return (
    <section className="sign-up">
      <h1 className="sign-up__title">Вход</h1>
      <form onSubmit={handleSubmit} className="sign-up__form">
        <input required minLength={2} type="email" onChange={handleChangeEmail} placeholder="Email" name="email" className="sign-up__input"></input>
        <input required minLength={5} type="password" onChange={handleChangePassword} placeholder="Пароль" name="password" className="sign-up__input"></input>
        <button className='sign-up__button'>Войти</button>
      </form>
    </section>
  )
}

export default SignIn