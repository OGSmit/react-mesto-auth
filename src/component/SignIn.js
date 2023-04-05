function SignIn() {
  return(
    <section className="sign-up">
      <h1 className="sign-up__title">Вход</h1>
      <form className="sign-up__form">
        <input placeholder="Email" className="sign-up__input"></input>
        <input placeholder="Пароль" className="sign-up__input"></input>
        <button className="sign-up__button">Войти</button>
      </form>
    </section>
  )
}

export default SignIn