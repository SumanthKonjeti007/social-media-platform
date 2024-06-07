import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";

const LoginPage = () => {
  // Get the default theme settings
  const theme = useTheme();
  // Check if the screen size is greater than 1000px
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      {/* Header section with the app name */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Instopedia
        </Typography>
      </Box>

      {/* Main content box which adjusts width based on screen size */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* Welcome message */}
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Instopedia, the Social Media for Sociopaths!
        </Typography>
        {/* Form component for user login */}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
