import React from "react";

import LoginForm from "../components/LoginForm";

import Auth from "../utils/Auth";

import PropTypes from "prop-types";


class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem("successMessage");
        let successMessage = "";

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            successMessage,
            user: {
                email: "",
                password: ""
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

  
    processForm = (event) => {
        event.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;
      
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            console.log(xhr.status)
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });

            Auth.authenticateUser(xhr.response.token);
            this.props.toggleAuthenticateStatus()
            this.props.history.push('/home');
            } else {

                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return (
                <LoginForm
                    onSubmit={this.processForm}
                    onChange={this.changeUser}
                    errors={this.state.errors}
                    successMessage={this.state.successMessage}
                    user={this.state.user}
                />
                );
            }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
