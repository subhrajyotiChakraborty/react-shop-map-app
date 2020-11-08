import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

import * as classes from "./OrderList.module.css";
import * as actions from "../../store/actions";

class OrderList extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <div className={classes.orderListWrapper}>
        <div className={classes.storeListWrapper}>
          <h2>Orders List</h2>
          <hr />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Order Number</th>
                <th>Order Amount</th>
                <th>Store Id</th>
              </tr>
            </thead>
            <tbody>
              {this.props.orders.map(
                ({ id, order_amount, order_number, store_id }) => {
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{order_amount}</td>
                      <td>{order_number}</td>
                      <td>{store_id}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.orders.loading,
    error: state.orders.error,
    orders: state.orders.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
