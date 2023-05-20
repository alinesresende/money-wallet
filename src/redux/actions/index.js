// Coloque aqui suas actions

import apiWallet from '../../servers/apiWallet';

export const USER_EMAIL = 'USER_EMAIL';
export const COINS_WALLET = 'COINS_WALLET';
export const EXPESENSE_WALLET = 'EXPESENSE_WALLET';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const NEW_EXPENSES = 'NEW_EXPENSES';

const requestUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestInfoUser = (coins) => ({
  type: COINS_WALLET,
  coins,
});

export const requestAddExpenses = (expense) => ({
  type: EXPESENSE_WALLET,
  expense,
});

export const removeExpenses = (expenseRemove) => ({
  type: REMOVE_EXPENSES,
  expenseRemove,
});

export const editExpenses = (id, expenseToEdit) => ({
  type: EDIT_EXPENSES,
  id,
  expenseToEdit,
});

export const newExpenseEdited = (newExpense) => ({
  type: NEW_EXPENSES,
  newExpense,
});

export default requestUserEmail;

export const fetchApiWallet = () => async (dispatch) => {
  const result = await apiWallet();
  const filteredCoins = Object.keys(result).filter((coin) => coin !== 'USDT');
  dispatch(requestInfoUser(filteredCoins));
};
