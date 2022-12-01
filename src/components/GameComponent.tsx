import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setState } from '../slices/appStateSlice';
import Game from '../game_engine/Game';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyModal from './Modals';

import { Store } from '../slices/types';
import PlayersComponent from './PlayersComponent';

import { Field, Cell, GameState } from '../game_engine/types';

import xIcon from '../styles/images/x.png';
import oIcon from '../styles/images/o.png';

type CellObj = { value: Cell; index: number };
type Row = Array<CellObj>;
type FieldWithRows = Array<Row>;

interface Icons {
  [key: string]: typeof xIcon | typeof oIcon;
}

const icons: Icons = {
  x: xIcon,
  o: oIcon,
};
const game = new Game();

const GameComponent: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const state = useSelector((state: Store) => state.appState);

  const [field, setField] = useState<Field>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: '',
    isGameOver: false,
    winner: null,
  });
  const [winModalShow, setWinModalShow] = useState(false);
  const [lossModalShow, setLossModalShow] = useState(false);
  const [drawModalShow, setDrawModalShow] = useState(false);

  useEffect(() => {
    game.start(state.starts, state.level);
    const newField = game.getField;
    setField([...newField]);
  }, [state.level, state.starts]);

  useEffect(() => {
    if (gameState.isGameOver) {
      switch (gameState.winner) {
        case 'user':
          setWinModalShow(true);
          break;
        case 'ai':
          setLossModalShow(true);
          break;
        default:
          setDrawModalShow(true);
          break;
      }
    }
  }, [gameState]);

  const handleClick = (e: React.MouseEvent) => {
    const { value } = e.target as HTMLButtonElement;
    game.move(+value);
    const newField = game.getField;
    const newState = game.getState;
    setField([...newField]);
    setGameState({ ...newState });
  };

  const handleTouch = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  };

  const handleReset = () => {
    dispatch(setState('reset'));
  };

  const fieldWithRows = (array: Field): FieldWithRows => {
    const result: FieldWithRows = [[], [], []];
    let rowIndex = 0;
    array.forEach((value, index) => {
      if (result[rowIndex].length === 3) {
        rowIndex += 1;
      }
      result[rowIndex].push({ value, index });
    });
    return result;
  };

  const tableBuilder = (array: Field) => {
    const field = fieldWithRows(array);
    return field.map((row: Row, rowIndex: number) => (
      <div key={`row-${rowIndex}`}>
        {row.map((col: CellObj) => {
          const { value, index } = col;
          if (value === null) {
            return (
              <Button
                variant="outline-warning"
                className="cell"
                key={`col-${index}`}
                value={index}
                onClick={handleClick}
              />
            );
          }
          return (
            <Button
              variant="warning"
              className="cell"
              key={`col-${index}`}
              value={index}
              disabled
            >
              <img className="cell-img" src={icons[value]} alt={value} />
            </Button>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <MyModal show={winModalShow} clickHandle={handleReset} type={'userWin'} />
      <MyModal
        show={lossModalShow}
        clickHandle={handleReset}
        type={'userLoss'}
      />
      <MyModal show={drawModalShow} clickHandle={handleReset} type={'draw'} />
      <Card className="shadow-sm mb-2" onTouchStart={handleTouch}>
        <Card.Body className="px-1 py-5">
          <div className="text-center mb-3">
            <h1 className="">{t('game.title')}</h1>
          </div>
          <PlayersComponent />
          <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-sm-12 col-xl-8 d-flex flex-column align-items-center">
              <Card className="shadow card-cell mb-4">
                {tableBuilder(field)}
              </Card>
              <Button
                onClick={handleReset}
                className="resetBtn"
                variant="outline-warning"
                size="lg"
              >
                {t('game.reset')}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default GameComponent;
