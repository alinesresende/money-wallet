import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import EditExpense from '../components/EditExpense';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        { editor ? <EditExpense /> : <WalletForm /> }
        <Table />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editor: state.wallet.editor,
    newExpense: state.newExpense,
  };
}

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
