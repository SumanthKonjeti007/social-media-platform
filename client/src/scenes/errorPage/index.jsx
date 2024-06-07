import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween"; // Assuming you have a FlexBetween component

const ErrorPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      backgroundColor={theme.palette.background.default}
    >
      <FlexBetween
        flexDirection="column"
        gap="1rem"
        padding="2rem"
        borderRadius="1.5rem"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
        backgroundColor={theme.palette.background.alt}
        textAlign="center"
        maxWidth="400px"
      >
        <Typography variant="h4" color="error">
          Login Failed
        </Typography>
        <Typography variant="body1" color={theme.palette.text.primary}>
          Invalid credentials. Please try again.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            marginTop: "1rem",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
        >
          Go to Login Page
        </Button>
      </FlexBetween>
    </Box>
  );
};

export default ErrorPage;
