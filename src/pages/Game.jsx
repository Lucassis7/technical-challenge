import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Game() {
  const history = useNavigate();

  const [locationArray, setLocationArray] = useState([]);
  const [excludedPoints, setExcludedPoints] = useState([]);

  const onClickLogout = () => {
    localStorage.removeItem('userLogged');
    history('/');
  };

  const onUndoClick = () => {
    if (locationArray.length > 0) {
      const newPoint = locationArray.pop();
      setExcludedPoints([...excludedPoints, newPoint]);
    }
  };

  const onReundoClick = () => {
    if (excludedPoints.length > 0) {
      const returnedPoint = excludedPoints.pop();
      setLocationArray([...locationArray, returnedPoint]);
    }
  };

  const paintClick = (e) => {
    const location = {
      x: e.screenX,
      y: e.screenY,
    }

    setLocationArray([...locationArray, location]);
  };

  return (
    <div>
      <div className="header-container">
        <span className="username">{ JSON.parse(localStorage.getItem('userLogged')) }</span>
        <button 
          className="button-logout"
          type="button"
          onClick={ onClickLogout }
        >
          LOGOUT
        </button>
      </div>
      <div className="buttons-undo-reundo">
        <button
          className="button-game"
          type="button"
          onClick={ onUndoClick }
        >
          UNDO
        </button>
        <button
          className="button-game"
          type="button"
          onClick={ onReundoClick }
        >
          REUNDO
        </button>
      </div>
      <div onClick={ paintClick } style={{ width: '80%', height: '80vh', background: 'white', margin: 'auto', borderRadius: '20px' }}>
        { locationArray.map((element, index) => {
          return (
            <div key={index} style={
              { 
                left: element.x - 1.5,
                top: element.y - 105,
                position: 'absolute',
                width: '5px',
                height: '5px',
                background: 'blue',
              }
            }></div>
          )
        })}
      </div>
    </div>
  )
}