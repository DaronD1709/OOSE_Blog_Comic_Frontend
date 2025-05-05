import { fetchAllUsers } from '../services/userService.js'
import { Button, Checkbox, Divider, Form, Image, Input, message, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { URL_BACKEND } from '../api/userApi.js'
import { loginAPI, registerAPI } from '../services/authService.js'
import { sentOTPApi } from '../services/otpService.js'
import { IMAGE_URL } from '../constants/images.js'

const RegisterPage = () => {

  const [form] = Form.useForm()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  console.log('>>>> CHeck image URL ', IMAGE_URL)
  const navigate = useNavigate()
  const handleGoogleLogin = () => {
    window.location.href = URL_BACKEND + '/oauth2/authorization/google'
  }
  const initalValues = {
    username: 'letmehear',
    email: 'nguyentruongpro19@gmail.com',
    displayName: 'test',
    password: 'test',
  }

  const onFinish = async (values) => {
    try {
      const username = values.username
      const password = values.password
      const email = values.email
      const displayName = values.displayName
      setIsLoading(true)
      const response = await registerAPI(username, password, email, displayName)
      setIsLoading(false)
      localStorage.setItem('userId', response.id)
      setStep(2)

    } catch (error) {
      if (error.errorCode === 'VERIFYING_EMAIL') {
        message.info('Tài khoản chưa kích hoạt')
      } else {
        message.error('Đăng nhập thất bại')
      }
    }
  }

  const sendOTP = async (values) => {
    try {
      const userId = localStorage.getItem('userId')
      const otp = values.otp
      const res = await sentOTPApi(otp, userId)
      message.success('Xác thực thành công')
      localStorage.removeItem('userId')
      setStep(3)
    } catch (error) {
      message.error('Xác thực thất bại')
    }

  }
  return (

    <>
      {step === 1 && (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
                <div className="text-blue-600 text-2xl font-bold">Comic</div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
              <p className="text-gray-500 mb-6">Join now to streamline your experience from day one</p>
              <Form className="space-y-4 mt-4"
                    form={form}
                    initialValues={initalValues}
                    onFinish={(values) => onFinish(values)}
                    layout={'vertical'}
              >
                <Form.Item
                  name="displayName"
                  label="Display name"

                >

                  <Input placeholder={'Input display name'}/>
                </Form.Item>

                <Form.Item
                  name="username"
                  label="Username (For Login)">
                  <Input placeholder={'Input username'}/>
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email">
                  <Input placeholder={'Input Email'}/>
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                >

                  <Input.Password placeholder={'Input password'}/>
                </Form.Item>
                <Button className="w-full  "
                        type="primary"
                        onClick={() => {
                          form.submit()
                        }}
                        loading={isLoading}
                >
                  Register

                </Button>
              </Form>

              <div className="mt-4 text-center ">
                <Divider plain={'false'}>Or Register With</Divider>
                <div className="flex justify-center gap-3 mb-4  mt-2">
                  <Button
                    onClick={handleGoogleLogin}
                    className="flex  items-center px-4 w-full justify-center py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 "/>
                    Google
                  </Button>
                </div>
                <p className="mt-5 text-sm text-gray-600 ">
                  Already have an account? <Link className="text-blue-600 hover:underline" to={'./23'}>Go to
                  login</Link>
                </p>
              </div>
              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2025 </p>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </div>
            </div>
            {/* Right Section: Promotional Content */}
            <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Effortlessly manage your team and operations.</h2>
              <p className="mb-6">Log in to access the CRM dashboard and manage your team.</p>
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
      {step === 2 && (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
              </div>
              <h1 className="text-3xl font-bold mb-2">Verify Your Email </h1>
              <p className="text-gray-500 mb-6">Join now to streamline your experience from day one</p>
              <Form className="space-y-4 mt-4"
                    form={form}
                    onFinish={(values) => sendOTP(values)}
                    layout={'vertical'}
              >
                <div className={'mb-3 flex justify-center'}>
                  <label className={'font-bold text-left'}>
                    OTP
                  </label>
                </div>

                <Form.Item name={'otp'}>
                  <Input.OTP/>
                </Form.Item>
                <Button className="w-full  "
                        type="primary"
                        onClick={() => {
                          form.submit()
                        }}
                >
                  Send OTP
                </Button>
              </Form>


              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2025 </p>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </div>
            </div>
            {/* Right Section: Promotional Content */}
            <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Effortlessly manage your team and operations.</h2>
              <p className="mb-6">Log in to access the CRM dashboard and manage your team.</p>
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
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-1/2 p-10">
              <div className="flex items-center mb-8">
              </div>
              <h1 className="text-3xl font-bold mb-2">Xác thực thành công </h1>
              <p className="text-gray-500 mb-6">You now can login with your new account</p>
              <div className={'flex justify-center'}>
                <div className={'w-40 h-40 '}>
                  <Image src={`${IMAGE_URL}/checked.png`} preview={false}/>
                </div>
              </div>
              <Button className={'!mt-5'} type={'primary'} onClick={() => {
                navigate('/login')
              }}>
                Go to login
              </Button>
              <div className="mt-8 text-xs text-gray-500 flex justify-between">
                <p>Copyright © 2025 </p>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </div>
            </div>
            {/* Right Section: Promotional Content */}
            <div className="w-1/2 bg-blue-600 p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Effortlessly manage your team and operations.</h2>
              <p className="mb-6">Log in to access the CRM dashboard and manage your team.</p>
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

  )
}

export default RegisterPage
