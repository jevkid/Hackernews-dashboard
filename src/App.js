import React from 'react';
import { render } from 'react-dom';

import Container from './components/Container';
import Header from './components/Header';

import './styles/main.less';

render(
  <div>
    <Header text="Hacker News" />
    <Container />
  </div>,
  document.querySelectorAll('#rootElement')[0]
);