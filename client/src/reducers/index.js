import { combineReducers } from "redux";

import userReducer from "./v1/user/userReducer";

export default combineReducers({
  user: userReducer
});
