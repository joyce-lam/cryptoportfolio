import React from "react";
import { Link } from "react-router-dom";

import Input from "./Input";

import PropTypes from "prop-types";

const LoginForm = props=> (
    <div className="container">
        <form action="/" onSubmit={props.onSubmit}>
            <h2>Login</h2>

            {props.successMessage && <p className="success-message">{props.successMessage}</p>}
            {props.errors.summary && <p className="error-message">{props.errors.summary}</p>}

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
                <button type="submit">Login</button>
            </div>
            <p>Don't have an account? <Link to={"/signup"}>Create one</Link>.</p>
        </form>
    </div>
);

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};

export default LoginForm;
