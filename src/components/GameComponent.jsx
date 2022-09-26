import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setState } from "../slices/appStateSlice.js";
import Game from "../game_engine/Game.js";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import MyModal from "./Modals.jsx";

import PlayersComponent from "./PlayersComponent.jsx";

import xIcon from "../styles/images/x.png";
import oIcon from "../styles/images/o.png";

const icons = {
  x: xIcon,
  o: oIcon,
};
const game = new Game();

function GameComponent() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.appState);

  const [field, setField] = useState([]);
  const [gameState, setGameState] = useState({});
  const [winModalShow, setWinModalShow] = useState(false);
  const [lossModalShow, setLossModalShow] = useState(false);
  const [drawModalShow, setDrawModalShow] = useState(false);

  useEffect(() => {
    game.start(state.starts, state.level);
    const newField = game.getField();
    setField([...newField]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameState.isGameOver) {
      switch (gameState.winner) {
        case "user":
          setWinModalShow(true);
          break;
        case "ai":
          setLossModalShow(true);
          break;
        default:
          setDrawModalShow(true);
          break;
      }
    }
  }, [gameState]);

  const handleClick = (e) => {
    const [row, col] = e.target.value.split(",");
    game.move(row, col);
    const newField = game.getField();
    const newState = game.getState();
    setField([...newField]);
    setGameState({ ...newState });
  };

  const handleReset = () => {
    dispatch(setState("reset"));
  };

  const tableBuilder = (array) =>
    array.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`}>
        {row.map((col, colIndex) => {
          if (col === null) {
            return (
              <Button
                variant="outline-warning"
                className="cell"
                key={`col-${colIndex}`}
                value={[rowIndex, colIndex]}
                onClick={handleClick}
              />
            );
          }
          return (
            <Button
              variant="warning"
              className="cell"
              key={`col-${colIndex}`}
              value={[rowIndex, colIndex]}
              disabled
            >
              <img className="cell-img" src={icons[col]} alt={col} />
            </Button>
          );
        })}
      </div>
    ));

  return (
    <>
      <MyModal show={winModalShow} clickHandle={handleReset} type={"userWin"} />
      <MyModal
        show={lossModalShow}
        clickHandle={handleReset}
        type={"userLoss"}
      />
      <MyModal show={drawModalShow} clickHandle={handleReset} type={"draw"} />
      <Card className="shadow-sm">
        <Card.Body className="px-1 py-5">
          <div className="text-center mb-3">
            <h1 className="">{t("game.title")}</h1>
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
                {t("game.reset")}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default GameComponent;
