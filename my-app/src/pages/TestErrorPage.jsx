import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Typography, Card } from "antd";

const { Title, Text } = Typography;

const TestErrorPage = () => {
  const navigate = useNavigate();

  const testErrors = [
    {
      name: "404 Not Found",
      path: "/test-error/404",
      description: "Test page not found error",
    },
    {
      name: "403 Forbidden",
      path: "/test-error/403",
      description: "Test forbidden access error",
    },
    {
      name: "500 Server Error",
      path: "/test-error/500",
      description: "Test server error",
    },
    {
      name: "Network Error",
      path: "/test-error/network",
      description: "Test network error",
    },
    {
      name: "Unknown Error",
      path: "/test-error/unknown",
      description: "Test unknown error",
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2}>Error Page Testing</Title>
      <Text type="secondary" style={{ marginBottom: "24px", display: "block" }}>
        Click on any button below to test different types of errors
      </Text>

      <Space direction="vertical" style={{ width: "100%" }}>
        {testErrors.map((error) => (
          <Card key={error.path} style={{ marginBottom: "16px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={4}>{error.name}</Title>
              <Text>{error.description}</Text>
              <Button
                type="primary"
                danger
                onClick={() => navigate(error.path)}
              >
                Test {error.name}
              </Button>
            </Space>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default TestErrorPage;
