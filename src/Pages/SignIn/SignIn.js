import React, { Component } from 'react';
import './SignIn.css';
import { FaRegUser, FaLock } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNotificationMessage, setUser } from '../../Redux/actions';
import { withRouter } from '../../withRouter';

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      showLoading: false,
    };
  }

  async handleLoginClick(evt) {
    evt.preventDefault();
    this.setState({ ...this.state, error: '', showLoading: true });
    const { email, password } = this.state;
    try {
      const data = await fetch('https://embank.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation($email: String! $password: String!) {
              login(email: $email password: $password) {
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
            email,
            password,
          },
        }),
      });

      const response = await data.json();
      if (response?.errors) {
        const err = response.errors[0].message;
        this.setState({ ...this.state, error: err });
      }
      if (response?.data?.login) {
        const { navigate, setUser, setNotificationMessage } = this.props;
        this.setState({
          email: '',
          password: '',
          error: '',
        });
        const customer = { ...response.data.login };
        setUser(customer);
        setNotificationMessage(`You are welcome ${customer.name}`);
        navigate('/');
      }
    } catch (error) {
      console.log('error is ', error);
    }
  }

  renderForm() {
    const { email, password } = this.state;

    return (
      <form className='SignIn-Form'>
        <div className='FormGroup'>
          <RiUserFill />
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
          <FaLock />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(evt) =>
              this.setState({ ...this.state, password: evt.target.value })
            }
          />
        </div>
        <button
          className='Button Button_form'
          onClick={(evt) => this.handleLoginClick(evt)}
        >
          Login
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
      showLoading && user === null && error === '' ? (
        <img src='/loading.gif' alt='Loading' className='Loading' />
      ) : (
        ''
      );

    return showImage;
  }

  renderSignIn() {
    return (
      <section className='SignIn-Components'>
        <FaRegUser className='SignIn-UserIcon' />
        {this.renderForm()}
        {this.renderError()}
        {this.renderLoadingGif()}
        <div className='SignIn-ReRoute'>
          <p>Not banking with us?</p>
          <button className='Button Button_openAccount Button_question'>
            <Link to='/openaccount'>Open An Account</Link>
          </button>
        </div>
      </section>
    );
  }

  render() {
    const { info } = this.props;
    return (
      <section className='SignIn'>
        <h1 className='Section-Header'>Sign In</h1>
        <p className='SignIn-Info'>{info}</p>
        {this.renderSignIn()}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    setNotificationMessage: (message) =>
      dispatch(setNotificationMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
