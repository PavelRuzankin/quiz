import { AUTH_SUCCESS, LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        token: action.token,
      };
    case LOGOUT:
      return {
        token: null,
      };
    default:
      return state;
  }
}
