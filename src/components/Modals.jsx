import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useTranslation } from "react-i18next";

function MyModal(props) {
  const { clickHandle, type, show } = props;
  const { t } = useTranslation();

  const modalText = {
    userWin: {
      title: t("modal.titleWin"),
      message: t("modal.messageWin"),
      button: t("modal.again"),
    },
    userLoss: {
      title: t("modal.titleLoss"),
      message: t("modal.messageLoss"),
      button: t("modal.again"),
    },
    draw: {
      title: t("modal.titleDraw"),
      message: t("modal.messageDraw"),
      button: t("modal.again"),
    },
  };

  return (
    <>
      <Modal show={show} centered backdrop="static" keyboard={false}>
        <Modal.Header className="text-center">
          <Modal.Title>{modalText[type].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText[type].message}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={clickHandle}>
            {modalText[type].button}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
