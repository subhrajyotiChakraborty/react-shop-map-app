import axios from "../../axios/axios";
import * as actionTypes from "./actionTypes";
import { showToast } from "../../common/utils/toast";
import { fetchShops } from "./shop";

export const createOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(createOrderStart());
      const response = await axios.post("/order", orderData);
      console.log(response.data);
      dispatch(fetchOrders());
      dispatch(fetchShops());
      showToast(true, "Order Created!!");
    } catch (error) {
      console.log(error);
      dispatch(createOrderFail(error));
      showToast(false, "Error occurred while creating the order");
    }
  };
};

export const createOrderStart = () => {
  return {
    type: actionTypes.CREATE_ORDER_START,
  };
};

export const createOrderSuccess = (orderData) => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    payload: orderData,
  };
};

export const createOrderFail = () => {
  return {
    type: actionTypes.CREATE_ORDER_FAIL,
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchOrdersStart());
      const response = await axios.get("/orders");
      dispatch(fetchOrdersSuccess(response.data && response.data.orders));
    } catch (error) {
      console.log(error);
      dispatch(fetchOrdersFail(error));
      showToast(false, "Error occurred while fetching orders");
    }
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orderData) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: orderData,
  };
};

export const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
  };
};
