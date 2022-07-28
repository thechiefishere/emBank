import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { navItems } from '../../data';
import { setUser, toggleSidebar } from '../../Redux/actions';

export class Sidebar extends Component {
  handleLogOut() {
    const { setUser, toggleSidebar } = this.props;

    setUser(null);
    toggleSidebar();
    localStorage.removeItem('embankCustomerData');
  }

  renderButtons() {
    const { toggleSidebar, user } = this.props;
    if (user !== null) {
      return (
        <div className='Sidebar-Buttons'>
          <button
            className='Button Button_logOut'
            onClick={() => this.handleLogOut()}
          >
            Log out
          </button>
        </div>
      );
    }
    return (
      <div className='Sidebar-Buttons'>
        <button
          className='Button Button_signIn'
          onClick={() => toggleSidebar()}
        >
          <Link to='/signin' className='Button_link'>
            Sign In
          </Link>
        </button>
        <button
          className='Button Button_openAccount'
          onClick={() => toggleSidebar()}
        >
          <Link to='/openaccount' className='Button_link'>
            Open Account
          </Link>
        </button>
      </div>
    );
  }

  renderFeatures() {
    const { toggleSidebar } = this.props;
    return (
      <div>
        <h1>Features</h1>
        <ul>
          {navItems[0].links.map((feature, index) => (
            <li key={index} onClick={() => toggleSidebar()}>
              <Link to={`/${feature.toLocaleLowerCase()}`}>{feature}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderCompanyLinks() {
    return (
      <div>
        <h1>Company</h1>
        <ul>
          {navItems[1].links.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    );
  }

  renderSidebar() {
    return (
      <section className='Sidebar-Components'>
        <div className='Sidebar-Info'>
          {this.renderButtons()}
          <section>
            {this.renderFeatures()}
            {this.renderCompanyLinks()}
          </section>
        </div>
        <div className='Sidebar-Backdrop'></div>
      </section>
    );
  }

  render() {
    const { isSidebarOpen } = this.props;
    const showStore = isSidebarOpen ? 'Sidebar_show' : '';

    return (
      <section className={`Sidebar ${showStore}`}>
        {this.renderSidebar()}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  const { isSidebarOpen, user } = state;
  return {
    isSidebarOpen,
    user,
  };
};

const mapDispatchToState = (dispatch) => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToState)(Sidebar);
