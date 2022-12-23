import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const MIN_PASS_LENGTH = 6;

export default function Login() {
  const history = useNavigate();

  const [loginFailed, setLoginFailed] = useState(false);

  const initialState = {
    loginUser: '',
    loginPassword: '',
  };

  const [userCredentials, setUserCredentials] = useState(initialState);
  const { loginUser, loginPassword } = userCredentials;

  const onSubmitClick = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem('users'));
    const userLogged = data.some((user) => user.username === loginUser && user.password === loginPassword);
    if (userLogged) {
      localStorage.setItem('userLogged', JSON.stringify(loginUser));
      history('/game');
    } else {
      setLoginFailed(true);
    }
  };

  const onRegisterClick = () => history('/register');

  return (
    <div className='main-container'>
      <form onSubmit={ onSubmitClick } className='form-container'>
        <h1>MEMBER LOGIN</h1>
        <input
          className="input-container"
          type="text"
          name="loginUser"
          placeholder="Usuário"
          value={ loginUser }
          onChange={ (e) => {
            setUserCredentials((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
          }}
        />
        <input
          className="input-container"
          type="password"
          name="loginPassword"
          placeholder="Senha"
          value={ loginPassword }
          onChange={ (e) => {
            setUserCredentials((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
          }}
        />
        { loginFailed && <p style={{ color: 'red', fontFamily: 'monospace', marginBottom: '10px' }}>Usuário ou Senha incorretos</p> }
        <button
          className="button-container"
          type="submit"
          disabled={ loginPassword.length < MIN_PASS_LENGTH }
        >
          LOGIN
        </button>
        <button
          className="button-container"
          type="button"
          onClick={ onRegisterClick }
        >
          CADASTRE-SE
        </button>
      </form>
    </div>
  )
}