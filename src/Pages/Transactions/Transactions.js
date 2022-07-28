import React, { Component } from 'react';
import './Transactions.css';
import { connect } from 'react-redux';
import Transaction from '../../Component/Transaction/Transaction';

export class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTransactions: [],
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const { token } = user;
    try {
      const data = await fetch('https://embank.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            query {
              getTransactions {
                transactionType,
                createdAt,
                amount,
                id
              }
            }
          `,
        }),
      });

      const response = await data.json();
      if (response?.errors?.[0].message) {
        throw new Error(response.errors[0].message);
      }
      const transactions = response?.data?.getTransactions;
      if (transactions) {
        this.setState({ allTransactions: transactions });
      }
    } catch (error) {
      console.log('error is ', error);
    }
  }

  renderTransactions() {
    const { allTransactions } = this.state;
    return (
      <section className='Transactions-Components'>
        <h1>Your Transaction History</h1>
        {allTransactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </section>
    );
  }

  render() {
    return (
      <section className='Transactions'>{this.renderTransactions()}</section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Transactions);
