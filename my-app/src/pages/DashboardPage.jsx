import { Card, Col, Row, Typography, Divider, Select, message } from 'antd'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import { getUserCountByRoleAPI } from '../services/userService.js'
import { getStatisticAPI } from '../services/blogService.js'
import { validate } from '../utils/validate.js'

// Thêm logic lấy data

const { Title, Text } = Typography
const { Option } = Select

const DashboardPage = () => {
  const [userStats, setUserStats] = useState(null)
  const [dailyData, setDailyData] = useState(null)
  const getStatistic = async () => {
    try {
      const userRole = await getUserCountByRoleAPI('USER')
      const adminRole = await getUserCountByRoleAPI('ADMIN')
      const bloggerRole = await getUserCountByRoleAPI('BLOGGER')
      setUserStats({
        total: adminRole + bloggerRole + userRole,  // Cần hàm tính total
        admins: adminRole,
        bloggers: bloggerRole,
        registered: userRole
      })
      const data = await getStatisticAPI()
      setDailyData(data)

    } catch (err) {
      message.error(err.data)
    }
  }

  useEffect(() => {
    getStatistic()
  }, [])

  const reportCategories = [
    { title: 'Số blog đã đăng', key: 'blogs' },
    { title: 'Số lượt xem tất cả blog', key: 'views' },
    { title: 'Số lượt đánh giá', key: 'rates' },
    { title: 'Tổng số bình luận', key: 'comments' },
    { title: 'Tổng số lượt reaction', key: 'reactions' }
  ]

  // -----Hardcode data-----

  const [expandedCategories, setExpandedCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(['blogs'])

  const handleSelect = (key) => {
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  return (
    <>
      {
        validate(userStats) && validate(dailyData)
        &&
        <div className="bg-[#000000] min-h-screen text-white px-4 py-6 sm:ml-32">
          <Title level={3} style={{ color: 'white' }}>Thống kê hệ thống</Title>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                title={
                  <Title level={5} style={{ color: 'white', margin: 0 }}>
                    Số lượng người dùng: {userStats.total}
                  </Title>
                }
                onClick={() => handleSelect('users')}
                hoverable
                className="cursor-pointer"
                style={{ backgroundColor: '#2a1a2f', border: 'none' }}
              >
                <AnimatePresence initial={false}>
                  {expandedCategories.includes('users') && (
                    <motion.div
                      key="user-card"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden', color: 'white' }}
                    >
                      <Text style={{ color: 'white' }}>Admin: <strong>{userStats.admins}</strong></Text><br/>
                      <Text style={{ color: 'white' }}>Blogger: <strong>{userStats.bloggers}</strong></Text><br/>
                      <Text style={{ color: 'white' }}>User thường: <strong>{userStats.registered}</strong></Text>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </Col>

            {reportCategories.map((category) => {
              const total = dailyData.reduce((sum, item) => sum + item[category.key], 0)
              const today = dailyData[dailyData.length - 1][category.key]

              return (
                <Col xs={24} sm={12} md={8} key={category.key}>
                  <Card
                    title={
                      <Title level={5} style={{ color: 'white', margin: 0 }}>
                        {`${category.title}: ${total}`}
                      </Title>
                    }
                    onClick={() => handleSelect(category.key)}
                    hoverable
                    className="cursor-pointer"
                    style={{ backgroundColor: '#2a1a2f', border: 'none' }}
                  >
                    <AnimatePresence initial={false}>
                      {expandedCategories.includes(category.key) && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden', color: 'white' }}
                        >
                          <Text style={{ color: 'white' }}>
                            {category.title} hôm nay: <strong>{today}</strong>
                          </Text>
                          <div style={{ height: 180, marginTop: 12 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={dailyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
                                <XAxis dataKey="date" stroke="#ccc"/>
                                <YAxis stroke="#ccc"/>
                                <Tooltip/>
                                <Line
                                  type="monotone"
                                  dataKey={category.key}
                                  stroke="#ff85c0"
                                  strokeWidth={2}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </Col>
              )
            })}
          </Row>

          <Divider style={{ backgroundColor: '#444' }}/>

          <Title level={4} style={{ color: 'white' }}>Thống kê tổng hợp</Title>

          <Select
            className="custom-select"
            mode="multiple"
            placeholder="Chọn loại dữ liệu để hiển thị"
            optionLabelProp="label"
            value={selectedCategories}
            onChange={setSelectedCategories}
            style={{
              width: '100%',
              maxWidth: 500,
              marginBottom: 24,
              backgroundColor: '#000000',
              color: 'grey'
            }}
            dropdownStyle={{ backgroundColor: '#000000', color: 'grey' }}
          >
            {reportCategories.map((category) => (
              <Option
                key={category.key}
                value={category.key}
                label={category.title}
                style={{ color: 'grey' }}
              >
                {category.title}
              </Option>
            ))}
          </Select>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ minWidth: 600 }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
                  <XAxis dataKey="date" stroke="#ccc"/>
                  <YAxis stroke="#ccc"/>
                  <Tooltip/>
                  <Legend/>
                  {selectedCategories.map((key, idx) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={['#ff85c0', '#40a9ff', '#ffc658', '#73d13d', '#d46b08'][idx % 5]}
                      strokeWidth={2}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      }
    </>
  )
}

export default DashboardPage
