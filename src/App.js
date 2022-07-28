import React, { Component } from 'react';
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import DropDown from './Component/DropDown/DropDown';
import SignIn from './Pages/SignIn/SignIn';
import OpenAccount from './Pages/OpenAccount/OpenAccount';
import Home from './Pages/Home/Home';
import Deposit from './Pages/Deposit/Deposit';
import Withdraw from './Pages/Withdraw/Withdraw';
import Transactions from './Pages/Transactions/Transactions';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { connect } from 'react-redux';
import { setNotificationMessage } from './Redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotification: false,
    };
  }

  componentDidUpdate() {
    const { notificationMessage, setNotificationMessage } = this.props;
    const { showNotification } = this.state;

    if (notificationMessage.length > 0 && !showNotification) {
      this.setState({ ...this.state, showNotification: true });
    }

    let timeOut;
    if (showNotification) {
      timeOut = setTimeout(() => {
        setNotificationMessage('');
      }, 3000);
    }
    if (!showNotification && timeOut) {
      this.setState({ ...this.state, showNotification: false });
      clearTimeout(timeOut);
    }
  }

  render() {
    const { linkBeingHovered, user } = this.props;
    const withdrawElement =
      user === null ? (
        <SignIn info='Please sign in if you want to withdraw' />
      ) : (
        <Withdraw />
      );
    const depositElement =
      user === null ? (
        <SignIn info='Please sign in if you want to make a deposit' />
      ) : (
        <Deposit />
      );
    const transactionsElement =
      user === null ? (
        <SignIn info='Please sign in to see your transaction history' />
      ) : (
        <Transactions />
      );
    const { showNotification } = this.state;
    const { notificationMessage } = this.props;
    const showNotificationMessage = showNotification ? (
      <p className='Notification'>{notificationMessage}</p>
    ) : (
      ''
    );
    return (
      <BrowserRouter>
        <main className='App'>
          <Navbar />
          <Sidebar />
          {showNotificationMessage}
          {linkBeingHovered && <DropDown />}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn info='' />} />
            <Route path='/openaccount' element={<OpenAccount />} />
            <Route path='/deposit' element={depositElement} />
            <Route path='/withdraw' element={withdrawElement} />
            <Route path='/transactions' element={transactionsElement} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  const { linkBeingHovered, user, notificationMessage } = state;
  return {
    linkBeingHovered,
    user,
    notificationMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNotificationMessage: (message) =>
      dispatch(setNotificationMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
