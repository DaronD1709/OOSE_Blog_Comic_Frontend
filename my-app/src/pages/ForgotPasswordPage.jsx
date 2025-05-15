import { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined, NumberOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { resentOTPPasswordAPI, sentOTPAPI } from "../services/otpService.js";
import { resetNewPasswordAPI } from "../services/userService.js";

// Mới code UI, chưa có logic kiểm tra email, OTP, và update mật khẩu trong database

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // -----Chưa có logic kiểm tra email-----
  const handleEmailSubmit = async (values) => {
    console.log("Gửi mã OTP tới email:", values.email);
    // TODO: gọi API gửi OTP
    try {
      const reponse = await resentOTPPasswordAPI(values.email);
      localStorage.setItem("email", values.email);
      setStep(2);
      message.success("Đã gửi mã OTP tới email của bạn!");
    } catch (error) {
      message.error("Gặp lỗi khi gửi OTP");
    }
  };
  // -----Chưa có logic kiểm tra email-----

  // -----Chưa có logic kiểm tra OTP-----
  const handleOTPSubmit = async (values) => {
    console.log("Xác minh OTP:", values.otp);
    try {
      const email = localStorage.getItem("email");
      const res = await sentOTPAPI(values.otp, null, email);
      message.success("Mã OTP chính xác!");
      setStep(3);
    } catch (error) {
      message.error("Mã OTP không đúng!");
    }

    // TODO: xác minh OTP
  };
  // -----Chưa có logic kiểm tra OTP-----

  // -----Chưa có logic kiểm tra đặt lại mật khẩu-----
  const handleResetPassword = async (values) => {
    try {
      const email = localStorage.getItem("email");
      const response = await resetNewPasswordAPI(email, values.newPassword);
      localStorage.removeItem("email");
      message.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
      navigate("/login");
    } catch (error) {
      message.error("Có lỗi trong lúc xử lý ở server");
    }
  };
  // -----Chưa có logic kiểm tra đặt lại mật khẩu-----

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      form.resetFields();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Title level={3} className="text-center mb-4">
              Quên mật khẩu
            </Title>
            <Text type="secondary" className="block text-center mb-6">
              Nhập email của bạn để nhận mã OTP
            </Text>
            <Form form={form} onFinish={(values) => handleEmailSubmit(values)}>
              <Form.Item
                name="email"
                label="Email"
                className={"!mb-15"}
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Nhập email"
                  size="large"
                />
              </Form.Item>
              <Button
                type="primary"
                className="w-full"
                size="large"
                onClick={() => form.submit()}
              >
                Gửi mã OTP
              </Button>
            </Form>
          </>
        );

      case 2:
        return (
          <>
            <Title level={3} className="text-center mb-4">
              Xác minh OTP
            </Title>
            <Text type="secondary" className="block text-center mb-6">
              Nhập mã OTP đã được gửi đến email của bạn
            </Text>
            <Form
              layout={"vertical"}
              form={form}
              onFinish={(values) => handleOTPSubmit(values)}
            >
              <Form.Item
                name="otp"
                label="Mã OTP"
                rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
              >
                <Input
                  prefix={<NumberOutlined />}
                  placeholder="Nhập mã OTP"
                  size="large"
                />
              </Form.Item>

              <Button onClick={handleBack}>Quay lại</Button>
              <Button type="primary" onClick={form.submit}>
                Xác minh
              </Button>
            </Form>
          </>
        );

      case 3:
        return (
          <>
            <Title level={3} className="text-center mb-4">
              Đặt lại mật khẩu
            </Title>
            <Text type="secondary" className="block text-center mb-6">
              Nhập mật khẩu mới cho tài khoản của bạn
            </Text>
            <Form
              form={form}
              onFinish={(values) => handleResetPassword(values)}
              layout={"vertical"}
            >
              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu mới"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                />
              </Form.Item>
              <Button onClick={handleBack}>Quay lại</Button>
              <Button type="primary" onClick={form.submit}>
                Đặt lại mật khẩu
              </Button>
            </Form>
          </>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (values) => {
    if (step === 1) return handleEmailSubmit(values);
    if (step === 2) return handleOTPSubmit(values);
    if (step === 3) return handleResetPassword(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-md">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {renderStep()}
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
