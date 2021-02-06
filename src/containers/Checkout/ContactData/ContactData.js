import React, { Component } from "react";
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from "./ContactData.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: {
        name: "Atsushi Katada",
        address: {
          street: "Hoge St",
          zipCode: "2090",
          country: "Australia",
        },
        email: "test@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    this.props.onOrderBurger(order);
  };

  render() {
    let form = (
      <form>
      <input
        className={classes.Input}
        type="text"
        name="name"
        placeholder="Your name"
      />
      <input
        className={classes.Input}
        type="email"
        name="email"
        placeholder="Your email"
      />
      <input
        className={classes.Input}
        type="text"
        name="street"
        placeholder="Street name"
      />
      <input
        className={classes.Input}
        type="text"
        name="postal"
        placeholder="Postal code"
      />
      <Button btnType="Success" clicked={this.orderHandler}>
        ORDER
      </Button>
    </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contract Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
