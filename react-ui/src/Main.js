import React, { Component } from "react";
import {
    BrowserRouter,
    Route,
    Redirect
} from "react-router-dom";

import SidebarContent from "./components/SidebarContent";
import Landing from "./pages/Landing";
import AccountSummary from "./pages/AccountSummary";
import CoinSummary from "./pages/CoinSummary";
import ManageAccount from "./pages/ManageAccount";
import LoginPage from "./pages/LoginPage";
import Logout from "./pages/Logout";
import SignUpPage from "./pages/SignUpPage";

import Icon from "react-icons-kit";
import {menu} from "react-icons-kit/icomoon/menu";
import Sidebar from "react-sidebar";

import Auth from './utils/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
            <Component {...props} {...rest} />
    ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
          }}/>
    ) : (
            <Component {...props} {...rest} />
        )
    )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <Component {...props} {...rest} />
    )}/>
)


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 30,
            authenticated: false
        };

        this.toggleAuthenticateStatus = this.toggleAuthenticateStatus.bind(this)
        this.menuButtonClick = this.menuButtonClick.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
    }

    componentDidMount() {
        this.toggleAuthenticateStatus()
    }

    toggleAuthenticateStatus() {
        this.setState({ 
            authenticated: Auth.isUserAuthenticated() 
        });
    }

    onSetOpen(open) {
        this.setState({
            open: open
        });
    }

    menuButtonClick(event) {
        event.preventDefault();
        this.onSetOpen(!this.state.open);
    }

  render() {
    let self = this;
    
    const sidebar = <SidebarContent />

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    return (
        <BrowserRouter>
            <Sidebar {...sidebarProps}
              authenticated={this.state.authenticated}>
                <div>
                    <a onClick={self.menuButtonClick}>
                        <Icon size={32} icon={menu} id="menu-icon" />
                    </a>
                </div>
                <div>
                    <PropsRoute exact path="/" component={Landing} />
                    <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
                    <LoggedOutRoute path="/signup" component={SignUpPage}/>
                    <PrivateRoute exact path="/home" component={AccountSummary} />
                    <PrivateRoute exact path="/coins" component={CoinSummary} />
                    <PrivateRoute exact path="/manage-account" component={ManageAccount} />
                    <Route path="/logout" component={Logout}/>
                </div>
            </Sidebar>
        </BrowserRouter>
    )
  }
}

export default Main;