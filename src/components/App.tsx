import React from 'react';
import Header from './Header';
import StartForm from './StartForm';
import Transitional from './TransitionalComponent';
import Game from './GameComponent';

import { Store } from '../slices/types';
import { useSelector } from 'react-redux';

interface Components {
  [name: string]: React.ReactNode;
}

const currentComponent: Components = {
  start: <StartForm />,
  transitional: <Transitional />,
  inGame: <Game />,
  reset: <Transitional />,
};

const App: React.FC = () => {
  const { currentState } = useSelector((state: Store) => state.appState);
  return (
    <div className="h-100 d-flex flex-column">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-xs-12 col-md-8 col-xl-6">
            {currentComponent[currentState]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
