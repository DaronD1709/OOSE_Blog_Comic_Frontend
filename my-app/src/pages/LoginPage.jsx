import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/authService.js";
import { ROUTES, URL_BACKEND } from "../constants/api.js";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    window.location.href = URL_BACKEND + "/oauth2/authorization/google";
  };
  const goToVerifyEmail = () => {
    navigate(ROUTES.REGISTER, { state: { step: 2 } });
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Tài khoản chưa được xác thực Email",
      description:
        "Bạn đã tạo tài khoản thành công nhưng chưa gửi OTP xác thực Email",
      showProgress: true,
      pauseOnHover: true,
      btn: <Button onClick={goToVerifyEmail}>Đi đến xác thực </Button>,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      // Nếu có token, chuyển hướng về trang chính
      navigate("/");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      console.log(">>> Check values ", values);
      const identifier = values.username;
      const password = values.password;
      const response = await loginAPI(identifier, password);
      console.log(">>> Check login response ", response);
      if (response.accessToken === null) {
        openNotification();
        localStorage.setItem("userId", response.data.userId);
        setVerifyEmail(true);
      } else {
        const accessToken = response.accessToken;
        localStorage.setItem("access_token", accessToken);
        message.success("Đang nhập thành công ");
        navigate("/");
      }
    } catch (error) {
      message.error("Đăng nhập thất bại");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="bg-gray-100  flex items-center justify-center min-h-screen">
        <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Section: Login Form */}
          <div className="w-1/2 p-10">
            <div className="flex items-center mb-8">
              <div style={{ color: "#8DAFB1" }} className="text-2xl font-bold">
                Comic
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-6">
              Enter your email or username and password to access your account.
            </p>
            <Form
              className="space-y-4 mt-4"
              form={form}
              onFinish={(values) => onFinish(values)}
              layout={"vertical"}
            >
              <Form.Item name="username" label="Email / Username">
                <Input />
              </Form.Item>

              <Form.Item name="password" label="Password">
                <Input.Password />
              </Form.Item>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <Checkbox type="checkbox" className="mr-2" />
                  <span className="text-sm ml-2 text-gray-600">
                    Remember Me
                  </span>
                </label>
                <a
                  href="#"
                  style={{ color: "#8DAFB1" }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forget Your Password?
                </a>
              </div>
              <Button
                className="w-full text-amber-50 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => {
                  form.submit();
                }}
              >
                Log In
              </Button>
            </Form>

            <div className="mt-4 text-center ">
              <Divider plain={"false"}>Or Log In With</Divider>
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
                Don’t Have an Account?{" "}
                <Link
                  style={{ color: "#8DAFB1" }}
                  className="text-blue-600 hover:underline"
                  to={ROUTES.REGISTER}
                >
                  Register Now.
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
              alt="background-login"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
