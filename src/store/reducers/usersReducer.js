import { SUCCESS, FAILURE, UNMOUNT } from "../actions/usersActions";

const initialState = {
  error: false,
  response: false
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
    default:
      return state;
  }
};

export default users;
