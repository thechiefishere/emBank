import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BiPlanet } from 'react-icons/bi';
import { GiNigeria } from 'react-icons/gi';
import { FaBars, FaTimes, FaSortDown } from 'react-icons/fa';
import './Navbar.css';
import {
  setDropDownLeft,
  setLinkBeingHovered,
  setMouseIsHoveringOverNav,
  setUser,
  toggleSidebar,
} from '../../Redux/actions';

import { navItems } from '../../data';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  handleLogoClick() {}

  renderLogo() {
    return (
      <Link to='/' className='Navbar-LogoLink'>
        <div className='Navbar-Logo' onClick={() => this.handleLogoClick()}>
          <span>E</span>
          <BiPlanet />
          <span>M</span>
        </div>
      </Link>
    );
  }

  handleHovering(evt, category) {
    const { setLinkBeingHovered, setDropDownLeft, setMouseIsHoveringOverNav } =
      this.props;
    const element = evt.target;
    const left = element.getBoundingClientRect().left;

    setDropDownLeft(left);
    setLinkBeingHovered(category);
    setMouseIsHoveringOverNav(true);
  }

  handleLogOut() {
    const { setUser } = this.props;

    setUser(null);
    localStorage.removeItem('embankCustomerData');
  }

  renderAllLinks() {
    const { setMouseIsHoveringOverNav } = this.props;
    return (
      <nav className='Navbar-Navs'>
        {navItems.map((obj, index) => {
          const { category } = obj;
          return (
            <div
              key={index}
              className='Navbar-Category'
              onMouseOver={(evt) => this.handleHovering(evt, category)}
              onMouseOut={(evt) => {
                setMouseIsHoveringOverNav(false);
              }}
            >
              <FaSortDown className='Navbar-DownBtn' />
              <h1>{category}</h1>
            </div>
          );
        })}
      </nav>
    );
  }

  renderButtons() {
    const { user } = this.props;
    if (user !== null) {
      return (
        <div className='Navbar-Buttons'>
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
      <div className='Navbar-Buttons'>
        <button className='Button Button_signIn'>
          <Link to='/signin' className='Button_link'>
            Sign In
          </Link>
        </button>
        <button className='Button Button_openAccount'>
          <Link to='/openaccount' className='Button_link'>
            Open Account
          </Link>
        </button>
      </div>
    );
  }

  renderHamburger() {
    const { toggleSidebar, isSidebarOpen } = this.props;
    const faBarOrTimes = isSidebarOpen ? (
      <FaTimes
        className='Icon Navbar-SidebarToggle'
        onClick={() => toggleSidebar()}
      />
    ) : (
      <FaBars
        className='Icon Navbar-SidebarToggle'
        onClick={() => toggleSidebar()}
      />
    );

    return (
      <div>
        <GiNigeria className='Icon Icon_map' />
        {faBarOrTimes}
      </div>
    );
  }

  renderAccountDetails() {
    const { user } = this.props;
    if (user === null) {
      return '';
    }

    const { accountNumber, balance } = user;
    return (
      <div className='Navbar-AccountDetails'>
        <p className='Navbar-AccountField'>
          Acc. Number: <span>{accountNumber}</span>
        </p>

        <p className='Navbar-AccountField'>
          Balance: <span>${balance}</span>
        </p>
      </div>
    );
  }

  renderNavbar() {
    return (
      <section className='Navbar-Components'>
        {this.renderLogo()}
        {this.renderAllLinks()}
        {this.renderAccountDetails()}
        {this.renderButtons()}
        {this.renderHamburger()}
      </section>
    );
  }

  render() {
    return <section className='Navbar'>{this.renderNavbar()}</section>;
  }
}

const mapStateToProps = (state) => {
  const { isSidebarOpen, user } = state;
  return {
    isSidebarOpen,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    setLinkBeingHovered: (category) => dispatch(setLinkBeingHovered(category)),
    setDropDownLeft: (left) => dispatch(setDropDownLeft(left)),
    setMouseIsHoveringOverNav: (isHovering) =>
      dispatch(setMouseIsHoveringOverNav(isHovering)),
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
