import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";

import * as classes from "../FormSection.module.css";
import * as actions from "../../../../store/actions";
import { showToast } from "../../../utils/toast";

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeID: "",
      orderID: "",
      amount: 0.0,
    };
  }

  componentDidMount() {
    if (this.props.shops.length === 0) {
      this.props.fetchShops();
    }
  }

  createOrderHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { storeID, orderID, amount } = this.state;
    if (!storeID.trim().length || !orderID.trim().length || amount <= 0) {
      showToast(false, "All fields are required");
      return;
    }

    this.props.createOrder({
      order_number: this.state.orderID,
      order_amount: this.state.amount,
      store_id: this.state.storeID,
    });
    this.resetState();
  };

  inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  resetState = () => {
    this.setState({
      storeID: "",
      orderID: "",
      amount: 0.0,
    });
  };

  render() {
    return (
      <Form
        className={classes.form}
        noValidate
        onSubmit={this.createOrderHandler}
      >
        <Form.Group as={Row} controlId="formStore">
          <Form.Label column sm="4">
            <p className={classes.formLabel}>Select Store</p>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              as="select"
              value={this.state.storeID}
              onChange={this.inputChangeHandler}
              name="storeID"
            >
              <option value="">Select a store</option>
              {this.props.shops.map(({ id, store_name }) => {
                return (
                  <option key={id} value={id}>
                    {store_name}
                  </option>
                );
              })}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formOrderId">
          <Form.Label column sm="4">
            <p className={classes.formLabel}>Order ID</p>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={this.state.orderID}
              onChange={this.inputChangeHandler}
              type="text"
              placeholder="order-id"
              name="orderID"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formAmount">
          <Form.Label column sm="4">
            <p className={classes.formLabel}>Amount</p>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              value={this.state.amount}
              onChange={this.inputChangeHandler}
              type="number"
              placeholder="0.00"
              name="amount"
              min="0"
            />
          </Col>
        </Form.Group>
        <div className={classes.formButtonSection}>
          <Button type="submit" variant="outline-info">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.orders.loading,
    error: state.orders.error,
    shops: state.shops.shops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (orderData) => dispatch(actions.createOrder(orderData)),
    fetchShops: () => dispatch(actions.fetchShops()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
