import axios from "../../axios/axios";
import * as actionTypes from "./actionTypes";
import { showToast } from "../../common/utils/toast";

export const createShop = (shopData) => {
  return async (dispatch) => {
    try {
      dispatch(createShopStart());
      const response = await axios.post("/shop", shopData);
      console.log(response.data);
      dispatch(fetchShops());
      showToast(true, "Shop Created!!");
    } catch (error) {
      console.log(error);
      dispatch(createShopFail(error));
      showToast(false, "Error occurred while creating the store");
    }
  };
};

export const createShopStart = () => {
  return {
    type: actionTypes.CREATE_SHOP_START,
  };
};

export const createShopSuccess = (shopData) => {
  return {
    type: actionTypes.CREATE_SHOP_SUCCESS,
    payload: shopData,
  };
};

export const createShopFail = () => {
  return {
    type: actionTypes.CREATE_SHOP_FAIL,
  };
};

export const fetchShops = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchShopsStart());
      const response = await axios.get("/shops");
      dispatch(fetchShopsSuccess(response.data && response.data.shops));
    } catch (error) {
      console.log(error);
      dispatch(fetchShopsFail(error));
      showToast(false, "Error occurred while fetching the stores");
    }
  };
};

export const fetchShopsStart = () => {
  return {
    type: actionTypes.FETCH_SHOPS_START,
  };
};

export const fetchShopsSuccess = (shopsData) => {
  return {
    type: actionTypes.FETCH_SHOPS_SUCCESS,
    payload: shopsData,
  };
};

export const fetchShopsFail = () => {
  return {
    type: actionTypes.FETCH_SHOPS_FAIL,
  };
};
