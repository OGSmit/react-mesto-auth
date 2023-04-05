

function SignUp() {
  return(
    <section className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>
      <form className="sign-up__form">
        <input placeholder="Email" className="sign-up__input"></input>
        <input placeholder="Пароль" className="sign-up__input"></input>
        <button className="sign-up__button">Зарегистрироваться</button>
      </form>
      <p className="sign-up__registration-question">Уже зарегистрированы?</p>
    </section>
  )
}

export default SignUp