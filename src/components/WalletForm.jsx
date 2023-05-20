import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchApiWallet, requestAddExpenses } from '../redux/actions';
import apiWallet from '../servers/apiWallet';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiWallet());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCallApi = async () => {
    const currenciesData = await apiWallet();
    const { dispatch, expenses } = this.props;
    const lastExpense = expenses[expenses.length - 1];
    const idExpense = lastExpense ? lastExpense.id + 1 : 0;
    dispatch(requestAddExpenses({
      id: idExpense,
      ...this.state,
      exchangeRates: currenciesData,
    }));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <div className="container-walletForm">
        <label
          htmlFor="value-label"
        >
          <input
            className="input-form"
            data-testid="value-input"
            placeholder="number"
            type="number"
            name="value"
            onChange={ this.handleChange }
            value={ value }
            id="value-label"
          />
        </label>
        <label htmlFor="description-label">
          <input
            className="input-form"
            data-testid="description-input"
            placeholder="description"
            type="text"
            name="description"
            onChange={ this.handleChange }
            value={ description }
            id="description-label"
          />
        </label>
        <label
          htmlFor="currency-label"
        >
          <select
            className="input-form"
            data-testid="currency-input"
            placeholder="coins"
            id="currency-label"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >

            { currencies.map((coin) => (
              <option key={ coin }>
                { coin }
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="method-label"
        >
          <select
            className="input-form"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
            id="method-label"
          >
            <option selected>Money</option>
            <option>Credit card</option>
            <option>Debit card</option>
          </select>
        </label>
        <label
          htmlFor="tag-label"
        >
          <select
            className="input-form"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
            id="tag-label"
          >
            <option>Food</option>
            <option>Work</option>
            <option>Leisure</option>
            <option>Transport</option>
            <option>Health</option>
          </select>
        </label>
        <button
          className="input-form"
          onClick={ this.handleCallApi }
        >
          Add Expense
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
  };
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(WalletForm);
