import { USER_EMAIL } from '../actions';

const USER_WALLAT = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = USER_WALLAT, action) => {
  switch (action.type) {
  case USER_EMAIL: {
    return {
      ...state,
      email: action.email,
    };
  }
  default: return state;
  }
};

export default user;
