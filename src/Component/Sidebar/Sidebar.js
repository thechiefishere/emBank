import React, { Component } from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';

import { navItems } from '../../data';

export class Sidebar extends Component {
  renderButtons() {
    return (
      <div className='Sidebar-Buttons'>
        <button className='Button Button_signIn'>Sign In</button>
        <button className='Button Button_openAccount'>Open Account</button>
      </div>
    );
  }

  renderFeatures() {
    return (
      <div>
        <h1>Features</h1>
        <ul>
          {navItems[0].links.map((feature, index) => (
            <li key={index}>{feature}</li>
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
  const { isSidebarOpen } = state;
  return {
    isSidebarOpen,
  };
};

export default connect(mapStateToProps)(Sidebar);
