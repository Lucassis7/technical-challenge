import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Game from './pages/Game';
import './styles/index.css';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Login /> } />
      <Route path="/register" element={ <SignUp /> } />
      <Route path="/game" element={ <Game />} />
    </Routes>
  )
}

export default App
