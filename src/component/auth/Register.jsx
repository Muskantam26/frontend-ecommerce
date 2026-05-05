import React, { useState } from "react";
import HeaderPage from "../headerPage";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button1 } from "../Btn/Button1";
import Pageloader from "../../pageloader/Pageloader";

import { sendOtpApi, registerUserApi } from "../../api/auth-api";

const Register = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    otp: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const data = await sendOtpApi({ email: formData.email });
      setSuccessMsg(data.message || "OTP sent successfully! Please check your email.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const name = `${formData.firstName} ${formData.lastName}`;
      await registerUserApi({
        name,
        email: formData.email,
        password: formData.password,
        otp: formData.otp
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <HeaderPage title={"Create Account"} />

      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-full max-w-[700px]">

          <h2 className="text-[24px] font-bold mb-2 uppercase text-title">
            Sign Up
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  placeholder="FIRST NAME"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border"
                  required
                />
                <input
                  name="lastName"
                  placeholder="LAST NAME"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border"
                required
              />

              <input
                type="tel"
                name="phoneNumber"
                placeholder="PHONE NUMBER"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border"
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
                text={isLoading ? <Pageloader /> : "Send Verification Code"}
                variant="primary"
                className="justify-center w-full flex"
                type="submit"
                disabled={isLoading}
              />
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <input
                name="otp"
                placeholder="ENTER OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-3.5 border"
                required
              />

              <Button1
                text={isLoading ? <Pageloader /> : "Verify & Register"}
                variant="primary"
                className="justify-center w-full flex"
                type="submit"
                disabled={isLoading}
              />
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;