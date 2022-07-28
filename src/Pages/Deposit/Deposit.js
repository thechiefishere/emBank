import React, { Component } from 'react';
import './Deposit.css';
import { FcMoneyTransfer } from 'react-icons/fc';
import { RiLuggageDepositFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { setNotificationMessage, setUser } from '../../Redux/actions';

export class Deposit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountToDeposit: '',
      error: '',
      showLoading: false,
    };
  }

  async handleDepositClick(evt) {
    evt.preventDefault();
    this.setState({ error: '', showLoading: true });
    const { amountToDeposit } = this.state;
    const { user, setNotificationMessage, setUser } = this.props;
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
            mutation($amountToDeposit: Int!) {
              deposit(amountToDeposit: $amountToDeposit) {
                balance
              }
            }
          `,
          variables: {
            amountToDeposit: Number(amountToDeposit),
          },
        }),
      });

      const response = await data.json();
      if (response?.errors) {
        const err = response.errors[0].message;
        this.setState({ ...this.state, error: err });
      }
      if (response?.data?.deposit) {
        this.setState({
          amountToDeposit: '',
          error: '',
        });
        const customer = { ...user, balance: response.data.deposit.balance };
        setUser(customer);
        setNotificationMessage(`You made a deposit of $${amountToDeposit}`);
      }
    } catch (error) {
      console.log('error is ', error);
    }
  }

  renderForm() {
    const { amountToDeposit } = this.state;

    return (
      <form className='Deposit-Form'>
        <div className='FormGroup'>
          <FcMoneyTransfer />
          <input
            type='number'
            placeholder='Amount To Deposit'
            value={amountToDeposit}
            onChange={(evt) =>
              this.setState({
                ...this.state,
                amountToDeposit: evt.target.value,
              })
            }
          />
        </div>
        <button
          className='Button Button_form Deposit-Button'
          onClick={(evt) => this.handleDepositClick(evt)}
        >
          Make Deposit
        </button>
      </form>
    );
  }

  renderError() {
    const { error } = this.state;
    const showError = error.trim().length > 0 ? 'Error_show' : '';

    return <div className={`Error ${showError}`}>{error}</div>;
  }

  renderLoadingGif() {
    const { showLoading, error } = this.state;

    const showImage =
      showLoading && error === '' ? (
        <img src='/loading.gif' alt='Loading' className='Loading' />
      ) : (
        ''
      );

    return showImage;
  }

  renderDeposit() {
    return (
      <section className='Deposit-Components'>
        <RiLuggageDepositFill className='Deposit-UserIcon' />
        {this.renderForm()}
        {this.renderError()}
        {this.renderLoadingGif()}
      </section>
    );
  }

  render() {
    return (
      <section className='Deposit'>
        <h1 className='Section-Header'>Deposit</h1>
        {this.renderDeposit()}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setNotificationMessage: (message) =>
      dispatch(setNotificationMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
