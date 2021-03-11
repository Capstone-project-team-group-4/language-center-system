import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  const linkElement = screen.getByText("Welcome to Language Center");
  expect(linkElement).toBeInTheDocument();
});
