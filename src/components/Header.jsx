import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setState } from "../slices/appStateSlice.js";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const lngs = {
  en: "En",
  de: "De",
  uk: "Uk",
};

function Header() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setState("start"));
  };

  const lngsBtnsRender = () =>
    Object.keys(lngs).map((lng) => {
      if (i18n.resolvedLanguage === lng) {
        return (
          <Button variant="info" key={lng} disabled>
            {lngs[lng]}
          </Button>
        );
      }
      return (
        <Button
          variant="outline-info"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng]}
        </Button>
      );
    });

  return (
    <Navbar bg="white" className="shadow-sm">
      <Container>
        <div className="logo d-flex mt-2" onClick={handleClick}>
          <span className="h2 m-0 text-success">T</span>
          <span className="h3 m-0 text-danger">i</span>
          <span className="h3 m-0 text-info">c</span>
          <span className="h3 m-0 text-success">-</span>
          <span className="h3 m-0 text-danger">T</span>
          <span className="h3 m-0 text-info">a</span>
          <span className="h3 m-0 text-success">c</span>
          <span className="h3 m-0 text-danger">-</span>
          <span className="h3 m-0 text-info">T</span>
          <span className="h3 m-0 text-success">o</span>
          <span className="h3 m-0 text-danger">e</span>
        </div>
        <ButtonGroup size="sm ml-5">{lngsBtnsRender()}</ButtonGroup>
      </Container>
    </Navbar>
  );
}

export default Header;
