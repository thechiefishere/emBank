import React, { Component } from 'react';
import { BiPlanet } from 'react-icons/bi';
import { GiNigeria } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';
import './Navbar.css';

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

  renderHamburger() {
    return (
      <div>
        <GiNigeria className='Icon Icon_map' />
        <FaBars className='Icon' />
      </div>
    );
  }

  renderNavbar() {
    return (
      <section className='Navbar-Components'>
        {this.renderLogo()}
        {this.renderHamburger()}
      </section>
    );
  }
  render() {
    return <section className='Navbar'>{this.renderNavbar()}</section>;
  }
}

export default Navbar;
