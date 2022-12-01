import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setState } from '../slices/appStateSlice';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import LogoComponent from './LogoComponent';

interface LngsTypes {
  [key: string]: string;
}

const lngs: LngsTypes = {
  en: 'En',
  de: 'De',
  uk: 'Uk',
};

const Header = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = (): void => {
    dispatch(setState('start'));
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
        <LogoComponent clickHandle={handleClick} />
        <ButtonGroup size="sm">{lngsBtnsRender()}</ButtonGroup>
      </Container>
    </Navbar>
  );
};

export default Header;
