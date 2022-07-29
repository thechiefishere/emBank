import React, { Component } from 'react';
import './Transaction.css';

export class Transaction extends Component {
  renderTransaction() {
    const { transactionType, amount, createdAt } = this.props.transaction;
    const date = new Date(Number(createdAt)).toString();
    let type = transactionType.toUpperCase();

    return (
      <div className='Transaction-Components'>
        <p>
          <span className='Span-1'>Date:</span> {date}
        </p>
        <p>
          <span className='Span-2'>Type:</span> {type}
        </p>
        <p>
          <span className='Span-3'>Amount:</span> ${amount}
        </p>
      </div>
    );
  }
  render() {
    return <div className='Transaction'>{this.renderTransaction()}</div>;
  }
}

export default Transaction;
