import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newExpenseEdited } from '../redux/actions';

class EditExpense extends Component {
  state = {
    value: '',
    description: '',
    method: '',
    tag: '',

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleEditExpense = () => {
    const { expenses, editExpense, dispatch } = this.props;
    const editedExpenses = expenses.map((expense) => {
      if (expense.id === editExpense.id) {
        return { ...expense, ...this.state };
      }
      return expense;
    });
    dispatch(newExpenseEdited(editedExpenses));
  };

  render() {
    const { editExpense, currencies } = this.props;
    return (
      <div>
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
            defaultValue={ editExpense.value }
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
            defaultValue={ editExpense.description }
            id="description-label"
          />
        </label>
        <label
          htmlFor="currency-label"
        >
          <select
            className="input-form"
            data-testid="currency-input"
            id="currency-label"
            name="currency"
            // disabled
            onChange={ this.handleChange }
            defaultValue={ editExpense.currency }
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
            defaultValue={ editExpense.method }
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
            defaultValue={ editExpense.tag }
            id="tag-label"
          >
            <option selected>Food</option>
            <option>Work</option>
            <option>Leisure</option>
            <option>Transport</option>
            <option>Health</option>
          </select>
        </label>
        <button
          className="input-form"
          onClick={ () => this.handleEditExpense() }
        >
          Edit Expense
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editExpense: state.wallet.editExpense,
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
  };
}

EditExpense.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editExpense: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
  currencies: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(EditExpense);
