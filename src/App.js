import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{route}</Layout>
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapsDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapsStateToProps, mapsDispatchToProps)(App));
