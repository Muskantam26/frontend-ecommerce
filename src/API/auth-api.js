import { Axios } from "../constant/MainContent";

// User Login
export const userLoginApi = async (data) => {
  try {
    const res = await Axios.post("/users/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Send OTP
export const sendOtpApi = async (data) => {
  try {
    const res = await Axios.post("/users/send-otp", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Register User
export const registerUserApi = async (data) => {
  try {
    const res = await Axios.post("/users/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};