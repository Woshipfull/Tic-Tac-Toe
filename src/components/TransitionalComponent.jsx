import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { setStarts, setState, setLevel } from "../slices/appStateSlice.js";

const levelButtons = {
  easy: "Easy",
  normal: "Normal",
};

function Transitional() {
  const { t } = useTranslation();

  const [currentLevel, setCurrentLevel] = useState(null);
  const { userName, currentState } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const handleLevel = ({ target: { value } }) => setCurrentLevel(value);

  //VALIDATION!!!

  const handleClick = (e) => {
    const { value } = e.target;
    if (currentLevel === null) {
      return;
    }
    dispatch(setStarts(value));
    dispatch(setState("inGame"));
    dispatch(setLevel(currentLevel));
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-5">
        <div className="text-center mb-3">
          <h1>{t(`${currentState}.title`, { userName })}</h1>
        </div>
        <div className="d-flex flex-column align-items-center mb-3">
          <div className="col-12 col-sm-12 col-xl-10 text-center">
            <p>{t(`${currentState}.chooseLevel`)}</p>
            <ButtonGroup aria-label="chooseLevel" className="w-100" backdrop="static">
              {Object.keys(levelButtons).map((key) => {
                if (currentLevel === key) {
                  return (
                    <Button
                      key={key}
                      className={"active"}
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
