import { Axios } from "../constant/MainContent";


export const getCategoriesApi = async () => {
  try {
    const res = await Axios.get("/categories");
    return res.data;
  } catch (error) {
    throw error;
  }
};