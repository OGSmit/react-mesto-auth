import React from "react"
import InfoTooltip from "./InfoTooltip"
import { register } from "../utils/Auth";
import { useNavigate } from 'react-router-dom';

function SignUp({loggedIn, handleSetEmail}) {
  const [formValue, setFormValue] = React.useState({});
  const [isToolTipOpened, setIsToolTipOpened] = React.useState(false)
  const [isRegistartionDone, setIsRegistartionDone] = React.useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    register(password, email).then((res) => {
      
      if (res.ok) {
        setIsRegistartionDone(true)
        return res.json();
      } return console.log(res.status)
    }).then((res) => {
      setIsToolTipOpened(true);
      handleSetEmail(res.data.email);
    }
    )
      .catch((err) => {
        console.log(err)
      })
  }

  function closeToolTip() {
    if(isRegistartionDone) {
      setIsToolTipOpened(false);
      loggedIn();
      navigate('/main', { replace: true });
    } setIsToolTipOpened(false);
  }


  return (
    <section className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="sign-up__form">
        <input required type="email" onChange={handleChange} placeholder="Email" name="email" className="sign-up__input"></input>
        <input required type="password" onChange={handleChange} placeholder="Пароль" name="password" className="sign-up__input"></input>
        <button className="sign-up__button">Зарегистрироваться</button>
      </form>
      <p className="sign-up__registration-question">Уже зарегистрированы? <a className="sign-up__link" href="/sign-in">Войти</a></p>
      <InfoTooltip onClose={closeToolTip} title={isRegistartionDone} isOpened={isToolTipOpened} />
    </section>
  )
}

export default SignUp