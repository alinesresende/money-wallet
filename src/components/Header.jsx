import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    const expenseTotal = expenses.reduce(
      (acc, curr) => (
        acc + Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask)
      ),
      0,
    );
    return (
      <div className="container-header">
        <p data-testid="email-field">
          E-mail:
          { ' ' }
          { user }
        </p>
        <p data-testid="total-field">
          Coins:
          { ' ' }
          { expenseTotal.toFixed(2) }

        </p>
        <p data-testid="header-currency-field"> Moeda: BRL</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.email,
    expenses: state.wallet.expenses,
  };
}
Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
