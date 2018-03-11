import React from 'react';
import { render } from 'react-dom';

import Container from './components/Container';
import Header from './components/Header';

render(
  <div>
    <Header text="Hackernews Dashboard" />
    <Container />
  </div>,
  document.querySelectorAll('#rootElement')[0]
);