import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        logged: true,
        token: action.payload.token,
      };
    case types.LOGOUT:
      return {
        logged: false,
        token: null,
      };
    case types.REGISTER:
      return {
        ...state,
        logged: true,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
