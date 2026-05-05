import axios from "axios";
import appLogo from "../assets/MinicomLogo.png";
// import appFavicon from "../assetS/AYUCARELOGO.PNG";
// import axios from "axios";
// import store from "../redux/store";

export const MainContent = {
  appName: "Minicom",
  appFullName: "Minicom",
  appLogo: appLogo,
//   appFavicon: appFavicon,
  appURL: "https://www.psnft.space",
  contactNo: "+919876543210",
  email: "info@psnft.space",
  address: "North Oak , Sanjauli , Shimla (HP) 171006",
  appDescription: "Ayucare-Admin",
};

export const Axios = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true,
});

// export const backendConfig = {
//   base: import.meta.env.VITE_API_BASE_URL,
//   origin: import.meta.env.VITE_API_ORIGIN,
// };

// https://cnfp6kct-1960.inc1.devtunnels.ms/

// export const Axios = axios.create({
//   baseURL: backendConfig.base,
//   withCredentials: true,
// });

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
