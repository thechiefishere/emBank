import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  renderTop() {
    return (
      <section className='Home-Top'>
        <div>
          <h1>
            Enjoy fast interplanetary bank transactions between Earth and Mars
          </h1>
          <p>
            The sole purpose of our existence is to help you send and receive
            money from your pals and families on other planets.
          </p>
        </div>
        <div className='Home-Store'>
          <img src={require('../../assets/ios.jpeg')} alt='ios' />
          <img src={require('../../assets/android.jpeg')} alt='ios' />
        </div>
      </section>
    );
  }

  renderBottom() {
    return (
      <section className='Home-ImageContainer'>
        <img
          className='Home-Image'
          src={require('../../assets/earth.png')}
          alt='earth'
        />
        <img
          className='Home-Image'
          src={require('../../assets/mars.png')}
          alt='earth'
        />
      </section>
    );
  }
  render() {
    return (
      <section className='Home'>
        {this.renderTop()}
        {this.renderBottom()}
      </section>
    );
  }
}

export default Home;
