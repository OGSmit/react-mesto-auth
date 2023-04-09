import { useState } from "react"
import { authorize } from "../utils/Auth";
import { useNavigate } from 'react-router-dom';

function SignIn(props) {
  const [formValue, setFormValue] = useState({});
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
    authorize(password, email).then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        navigate('/main', { replace: true })
        props.loggedIn();
        return res
      } return console.log('err')
    }).then(() => {
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