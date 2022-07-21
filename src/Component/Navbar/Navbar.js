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
  toggleSidebar,
} from '../../Redux/actions';

import { navItems } from '../../data';

export class Navbar extends Component {
  renderLogo() {
    return (
      <div className='Navbar-Logo'>
        <span>E</span>
        <BiPlanet />
        <span>M</span>
      </div>
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

  renderHamburger() {
    const { toggleSidebar, isSidebarOpen } = this.props;
    const faBarOrTimes = isSidebarOpen ? (
      <FaTimes className='Icon' onClick={() => toggleSidebar()} />
    ) : (
      <FaBars className='Icon' onClick={() => toggleSidebar()} />
    );

    return (
      <div>
        <GiNigeria className='Icon Icon_map' />
        {faBarOrTimes}
      </div>
    );
  }

  renderNavbar() {
    return (
      <section className='Navbar-Components'>
        {this.renderLogo()}
        {this.renderAllLinks()}
        {this.renderHamburger()}
      </section>
    );
  }

  render() {
    return <section className='Navbar'>{this.renderNavbar()}</section>;
  }
}

const mapStateToProps = (state) => {
  const { isSidebarOpen } = state;
  return {
    isSidebarOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    setLinkBeingHovered: (category) => dispatch(setLinkBeingHovered(category)),
    setDropDownLeft: (left) => dispatch(setDropDownLeft(left)),
    setMouseIsHoveringOverNav: (isHovering) =>
      dispatch(setMouseIsHoveringOverNav(isHovering)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
