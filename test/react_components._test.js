import React from 'react';
import ReactDOM from 'react-dom/client';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../src/App';
import Header from '../src/components/Header';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import LocationInfo from '../src/components/LocationInfo';

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

describe('Render React App', () => {
    test('render Heading', () => {
        act(() => {
            ReactDOM.createRoot(container).render(<App />);
        });
        expect(screen.getByRole('heading', { name: /Distance Calculator/i })
        );
    });
    test('render App', () => {
        act(() => {
            ReactDOM.createRoot(container).render(
                <App />
            );
        });
        // const button = container.querySelector('button');
        // expect(button.textContent).toBe('Calculate');
        // const countryParagraph = container.querySelector('p');
        // expect(countryParagraph.textContent).toBe('Country:');
        // const inputText = container.querySelector('input');
        // inputText.textContent = '92.247.232.56';
        // expect(inputText.textContent).toBe('92.247.232.56');
        // act(() => {
        //     button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        //   });
        // const country = container.querySelector('[name=country]');
        // expect(country.textContent).toBe('Bulgaria');
    });
});