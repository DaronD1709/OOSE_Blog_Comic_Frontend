import { Box, IconButton, Typography, useTheme } from "@mui/material";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  return (
    <Box className="m-5">
      <Box className="flex justify-between items-center">
        <AdminHeader title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
