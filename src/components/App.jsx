import React from 'react';
import Header from './Header'
import StartForm from './StartForm';
import Transitional from './TransitionalComponent';
import Game from './GameComponent';

import { useSelector } from 'react-redux';

const currentComponent = {
  start: () => <StartForm />,
  transitional: () => <Transitional />,
  inGame: () => <Game />,
  reset: () => <Transitional />,
};

function App() {
  const { currentState } = useSelector((state) => state.appState)
  console.log(currentState);
  return (
    <div className='h-100 d-flex flex-column'>
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-xs-12 col-md-8 col-xl-6">
            {currentComponent[currentState]()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
