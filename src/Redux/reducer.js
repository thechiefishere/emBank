const initialState = {
  isSidebarOpen: false,
  linkBeingHovered: null,
  dropDownLeft: 0,
  isMouseHoveringOverNav: false,
  user: JSON.parse(localStorage.getItem('embankCustomerData')) || null,
  notificationMessage: '',
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
    case 'SET_USER': {
      localStorage.setItem(
        'embankCustomerData',
        JSON.stringify(action.payload)
      );
      return { ...state, user: action.payload };
    }
    case 'SET_NOTIFICATION_MESSAGE': {
      return { ...state, notificationMessage: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
