import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpenses, removeExpenses } from '../redux/actions';

class Table extends Component {
  handleRemoveExpense = (id) => {
    const { dispatch, expenses } = this.props;
    const remove = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpenses(remove));
  };

  handleEditExpense = (id, expenseToEdit) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id, expenseToEdit));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Tag</th>
              <th>Payment method</th>
              <th>Value</th>
              <th>Coins</th>
              <th>Exchange used</th>
              <th>Converted value</th>
              <th>Conversion currency</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.description }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(
                    expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2) }

                </td>
                <td>
                  { Number(expense.value
                * expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="input-form"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditExpense(expense.id, expense) }
                  >
                    To Edit
                  </button>
                  <button
                    className="input-form"
                    data-testid="delete-btn"
                    onClick={ () => this.handleRemoveExpense(expense.id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>)) }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    newExpense: state.wallet.newExpense,
  };
}

Table.propTypes = {
  expenses: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
