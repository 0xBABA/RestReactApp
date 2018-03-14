import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row animated fadeIn">
        <div className="col-md-8 col-lg-6 mx-auto">
          <Card className="text-center">
            <CardHeader>
              <h3 className="text-left">
                <i className="fa fa-sign-in mr-2" />Login
              </h3>
            </CardHeader>
            <CardBody>
              <p>Please Login using your Youtube Account to begin.</p>
              <h6>
                <a
                  href="/api/auth/youtube/start"
                  className="btn btn-danger btn-lg"
                >
                  <i className="fa fa-youtube mr-1" />Login
                </a>
              </h6>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
