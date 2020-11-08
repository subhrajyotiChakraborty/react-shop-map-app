import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";

import * as classes from "./StoreList.module.css";
import * as actions from "../../store/actions";

class StoreList extends Component {
  componentDidMount() {
    this.props.fetchShops();
  }

  render() {
    return (
      <div className={classes.storeListWrapper}>
        <h2>Stores List</h2>
        <hr />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Store Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {this.props.shops.map(({ id, store_name, lat, long }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{store_name}</td>
                  <td>{lat}</td>
                  <td>{long}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.shops.loading,
    error: state.shops.error,
    shops: state.shops.shops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: () => dispatch(actions.fetchShops()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
