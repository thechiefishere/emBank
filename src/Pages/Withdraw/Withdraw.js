import React, { Component } from 'react';
import './Withdraw.css';
import { FcMoneyTransfer } from 'react-icons/fc';
import { RiLuggageDepositFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { setNotificationMessage, setUser } from '../../Redux/actions';

export class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountToWithdraw: '',
      error: '',
      showLoading: false,
    };
  }

  async handleWithdrawClick(evt) {
    evt.preventDefault();
    this.setState({ error: '', showLoading: true });
    const { amountToWithdraw } = this.state;
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
            mutation($amountToWithdraw: Int!) {
              withdraw(amountToWithdraw: $amountToWithdraw) {
                balance
              }
            }
          `,
          variables: {
            amountToWithdraw: Number(amountToWithdraw),
          },
        }),
      });

      const response = await data.json();
      if (response?.errors) {
        const err = response.errors[0].message;
        this.setState({ ...this.state, error: err });
      }
      if (response?.data?.withdraw) {
        this.setState({
          amountToWithdraw: '',
          error: '',
        });
        const customer = { ...user, balance: response.data.withdraw.balance };
        setNotificationMessage(`You made a withdrawal of $${amountToWithdraw}`);
        setUser(customer);
      }
    } catch (error) {
      console.log('error is ', error);
    }
  }

  renderForm() {
    const { amountToWithdraw } = this.state;

    return (
      <form className='Withdraw-Form'>
        <div className='FormGroup'>
          <FcMoneyTransfer />
          <input
            type='number'
            placeholder='Amount To Withdraw'
            value={amountToWithdraw}
            onChange={(evt) =>
              this.setState({
                ...this.state,
                amountToWithdraw: evt.target.value,
              })
            }
          />
        </div>
        <button
          className='Button Button_form Withdraw-Button'
          onClick={(evt) => this.handleWithdrawClick(evt)}
        >
          Make Withdraw
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
    const { user } = this.props;

    const showImage =
      showLoading && error === '' ? (
        <img src='/loading.gif' alt='Loading' className='Loading' />
      ) : (
        ''
      );

    return showImage;
  }

  renderWithdraw() {
    return (
      <section className='Withdraw-Components'>
        <RiLuggageDepositFill className='Withdraw-UserIcon' />
        {this.renderForm()}
        {this.renderError()}
        {this.renderLoadingGif()}
      </section>
    );
  }

  render() {
    return (
      <section className='Withdraw'>
        <h1 className='Section-Header'>Withdraw</h1>
        {this.renderWithdraw()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw);
