export const toggleSidebar = () => {
  return {
    type: 'TOGGLE_SIDEBAR',
  };
};

export const setLinkBeingHovered = (link) => {
  return {
    type: 'SET_LINK_BEING_HOVERED',
    payload: link,
  };
};

export const setDropDownLeft = (left) => {
  return {
    type: 'SET_DROPDOWN_LEFT',
    payload: left,
  };
};

export const setMouseIsHoveringOverNav = (isHovering) => {
  return {
    type: 'SET_MOUSE_HOVERING',
    payload: isHovering,
  };
};
