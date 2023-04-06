import React from "react"
import InfoTooltip from "./InfoTooltip"
import { register } from "../utils/Auth";
import { useNavigate } from 'react-router-dom';

function SignUp() {
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
      console.log(res)
      if(res.ok) {
        setIsRegistartionDone(true)
        return res.json();
      } return console.log(res.status)
    }).then((res) => {
      console.log(res)
      setIsToolTipOpened(true)
      // navigate('/main', {replace: true});
    }
    ).catch((err) => {
      console.log(err)
    })
  }
  
  function closeToolTip() {
    setIsToolTipOpened(false)
  }


  return (
    <section className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="sign-up__form">
        <input onChange={handleChange} placeholder="Email" name="email" className="sign-up__input"></input>
        <input onChange={handleChange} placeholder="Пароль" name="password" className="sign-up__input"></input>
        <button className="sign-up__button">Зарегистрироваться</button>
      </form>
      <InfoTooltip onClose={closeToolTip} title={isRegistartionDone} isOpened={isToolTipOpened} />
    </section>
  )
}

export default SignUp