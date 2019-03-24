import { SUCCESS, FAILURE, UNMOUNT, CLAIM } from "../actions/usersActions";

const initialState = {
  error: false,
  response: false,
  admin: false
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        error: false,
        response: true
      };
    case FAILURE:
      return {
        error: action.error,
        response: false
      };
    case UNMOUNT:
      return {
        error: false,
        response: false
      };
    case CLAIM:
      return {
        error: false,
        isAdmin: action.isAdmin,
        response: true
      };
    default:
      return state;
  }
};

export default users;
