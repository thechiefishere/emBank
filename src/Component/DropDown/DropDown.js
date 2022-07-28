import React, { Component } from 'react';
import './DropDown.css';
import { connect } from 'react-redux';

import { navItems } from '../../data';
import { getLinksFromCategory } from '../../util/functions';
import { setMouseIsHoveringOverNav } from '../../Redux/actions';
import { Link } from 'react-router-dom';

export class DropDown extends Component {
  render() {
    const {
      linkBeingHovered,
      dropDownLeft,
      setMouseIsHoveringOverNav,
      isMouseHoveringOverNav,
    } = this.props;
    const links = getLinksFromCategory(navItems, linkBeingHovered);

    const showDropDown = isMouseHoveringOverNav ? 'DropDown_show' : '';

    return (
      <ul
        className={`DropDown ${showDropDown}`}
        style={{ left: dropDownLeft }}
        onMouseOver={(evt) => {
          setMouseIsHoveringOverNav(true);
        }}
        onMouseOut={(evt) => {
          setMouseIsHoveringOverNav(false);
        }}
      >
        {links.map((item, index) => (
          <li key={index}>
            <Link to={`${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  const { linkBeingHovered, dropDownLeft, isMouseHoveringOverNav } = state;

  return {
    linkBeingHovered,
    dropDownLeft,
    isMouseHoveringOverNav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMouseIsHoveringOverNav: (isHovering) =>
      dispatch(setMouseIsHoveringOverNav(isHovering)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
