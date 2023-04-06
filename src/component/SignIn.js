import React from "react"
import { authorize } from "../utils/Auth";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [formValue, setFormValue] = React.useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
    console.log(formValue, 'lsdsol')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    console.log(password, email, 'lol')
    authorize(password, email).then((res) => {
      console.log(res);
      if(res.token) {
        localStorage.setItem('jwt', res.token);
        console.log('ok')
        return res
      } return console.log('err')
      // navigate('/main', {replace: true});
    })
    }
  

  return(
    <section className="sign-up">
      <h1 className="sign-up__title">Вход</h1>
      <form onSubmit={handleSubmit} className="sign-up__form">
        <input  onChange={handleChange} placeholder="Email" name="email" className="sign-up__input"></input>
        <input  onChange={handleChange} placeholder="Пароль" name="password" className="sign-up__input"></input>
        <button className="sign-up__button">Войти</button>
      </form>
      <p className="sign-up__registration-question">Уже зарегистрированы?<a className="sign-up__link" href="/sign-up">asd</a></p>
    </section>
  )
}

export default SignIn