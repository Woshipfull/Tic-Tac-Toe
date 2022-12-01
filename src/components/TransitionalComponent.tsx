import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { Store } from '../slices/types';
import { setStarts, setState, setLevel } from '../slices/appStateSlice';
import classNames from 'classnames';

interface LevelButtonsType {
  [name: string]: string;
}

const levelButtons: LevelButtonsType = {
  easy: 'Easy',
  normal: 'Normal',
};

function Transitional() {
  const { t } = useTranslation();

  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const { userName, currentState } = useSelector(
    (state: Store) => state.appState
  );
  const dispatch = useDispatch();

  const [isInvalidCurrentLevel, setIsInvalidCurrentLevel] = useState<
    boolean | null
  >(null);
  const chooseBtnsClass = classNames('w-100', {
    'choose-btns-animation': isInvalidCurrentLevel,
  });

  const stopAnimation = (): void => setIsInvalidCurrentLevel(null);

  const handleLevel = (e: React.MouseEvent) => {
    const { value } = e.target as HTMLButtonElement;
    setCurrentLevel(value);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { value } = e.target as HTMLButtonElement;
    if (currentLevel === null) {
      setIsInvalidCurrentLevel(true);
      return;
    }
    dispatch(setStarts(value));
    dispatch(setState('inGame'));
    dispatch(setLevel(currentLevel));
  };

  return (
    <Card className="shadow-sm mb-2">
      <Card.Body className="px-3 py-5">
        <div className="text-center mb-3">
          <h1 className="h2">{t(`${currentState}.title`, { userName })}</h1>
        </div>
        <div className="d-flex flex-column align-items-center mb-3">
          <div className="col-12 col-sm-12 col-xl-10 text-center">
            <p>{t(`${currentState}.chooseLevel`)}</p>
            <ButtonGroup
              aria-label="chooseLevel"
              className={chooseBtnsClass}
              onAnimationEnd={stopAnimation}
            >
              {Object.keys(levelButtons).map((key) => {
                if (currentLevel === key) {
                  return (
                    <Button
                      key={key}
                      className={'active'}
                      variant="outline-info"
                      onClick={handleLevel}
                      value={key}
                    >
                      {levelButtons[key]}
                    </Button>
                  );
                }
                return (
                  <Button
                    key={key}
                    onClick={handleLevel}
                    variant="outline-info"
                    value={key}
                  >
                    {levelButtons[key]}
                  </Button>
                );
              })}
            </ButtonGroup>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="col-12 col-sm-12 col-xl-10 text-center">
            <p>{t(`${currentState}.chooseWhoStarts`)}</p>
            <Button
              onClick={handleClick}
              variant="outline-warning"
              size="lg"
              className="w-100 mb-3"
              value="user"
            >
              {t(`${currentState}.button1`)}
            </Button>
            <Button
              onClick={handleClick}
              variant="outline-secondary"
              size="lg"
              className="w-100"
              value="ai"
            >
              {t(`${currentState}.button2`)}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Transitional;
