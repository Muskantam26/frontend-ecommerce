import React, { useState } from "react";
import HeaderPage from "../headerPage";
import { useNavigate } from "react-router-dom";
import { FaRegEnvelope, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button1 } from "../Btn/Button1";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slice/authSlice";
import { userLoginApi } from "../../api/auth-api";
import Pageloader from "../../pageloader/Pageloader";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  dispatch(loginStart());

  try {

    const data = await userLoginApi(formData);

    dispatch(loginSuccess(data));

    navigate("/home");

  } catch (err) {

    dispatch(
      loginFailure(err.response?.data?.message || err.message)
    );

  }
};

  return (
    <div>
      <HeaderPage title={"Account"} />

      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-[700px]">

          <h2 className="text-[24px] font-bold mb-2 uppercase text-title">
            Sign In
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="ENTER YOUR EMAIL"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border"
              required
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border pr-12"
                required
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>

            </div>

            <Button1
              text={isLoading ? <Pageloader /> : "Login"}
              variant="primary"
              className="justify-center w-full flex"
              type="submit"
              disabled={isLoading}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 uppercase tracking-wide">
                If you don't have an account?{" "}
                <button 
                  type="button"
                  onClick={() => navigate('/register')} 
                  className="text-black font-bold hover:text-brand transition-colors"
                >
                  Register
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;