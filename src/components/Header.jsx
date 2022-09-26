import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setState } from "../slices/appStateSlice.js";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import LogoComponent from "./LogoComponent.jsx";

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
    <Navbar bg="white" className="shadow-sm mb-2">
      <Container>
        <LogoComponent clickHangle={handleClick} />
        <ButtonGroup size="sm ml-5">{lngsBtnsRender()}</ButtonGroup>
      </Container>
    </Navbar>
  );
}

export default Header;
