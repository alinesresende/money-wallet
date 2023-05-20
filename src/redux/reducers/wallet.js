// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { COINS_WALLET, EDIT_EXPENSES, EXPESENSE_WALLET, NEW_EXPENSES } from '../actions';

const INFO_WALLET = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  editExpense: {},
};

const wallet = (state = INFO_WALLET, action) => {
  switch (action.type) {
  case COINS_WALLET: {
    return {
      ...state,
      currencies: action.coins,
    };
  }
  case EXPESENSE_WALLET: {
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  }
  case 'REMOVE_EXPENSES': {
    return {
      ...state,
      expenses: action.expenseRemove,
    };
  }
  case EDIT_EXPENSES: {
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
      editExpense: action.expenseToEdit,
    };
  }
  case NEW_EXPENSES: {
    return {
      ...state,
      expenses: action.newExpense,
      editor: false,
    };
  }
  default: return state;
  }
};

export default wallet;
