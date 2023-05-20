import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../index.css';
import requestUserEmail from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  handleDisabledButton = () => {
    const { password, email } = this.state;
    const mixPassword = 6;
    return password.length < mixPassword || !this.validateEmail(email);
  };

  handleClickButton = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    dispatch(requestUserEmail(email));
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container-master-login">
        <h1> TrybeWallet </h1>
        <div className="container-login">
          <input
            className="input-login"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
            placeholder="e-mail"
            value={ email }
            type="email"
          />
          <input
            className="input-login"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="password"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            className="button-login"
            disabled={ this.handleDisabledButton() }
            onClick={ this.handleClickButton }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.email,
  };
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
