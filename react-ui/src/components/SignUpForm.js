import React from "react";
import { Link } from "react-router-dom";

import Input from "./Input";

import PropTypes from "prop-types";


const SignUpForm = props => (
    <div className="container">
        <form action="/" onSubmit={props.onSubmit}>
            <h2 className="card-heading">Sign Up</h2>

            {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}

            <div className="field-line">
                <Input
                    placeholder="Name"
                    name="name"
                    errortext={props.errors.name}
                    onChange={props.onChange}
                    value={props.user.name}
                />
            </div>
            <div className="field-line">
                <Input
                    placeholder="Email"
                    name="email"
                    errortext={props.errors.email}
                    onChange={props.onChange}
                    value={props.user.email}
                />
            </div>
            <div className="field-line">
                <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={props.onChange}
                    errortext={props.errors.password}
                    value={props.user.password}
                />
            </div>      
            <div className="button-line">
                <button type="submit">Create New Account</button>
            </div>
            <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
        </form>
    </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
