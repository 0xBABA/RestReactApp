import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("A valid email address is required")
});

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderEmailField(props) {
    return (
      <div className="form-group row">
        <label className="form-label col-form-label col-sm-2" htmlFor="email">
          Email:
        </label>
        <div className="col-sm-10">
          <Field
            placeholder="email@somewhere.com"
            className={
              props.touched.email && props.errors.email
                ? "form-control col is-invalid "
                : "form-control col "
            }
            type="text"
            name="email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
          />
          {props.touched.email &&
            props.errors.email && (
              <div className="invalid-feedback">{props.errors.email}</div>
            )}
        </div>
      </div>
    );
  }

  renderSubmitButton(props) {
    const isSubmitting = props.isSubmitting;

    if (!isSubmitting) {
      return (
        <Button type="submit" color="primary" className="ml-3">
          <i className="fa fa-send mr-2" />Submit
        </Button>
      );
    }

    return (
      <Button type="submit" color="secondary" className="ml-3">
        <i className="fa fa-cog fa-spin mr-2" />Saving
      </Button>
    );
  }

  handleSubmit(values, actions) {
    actions.setSubmitting(true);
    this.props.updateUser(values);
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: this.props.user.email
        }}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card className="animated fadeIn">
              <CardHeader className="">
                <h5 className="">User Details:</h5>
              </CardHeader>
              <CardBody>
                {this.renderEmailField({
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors
                })}
              </CardBody>
            </Card>
            <div className="text-right mr-0">
              {this.renderSubmitButton({
                handleSubmit,
                isSubmitting
              })}
            </div>
          </Form>
        )}
      />
    );
  }
}

UserDetailsForm.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  updateUser: PropTypes.func
};

export default UserDetailsForm;
