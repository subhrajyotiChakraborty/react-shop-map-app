import React, { Component } from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";

import * as classes from "./Map.module.css";
import * as actions from "../../store/actions";
import ShopMarker from "./ShopMarker/ShopMarker";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 22.8956,
        lng: 88.4025,
      },
      zoom: 11,
    };
  }

  componentDidMount() {
    this.props.fetchShops();
  }

  render() {
    return (
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {this.props.shops.map(
            ({ id, store_name, lat, long, store_image, orders }) => {
              return (
                <ShopMarker
                  key={id}
                  lat={lat}
                  lng={long}
                  shopName={store_name}
                  shopImage={store_image}
                  shopId={id}
                  orders={orders}
                />
              );
            }
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.shops.loading,
    error: state.shops.error,
    shops: state.shops.shops,
    orders: state.orders.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShops: () => dispatch(actions.fetchShops()),
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
