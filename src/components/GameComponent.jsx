import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import update from "immutability-helper";

import isWinner from "./gameInstruments/isWinner.js";
import Easy from "./gameInstruments/Easy.js";
import Normal from "./gameInstruments/Normal.js";
import { setState } from "../slices/appStateSlice.js";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import xIcon from "../styles/images/x.png";
import oIcon from "../styles/images/o.png";

const strategies = {
  easy: () => new Easy(),
  normal: () => new Normal(),
};

const fieldBuilder = () => [
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null),
];

function Game() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.appState);

  const [field, setField] = useState(fieldBuilder());
  const [currentMove, setMove] = useState("firstPlayer");
  const [winModal, setWinModal] = useState(false);
  const [lossModal, setLossModal] = useState(false);

  const players = {
    firstPlayer: {
      plays: state.starts,
      name: state.starts === "user" ? state.userName : t("game.computerName"),
      icon: xIcon,
    },
    secondPlayer: {
      plays: state.starts === "user" ? "ai" : "user",
      name: state.starts !== "user" ? state.userName : t("game.computerName"),
      icon: oIcon,
    },
  };

  const user = state.starts === "user" ? "firstPlayer" : "secondPlayer";
  const ai = state.starts === "user" ? "secondPlayer" : "firstPlayer";
  const aiStrategy = strategies[state.level]();

  const modalsText = {
    titleWin: t("modal.titleWin"),
    messageWin: t("modal.messageWin"),
    titleLoss: t("modal.titleLoss"),
    messageLoss: t("modal.messageLoss"),
    button: t("modal.again"),
  };

  const handleClick = (e) => {
    const [x, y] = e.target.value.split(",");
    const nextMove =
      currentMove === "firstPlayer" ? "secondPlayer" : "firstPlayer";
    const newState = update(field, { [x]: { [y]: { $set: currentMove } } });
    setField(newState);
    setMove(nextMove);
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
              <img
                className="cell-img"
                src={players[col].icon}
                alt={players[col].plays}
              />
            </Button>
          );
        })}
      </div>
    ));

  useEffect(() => {
    if (currentMove === ai) {
      const [x, y] = aiStrategy.getNextStep(field);
      const nextMove =
        currentMove === "firstPlayer" ? "secondPlayer" : "firstPlayer";
      const newState = update(field, { [x]: { [y]: { $set: currentMove } } });
      setField(newState);
      setMove(nextMove);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMove]);

  useEffect(() => {
    if (isWinner(field, user)) {
      return setWinModal(true);
    }
    if (isWinner(field, ai)) {
      return setLossModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);

  return (
    <>
      <Modal show={winModal} centered backdrop="static" keyboard={false}>
        <Modal.Header className="text-center">
          <Modal.Title>{modalsText.titleWin}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalsText.messageWin}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReset}>
            {modalsText.button}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={lossModal} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{modalsText.titleLoss}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalsText.messageLoss}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleReset}>
            {modalsText.button}
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="shadow-sm">
        <Card.Body className="p-5">
          <div className="text-center mb-3">
            <h1>{t("game.title")}</h1>
          </div>
          <div className="d-flex mb-3">
            <div className="col d-flex align-items-center justify-content-end">
              <p className="m-0 font-weight-light">
                {players.firstPlayer.name}
              </p>
              <img
                className="player-img mx-2"
                src={players.firstPlayer.icon}
                alt="xIcon"
              />
            </div>
            <span className="h1 fw-lighter">|</span>
            <div className="col d-flex align-items-center">
              <img
                className="player-img mx-2"
                src={players.secondPlayer.icon}
                alt="oIcon"
              />
              <p className="m-0 font-weight-light">
                {players.secondPlayer.name}
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="col-10 col-sm-10 col-xl-8 d-flex flex-column align-items-center">
              <Card className="shadow mb-4">{tableBuilder(field)}</Card>
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

export default Game;
