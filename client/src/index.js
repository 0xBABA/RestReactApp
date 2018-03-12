import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reduxThunk from "redux-thunk";
import reducers from "./reducers";
//WTF

// Styles
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "../scss/style.scss";
// Temp fix for reactstrap
import "../scss/core/_dropdown-menu-right.scss";
// Containers
import Full from "./containers/Full/";

function getCookie(name) {
  var regexp = new RegExp(
    "(?:^" + name + "|;s*" + name + ")=(.*?)(?:;|$)",
    "g"
  );
  var result = regexp.exec(document.cookie);
  return result === null ? null : result[1];
}

function deleteCookie(name, path, domain) {
  // If the cookie exists
  if (getCookie(name))
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const cookieJWT = getCookie("jwt");
if (cookieJWT) {
  localStorage.setItem("jwt", cookieJWT);
  deleteCookie("jwt");
}

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" name="Full" component={Full} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
