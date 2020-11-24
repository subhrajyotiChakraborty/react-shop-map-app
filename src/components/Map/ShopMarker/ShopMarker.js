import React from "react";

import * as classes from "./ShopMarker.module.css";

const ShopMarker = ({ shopName, shopImage, orders, shopId }) => {
  const calculateOrderCount = () => {
    return orders && orders.length ? orders.length : 0;
  };

  return (
    <div className={classes.marker}>
      <img className={classes.storeImage} src={shopImage} alt={shopName} />
      <p className={classes.storeName}>{shopName}</p>
      {calculateOrderCount() > 0 ? (
        <p className={classes.orderCount}>{calculateOrderCount()}</p>
      ) : null}
    </div>
  );
};

export default ShopMarker;
