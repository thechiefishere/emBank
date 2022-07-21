import React, { Component } from 'react';
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import DropDown from './Component/DropDown/DropDown';
import './App.css';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { linkBeingHovered } = this.props;

    return (
      <div className='App'>
        <Navbar />
        <Sidebar />
        {linkBeingHovered && <DropDown />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { linkBeingHovered } = state;
  return {
    linkBeingHovered,
  };
};

export default connect(mapStateToProps)(App);
