import axios from "axios";
import { Axios } from "../constant/MainContent";

export const createOrderApi = async (orderData) => {
  const response = await Axios.post('/orders/create', orderData);
  return response.data;
};

export const getUserOrdersApi = async () => {
  const response = await Axios.get(`/orders/myorders`);
  return response.data;
};

export const getOrderByIdApi = async (id) => {
  const response = await Axios.get(`/orders/${id}`);
  return response.data;
};

