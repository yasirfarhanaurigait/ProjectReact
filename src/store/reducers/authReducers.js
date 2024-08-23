
import Cookies from 'js-cookie';
const initialState = {
  isAuthenticated: !!Cookies.get('userToken'),
  user: null,
  error: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isAuthenticated: false,
          error: action.payload,
        };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
        case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload.name,
        email: action.payload.email,
      };
      case 'SET_USER':
      return {
        ...state,
        displayName: action.payload.displayName,
        email: action.payload.email,
        uid: action.payload.uid,
      };
    default:
      return state;
  }
};

export default authReducer;
