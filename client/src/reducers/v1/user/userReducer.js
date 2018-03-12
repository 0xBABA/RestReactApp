import { READ_USER, LOGOUT_USER } from "../../../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case READ_USER:
      return action.payload || false;
    case LOGOUT_USER:
      return action.payload || false;
    default:
      return state;
  }
}
