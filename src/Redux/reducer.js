const initialState = {
  isSidebarOpen: false,
  linkBeingHovered: null,
  dropDownLeft: 0,
  isMouseHoveringOverNav: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR': {
      const { isSidebarOpen } = state;
      return { ...state, isSidebarOpen: !isSidebarOpen };
    }
    case 'SET_LINK_BEING_HOVERED': {
      return { ...state, linkBeingHovered: action.payload };
    }
    case 'SET_DROPDOWN_LEFT': {
      return { ...state, dropDownLeft: action.payload };
    }
    case 'SET_MOUSE_HOVERING': {
      return { ...state, isMouseHoveringOverNav: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
