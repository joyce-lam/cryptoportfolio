import React from "react";

import Auth from "../utils/Auth";

import PropTypes from "prop-types";


class Logout extends React.Component {
    componentDidMount() {
        Auth.deauthenticateUser();
        this.props.history.push("/");
    }

    render() {
        return (
                <div>
                    <p>Logging out</p>
                </div>
            )
        }
}

Logout.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Logout;
