import axios from "../../axios/axios";
import * as actionTypes from "./actionTypes";
import { showToast } from "../../common/utils/toast";

export const createOrder = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(createOrderStart());
      const response = await axios.post("/orders.json", orderData);
      console.log(response.data);
      dispatch(fetchOrders());
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
      const response = await axios.get("/orders.json");
      const fetchedOrders = [];
      for (const key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
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
