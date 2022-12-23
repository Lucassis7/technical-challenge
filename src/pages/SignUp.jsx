import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyEmail from '../utils/verifyEmail';
import verifyPassword from '../utils/verifyPassword';

const MIN_NAME_LENGHT = 5;

export default function SignUp() {
  const history = useNavigate();

  const registeredUsers = [
    {
      username: "cloud99",
      password: "123456",
    },
    {
      username: "itinho_killer",
      password: "face123",
    },
    {
      username: "ZenKiller10",
      password: "senha123",
    }
];

useEffect(() => {
  localStorage.setItem('users', JSON.stringify(registeredUsers));
});

  const intialState = {
    userName: '',
    userBirthdate: '',
    userId: '',
    userEmail: '',
    userPassword: '',
  };

  const [userSingUp, setUserSignUp] = useState(intialState);
  const [signUpFail, setSignUpFail] = useState(false);

  const { userName, userBirthdate, userId, userEmail, userPassword } = userSingUp;

  const onSubmitClick = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem('users'));
    const userExists = data.some((user) => user.username === userId);
    if (userExists) {
      setSignUpFail(true);
    } else {
      const newData = [...data, { username: userId, password: userPassword }];
      localStorage.setItem('users', JSON.stringify(newData));
      history('/');
    }
  };

  const updateComponentState = (event) => {
    setUserSignUp((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  return (
    <div className="main-container">
      <form onSubmit={ onSubmitClick } className="form-container">
        <h1>MEMBER REGISTER</h1>
        <input
          className="input-container"
          type="text"
          name="userName"
          placeholder="Nome Completo"
          value={ userName }
          onChange={ (e) => updateComponentState(e) }
        />
        <input
          className="input-container"
          type="date"
          name="userBirthdate"
          placeholder="Data de Nascimento"
          value={ userBirthdate }
          onChange={ (e) => updateComponentState(e) }
        />
        <input
          className="input-container"
          type="text"
          name="userId"
          placeholder="Usuário"
          value={ userId }
          onChange={ (e) => updateComponentState(e) }
        />
        <input
          className="input-container"
          type="email"
          name="userEmail"
          placeholder="E-mail"
          value={ userEmail }
          onChange={ (e) => updateComponentState(e) }
        />
        <input
          className="input-container"
          type="password"
          name="userPassword"
          placeholder="Senha"
          value={ userPassword }
          onChange={ (e) => {
            setUserSignUp((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
          }}
        />
        { signUpFail && <p style={{ color: 'red', fontFamily: 'monospace', marginBottom: '10px' }}>Usuário já cadastrado...</p> }
        <div className="buttons-sign-up">
          <button
            className="button-container"
            type="submit"
            disabled={
              userName.length < MIN_NAME_LENGHT
              || !verifyEmail(userEmail)
              || !verifyPassword(userPassword)
            }
          >
            CADASTRAR
          </button>
          <button
            className="button-container"
            type="button"
            onClick={ () => { history('/') }}
          >
            VOLTAR
          </button>
        </div>
      </form>
    </div>
  )
}