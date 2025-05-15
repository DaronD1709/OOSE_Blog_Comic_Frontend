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
import { IMAGE_URL } from "../constants/images.js";
import { URL_BACKEND } from "../constants/api.js";
import checked from '/src/assets/images/checked.png'

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
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
                <div
                  style={{ color: "#8DAFB1" }}
                  className="text-2xl font-bold"
                >
                  Comic
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
              <p className="text-gray-500 mb-6">
                Join now to streamline your experience from day one
              </p>
              <Form
                className="space-y-4 mt-4"
                form={form}
                initialValues={initalValues}
                onFinish={(values) => onFinish(values)}
                layout={"vertical"}
              >
                <Form.Item name="displayName" label="Display name">
                  <Input placeholder={"Input display name"} />
                </Form.Item>

                <Form.Item name="username" label="Username (For Login)">
                  <Input placeholder={"Input username"} />
                </Form.Item>

                <Form.Item name="email" label="Email">
                  <Input placeholder={"Input Email"} />
                </Form.Item>

                <Form.Item name="password" label="Password">
                  <Input.Password placeholder={"Input password"} />
                </Form.Item>

                <Button
                  className="w-full  "
                  type="primary"
                  style={{ backgroundColor: "#8DAFB1" }}
                  onClick={() => {
                    form.submit();
                  }}
                  loading={isLoading}
                >
                  Register
                </Button>
              </Form>

              <div className="mt-4 text-center ">
                <Divider plain={"false"}>Or Register With</Divider>
                <div className="flex justify-center gap-3 mb-4  mt-2">
                  <Button
                    onClick={handleGoogleLogin}
                    className="flex  items-center px-4 w-full justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5 "
                    />
                    Google
                  </Button>
                </div>
                <p className="mt-5 text-sm text-gray-600 ">
                  Already have an account?{" "}
                  <Link
                    style={{ color: "#8DAFB1" }}
                    className="text-blue-600 hover:underline"
                    to={"./23"}
                  >
                    Go to login
                  </Link>
                </p>
              </div>
              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2025 </p>
                <a href="#" className="hover:underline">
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
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8"></div>
              <h1 className="text-3xl font-bold mb-2">Verify Your Email </h1>
              <p className="text-gray-500 mb-6">
                Join now to streamline your experience from day one
              </p>
              <Form
                className="space-y-4 mt-4"
                form={form}
                onFinish={(values) => sendOTP(values)}
                layout={"vertical"}
              >
                <div className={"mb-3 flex justify-center"}>
                  <label className={"font-bold text-left"}>OTP</label>
                </div>

                <Form.Item name={"otp"}>
                  <Input.OTP />
                </Form.Item>

                <Button
                  className="w-full  "
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Send OTP
                </Button>
              </Form>
              {localStorage.getItem("userId") === null && (
                <>
                  <div className={"!mt-4"}>Email</div>
                  <div className={""}>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className={"flex justify-start"}>
                <Button
                  loading={isLoading}
                  className={"w-25 !mt-4"}
                  onClick={resendOTP}
                >
                  Resend OTP
                </Button>
              </div>

              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2025 </p>
                <a href="#" className="hover:underline">
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
                <div className="bg-white  p-4 rounded-lg shadow-lg">
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
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8"></div>
              <h1 className="text-3xl font-bold mb-2">Xác thực thành công </h1>
              <p className="text-gray-500 mb-6">
                You now can login with your new account
              </p>
              <div className={'flex justify-center'}>
                <div className={'w-40 h-40 '}>
                  <Image src={`${checked}`} preview={false}/>
                </div>
              </div>
              <Button
                className={"!mt-5"}
                type={"primary"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Go to login
              </Button>
              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2025 </p>
                <a href="#" className="hover:underline">
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
