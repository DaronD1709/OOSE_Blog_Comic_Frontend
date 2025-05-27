import { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { updateUser } from '../../services/userService.js'
import { AuthContext } from '../../context/auth.context.jsx'

function UserForm () {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form] = Form.useForm()
  const { user, setUser } = useContext(AuthContext)
  useEffect(() => {

  }, [user])
  const validate = (data) => {
    const newErrors = {}

    if (!data.displayName) {
      newErrors.displayName = 'Vui lòng nhập họ tên'
    }

    if (!data.email) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!data.username) {
      newErrors.username = 'Vui lòng nhập tên người dùng'
    }

    return newErrors
  }
  const handleFormSubmit = async (values) => {
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true)

        // Chuẩn bị dữ liệu theo định dạng UserUpdateReq của backend
        const userUpdateReq = {
          displayName: values.displayName,
          email: values.email,
          username: values.username
        }
        const res = await updateUser(user.id, userUpdateReq)
        setUser(prev => ({ ...prev, ...res }))
        message.success('Cập nhật thông tin thành công')
      } catch (error) {
        message.error('Có lỗi xảy ra khi cập nhật thông tin')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    user !== null && user !== undefined && (
      <div className="w-full">
        <Card
          title="Cập nhật thông tin"
          className="shadow-sm rounded-lg"
          bodyStyle={{ padding: '24px' }}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFormSubmit}
            className="p-2"
            initialValues={{
              displayName: user.displayName,
              email: user.email,
              username: user.username,
            }}
          >
            <Form.Item
              label="Tên hiển thị"
              name="displayName"
              validateStatus={errors.displayName ? 'error' : ''}
              help={errors.displayName}
            >
              <Input className="rounded"/>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email}
            >
              <Input className="rounded"/>
            </Form.Item>

            <Form.Item
              label="Tên người dùng"
              name="username"
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username}
            >
              <Input className="rounded"/>
            </Form.Item>

            <Form.Item className="flex justify-center mt-6">
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={loading}
                className="px-8 h-10"
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  )

}

export default UserForm