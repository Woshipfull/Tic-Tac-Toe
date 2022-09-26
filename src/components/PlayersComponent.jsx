import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import xIcon from "../styles/images/x.png";
import oIcon from "../styles/images/o.png";

function PlayersComponent() {
  const state = useSelector((state) => state.appState);
  const { t } = useTranslation();

  const aiName = t("game.computerName");
  const userName = state.userName;

  const players =
    state.starts === "user"
      ? { first: userName, second: aiName }
      : { first: aiName, second: userName };

  return (
    <div className="d-flex mb-3">
      <div className="col d-flex align-items-center justify-content-end">
        <p className="m-0 font-weight-light">{players.first}</p>
        <img className="player-img mx-2" src={xIcon} alt="xIcon" />
      </div>
      <span className="h1 fw-lighter">|</span>
      <div className="col d-flex align-items-center">
        <img className="player-img mx-2" src={oIcon} alt="oIcon" />
        <p className="m-0 font-weight-light">{players.second}</p>
      </div>
    </div>
  );
}

export default PlayersComponent;
