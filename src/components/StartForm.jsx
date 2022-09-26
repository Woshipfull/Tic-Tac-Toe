import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { setUserName, setState } from "../slices/appStateSlice.js";

function StartForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [formInvalid, setFormInalid] = useState(false);
  const dispatch = useDispatch();

  const floatClassName = cn("d-block", "mb-3", { "text-danger": formInvalid });
  const inputClassName = cn({
    "form-control": formInvalid,
    "is-invalid": formInvalid,
  });

  const handleChange = ({ target: { value } }) => setName(value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      return setFormInalid(true);
    }
    dispatch(setUserName(name.toUpperCase()));
    dispatch(setState("transitional"));
    setUserName("");
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="px-3 py-5">
        <div className="text-center mb-5">
          <h1>{t("form.greeting")}</h1>
          <p className="h5">{t("form.welcome")}</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-sm-12 col-xl-10">
              <Form.Label>{t("form.label")}</Form.Label>
              <FloatingLabel
                className={floatClassName}
                label={t("form.placeholder")}
              >
                <Form.Control
                  onChange={handleChange}
                  value={name}
                  type="text"
                  placeholder={t("form.placeholder")}
                  className={inputClassName}
                />
              </FloatingLabel>
              <Button className="w-100" size="lg" variant="light" type="submit">
                {t("form.button")}
              </Button>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default StartForm;
