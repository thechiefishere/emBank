import React, { Component } from 'react';
import './OpenAccount.css';
import { FaKey } from 'react-icons/fa';
import { RiUserFill, RiMailFill, RiSmartphoneLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNotificationMessage, setUser } from '../../Redux/actions';
import { withRouter } from '../../withRouter';

export class OpenAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      error: '',
    };
  }

  async handleAccountOpening(evt) {
    evt.preventDefault();
    const { name, email, phoneNumber, password } = this.state;
    try {
      const data = await fetch('https://embank.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: `
          mutation($registerInput: RegisterInput!){
              openAccount(registerInput: $registerInput) {
                id,
                token,
                email,
                name,
                phoneNumber,
                accountNumber,
                balance
              }
          }
        `,
          variables: {
            registerInput: {
              name,
              email,
              phoneNumber,
              password,
            },
          },
        }),
      });
      const response = await data.json();
      if (response?.errors) {
        const err = response.errors[0].message;
        this.setState({ ...this.state, error: err });
      }
      if (response?.data?.openAccount) {
        const { navigate, setUser, setNotificationMessage } = this.props;
        this.setState({
          name: '',
          email: '',
          phoneNumber: '',
          password: '',
          error: '',
        });
        const customer = { ...response.data.openAccount };
        setUser(customer);
        setNotificationMessage(`${customer.name} you are welcome to emBANK`);
        navigate('/');
      }
    } catch (error) {
      console.log('an error occured', error);
    }
  }

  renderForm() {
    const { name, email, phoneNumber, password } = this.state;

    return (
      <form className='OpenAccount-Form'>
        <div className='FormGroup'>
          <RiUserFill />
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(evt) =>
              this.setState({ ...this.state, name: evt.target.value })
            }
          />
        </div>
        <div className='FormGroup'>
          <RiMailFill />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(evt) =>
              this.setState({ ...this.state, email: evt.target.value })
            }
          />
        </div>
        <div className='FormGroup'>
          <RiSmartphoneLine />
          <input
            type='tel'
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(evt) =>
              this.setState({ ...this.state, phoneNumber: evt.target.value })
            }
          />
        </div>
        <div className='FormGroup'>
          <FaKey />
          <input
            type='password'
            placeholder='Create Password'
            value={password}
            onChange={(evt) =>
              this.setState({ ...this.state, password: evt.target.value })
            }
          />
        </div>
        <button
          className='Button Button_form'
          onClick={(evt) => this.handleAccountOpening(evt)}
        >
          Create Account
        </button>
      </form>
    );
  }

  renderError() {
    const { error } = this.state;
    const showError = error.trim().length > 0 ? 'Error_show' : '';

    return <div className={`Error ${showError}`}>{error}</div>;
  }

  renderOpenAccountComponent() {
    return (
      <section className='OpenAccount-Components'>
        {this.renderForm()}
        {this.renderError()}
        <div className='OpenAccount-ReRoute'>
          <p>Already have an Account?</p>
          <button className='Button Button_openAccount Button_question'>
            <Link to='/signin'>Sign In Now</Link>
          </button>
        </div>
      </section>
    );
  }

  render() {
    return (
      <section className='OpenAccount'>
        <h1 className='Section-Header'>Open An Account</h1>
        {this.renderOpenAccountComponent()}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setNotificationMessage: (message) =>
      dispatch(setNotificationMessage(message)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(OpenAccount));
