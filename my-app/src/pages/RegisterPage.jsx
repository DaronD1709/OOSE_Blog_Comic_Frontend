import {
  Button,
  Checkbox,
  Divider,
  Form,
  Image,
  Input,
  message,
  Space,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { registerAPI } from "../services/authService.js";
import {
  resentOTPAPI,
  resentOTPEmailAPI,
  sentOTPAPI,
} from "../services/otpService.js";
import { ROUTES, URL_BACKEND } from "../constants/api.js";
import checked from "/src/assets/images/checked.png";

const RegisterPage = () => {
  const location = useLocation();
  const [step, setStep] = useState(() => {
    return location.state?.step || 1;
  });
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = URL_BACKEND + "/oauth2/authorization/google";
  };
  const initalValues = {
    username: "",
    email: "",
    displayName: "",
    password: "",
  };

  const onFinish = async (values) => {
    try {
      const username = values.username;
      const password = values.password;
      const email = values.email;
      const displayName = values.displayName;
      setIsLoading(true);
      const response = await registerAPI(
        username,
        password,
        email,
        displayName
      );
      setIsLoading(false);
      message.success("Tạo tài khoản thành công");
      localStorage.setItem("userId", response.id);
      setStep(2);
    } catch (error) {
      message.error("Đăng nhập thất bại");
    }
  };

  const sendOTP = async (values) => {
    try {
      const userId = localStorage.getItem("userId");
      const otp = values.otp;
      const res = await sentOTPAPI(otp, userId, email);
      localStorage.removeItem("userId");
      message.success("Xác thực thành công");
      setStep(3);
    } catch (error) {
      message.error("Xác thực thất bại");
    }
  };

  const resendOTP = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId !== null) {
        setIsLoading(true);
        const res = await resentOTPAPI(userId);
      } else {
        setIsLoading(true);
        const res = await resentOTPEmailAPI(email);
      }
      message.success("Gửi mới OTP thành công");
    } catch (error) {
      message.error("Gặp lỗi khi gửi mới OTP");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {step === 1 && (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
          <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Left Section: Register Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
                <div
                  style={{ color: "#8DAFB1" }}
                  className="text-3xl font-bold"
                >
                  Comic
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">Create an Account</h1>
              <p className="text-gray-500 mb-8 text-base">
                Join now to streamline your experience from day one
              </p>
              <Form
                className="space-y-5"
                form={form}
                initialValues={initalValues}
                onFinish={(values) => onFinish(values)}
                layout={"vertical"}
              >
                <Form.Item
                  name="displayName"
                  label={
                    <span className="text-gray-700 font-medium">
                      Display name
                    </span>
                  }
                >
                  <Input
                    className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300"
                    placeholder="Enter your display name"
                  />
                </Form.Item>

                <Form.Item
                  name="username"
                  label={
                    <span className="text-gray-700 font-medium">
                      Username (For Login)
                    </span>
                  }
                >
                  <Input
                    className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300"
                    placeholder="Choose a username"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={
                    <span className="text-gray-700 font-medium">Email</span>
                  }
                >
                  <Input
                    className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={
                    <span className="text-gray-700 font-medium">Password</span>
                  }
                >
                  <Input.Password
                    className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300"
                    placeholder="Create a password"
                  />
                </Form.Item>

                <Button
                  className="w-full h-11 bg-[#8DAFB1] hover:bg-[#7A9A9C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    form.submit();
                  }}
                  loading={isLoading}
                >
                  Create Account
                </Button>
              </Form>

              <div className="mt-8">
                <Divider className="text-gray-400">Or Register With</Divider>
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-2 w-full h-11 px-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="font-medium text-gray-700">Google</span>
                  </Button>
                </div>
                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="font-medium !text-[#8DAFB1] hover:text-[#7A9A9C] hover:underline transition-colors duration-200"
                  >
                    Go to login
                  </Link>
                </p>
              </div>

              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2024</p>
                <a
                  href="#"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Right Section: Promotional Content */}
            <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center">
              <img
                src="https://i.pinimg.com/736x/86/f1/53/86f15337d7e8aa9a77ab5e0d52d2c2a4.jpg"
                className="h-full w-full object-cover"
                alt="background-register"
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
          <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Left Section: OTP Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
                <div
                  style={{ color: "#8DAFB1" }}
                  className="text-3xl font-bold"
                >
                  Comic
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">Verify Your Email</h1>
              <p className="text-gray-500 mb-8 text-base">
                We've sent a verification code to your email
              </p>
              <Form
                className="space-y-5"
                form={form}
                onFinish={(values) => sendOTP(values)}
                layout={"vertical"}
              >
                <Form.Item
                  name="otp"
                  label={
                    <span className="text-gray-700 font-medium">
                      Enter OTP Code
                    </span>
                  }
                >
                  <Input.OTP className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300" />
                </Form.Item>

                <Button
                  className="w-full h-11 bg-[#8DAFB1] hover:bg-[#7A9A9C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Verify Email
                </Button>
              </Form>

              {localStorage.getItem("userId") === null && (
                <div className="mt-6">
                  <Form.Item
                    label={
                      <span className="text-gray-700 font-medium">Email</span>
                    }
                  >
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300"
                    />
                  </Form.Item>
                </div>
              )}

              <Button
                loading={isLoading}
                className="mt-4 text-[#8DAFB1] hover:text-[#7A9A9C] border-[#8DAFB1] hover:border-[#7A9A9C] transition-all duration-300"
                onClick={resendOTP}
              >
                Resend OTP
              </Button>

              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2024</p>
                <a
                  href="#"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Right Section: Promotional Content */}
            <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">
                Effortlessly manage your team and operations.
              </h2>
              <p className="mb-6">
                Log in to access the CRM dashboard and manage your team.
              </p>
              <div className="relative">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-xl font-bold">$189,374</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p className="text-sm text-gray-600">Chat Performance</p>
                      <p className="text-xl font-bold">00:01:30</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md col-span-2">
                      <p className="text-sm text-gray-600">Sales Overview</p>
                      <div className="h-16 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Total Profit</p>
                    <p className="text-xl font-bold">$25,684</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Sales Categories</p>
                    <div className="h-16 bg-purple-300 rounded mt-2"></div>
                    <p className="text-sm text-gray-600 mt-2">6,248 Units</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
          <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Left Section: Success Message */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
                <div
                  style={{ color: "#8DAFB1" }}
                  className="text-3xl font-bold"
                >
                  Comic
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-3">
                Verification Successful!
              </h1>
              <p className="text-gray-500 mb-8 text-base">
                Your account has been verified. You can now login with your new
                account.
              </p>
              <div className="flex justify-center mb-8">
                <div className="w-40 h-40">
                  <Image
                    src={`${checked}`}
                    preview={false}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <Button
                className="w-full h-11 bg-[#8DAFB1] hover:bg-[#7A9A9C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                Go to Login
              </Button>

              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2024</p>
                <a
                  href="#"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Right Section: Promotional Content */}
            <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">
                Effortlessly manage your team and operations.
              </h2>
              <p className="mb-6">
                Log in to access the CRM dashboard and manage your team.
              </p>
              <div className="relative">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-xl font-bold">$189,374</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p className="text-sm text-gray-600">Chat Performance</p>
                      <p className="text-xl font-bold">00:01:30</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md col-span-2">
                      <p className="text-sm text-gray-600">Sales Overview</p>
                      <div className="h-16 bg-gray-300 rounded mt-2"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Total Profit</p>
                    <p className="text-xl font-bold">$25,684</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600">Sales Categories</p>
                    <div className="h-16 bg-purple-300 rounded mt-2"></div>
                    <p className="text-sm text-gray-600 mt-2">6,248 Units</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
