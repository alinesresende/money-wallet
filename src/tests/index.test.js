import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Page login', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const nameEmail = 'aline@gmail.com';

  const loginButton = screen.getByRole('button', { name: 'Entrar' });
  expect(loginButton).toBeInTheDocument();

  const inputEmail = screen.getByTestId('email-input');
  expect(inputEmail).toBeInTheDocument();

  const inputPassword = screen.getByTestId('password-input');
  expect(inputPassword).toBeInTheDocument();

  userEvent.type(inputEmail, nameEmail);
  userEvent.type(inputPassword, '1234');
  expect(loginButton).toHaveAttribute('disabled');

  userEvent.type(inputEmail, nameEmail);
  userEvent.type(inputPassword, '1234567');

  userEvent.click(loginButton);

  const { location: { pathname } } = history;
  expect(pathname).toBe('/carteira');
});

test('Page carteira', async () => {
  renderWithRouterAndRedux(<App />, {

    initialEntries: ['/carteira'],
  });

  const emailUser = screen.getByTestId('email-field');
  expect(emailUser).toBeInTheDocument();

  const BRL = screen.getByTestId('header-currency-field');
  expect(BRL).toBeInTheDocument();

  const valueInput = screen.getByTestId('value-input');
  userEvent.type(valueInput, '2');

  const descriptionInput = screen.getByTestId('description-input');
  userEvent.type(descriptionInput, 'despesa aline');

  const coinsInput = await screen.findByTestId('currency-input');
  userEvent.click(coinsInput, 'USD');

  const payInput = screen.getByTestId('method-input');
  userEvent.click(payInput, 'Dinheiro');

  const tagInput = screen.getByTestId('tag-input');
  userEvent.click(tagInput, 'Lazer');

  const buttonExpense = await screen.findByRole('button', { name: 'Adicionar Despesa' });
  expect(buttonExpense).toBeInTheDocument();
  userEvent.click(buttonExpense);

  const expenseDescription = await screen.findByText('despesa aline');
  expect(expenseDescription).toBeInTheDocument();
});
