import React from "react";

import * as classes from "./StoreMarker.module.css";

const ShopMarker = ({ shopName, shopImage, orders, shopId }) => {
  const calculateOrderCount = () => {
    const orderCount = orders.filter((order) => order.store_id === shopId)
      .length;
    return orderCount;
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
