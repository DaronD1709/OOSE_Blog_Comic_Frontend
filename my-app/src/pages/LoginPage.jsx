import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext } from '../context/auth.context.jsx'
import { fetchAccountAPI } from '../services/userService.js'

const LoginPage = () => {
  const [form] = Form.useForm();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)
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
      fetchAccount()
      navigate("/");
    }
  }, [navigate]);
  const fetchAccount = async () => {
    try {
      const res = await fetchAccountAPI()
      setUser(res)
    } catch (err) {
      message.error('Lỗi khi cố gắng truy vấn dữ liệu người dùng')
    }

  }
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
        fetchAccount()
        navigate("/");
      }
    } catch (error) {
      message.error("Đăng nhập thất bại");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
        <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Left Section: Login Form */}
          <div className="w-1/2 p-10">
            <div className="flex items-center mb-8">
              <div style={{ color: "#8DAFB1" }} className="text-3xl font-bold">
                Comic
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
            <p className="text-gray-500 mb-8 text-base">
              Enter your email or username and password to access your account.
            </p>
            <Form
              className="space-y-5"
              form={form}
              onFinish={(values) => onFinish(values)}
              layout={"vertical"}
            >
              <Form.Item
                name="username"
                label={
                  <span className="text-gray-700 font-medium">
                    Email / Username
                  </span>
                }
              >
                <Input
                  className="h-11 rounded-lg border-gray-200 focus:border-[#8DAFB1] focus:ring-2 focus:ring-[#8DAFB1]/20 transition-all duration-300"
                  placeholder="Enter your email or username"
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
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <Checkbox className="rounded border-gray-300 text-[#8DAFB1] focus:ring-[#8DAFB1]" />
                  <span className="text-sm ml-2 text-gray-600">
                    Remember Me
                  </span>
                </label>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-sm font-medium hover:underline !text-[#8DAFB1] hover:text-[#7A9A9C] transition-colors duration-200"
                >
                  Forget Your Password?
                </Link>
              </div>

              <Button
                className="w-full h-11 bg-[#8DAFB1] hover:bg-[#7A9A9C] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => {
                  form.submit();
                }}
              >
                Log In
              </Button>
            </Form>

            <div className="mt-8">
              <Divider className="text-gray-400">Or Log In With</Divider>
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
                Don't Have an Account?{" "}
                <Link
                  to={ROUTES.REGISTER}
                  className="font-medium !text-[#8DAFB1] hover:text-[#7A9A9C] hover:underline transition-colors duration-200"
                >
                  Register Now
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
              alt="background-login"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
