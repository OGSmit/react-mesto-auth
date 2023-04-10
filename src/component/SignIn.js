import { useState } from "react"

function SignIn({ onLogin }) {
  const [formValue, setFormValue] = useState({});

  function handleChange(e) {
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
        <input required type="email" onChange={handleChange} placeholder="Email" name="email" className="sign-up__input"></input>
        <input required type="password" onChange={handleChange} placeholder="Пароль" name="password" className="sign-up__input"></input>
        <button className="sign-up__button">Войти</button>
      </form>
    </section>
  )
}

export default SignIn