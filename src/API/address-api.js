import { Axios } from "../constant/MainContent";

export const addAddressApi = async (addressData) => {
  const response = await Axios.post('/address', addressData);
  return response.data;
};

export const getAddressesApi = async () => {
  const response = await Axios.get('/address');
  return response.data;
};

export const updateAddressApi = async (id, addressData) => {
  const response = await Axios.put(`/address/${id}`, addressData);
  return response.data;
};

export const deleteAddressApi = async (id) => {
  const response = await Axios.delete(`/address/${id}`);
  return response.data;
};

export const setDefaultAddressApi = async (id) => {
  const response = await Axios.patch(`/address/default/${id}`);
  return response.data;
};
