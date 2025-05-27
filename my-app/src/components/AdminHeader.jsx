import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const AdminHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="mb-8">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        className="mb-1"
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AdminHeader;
