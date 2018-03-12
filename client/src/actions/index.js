import axios from "axios";

import { READ_USER, LOGOUT_USER } from "./types";

export const readUser = onComplete => async dispatch => {
  try {
    const res = await axios.get("/api/user/account", {
      headers: { Authorization: "JWT " + localStorage.getItem("jwt") }
    });

    if (!res.data.error && res.data.result) {
      dispatch({ type: READ_USER, payload: res.data.result });
    } else if (res.data.error && !res.data.result) {
      dispatch({ type: READ_USER, payload: res.data.error });
    }
    onComplete();
  } catch (error) {
    onComplete();
    //Catches unresolved promise form the 403 unauthorized,
  }
};

export const logoutUser = () => async dispatch => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT_USER, payload: false });
};
