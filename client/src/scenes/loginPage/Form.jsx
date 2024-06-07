import React from 'react';
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
// Validation library
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
//import { API_BASE_URL } from "config";

/* FORM VALIDATIONS */
// Validation Schema for registration form
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// Validation Schema for login form
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// Initial values for registration form
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

// Initial values for login form
const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  // State to determine if the form is for login or registration
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme(); // Get the theme palette
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)"); // Check if the screen width is at least 600px
  const isLogin = pageType === "login"; // Check if the current form is for login
  const isRegister = pageType === "register"; // Check if the current form is for registration

  // Function to handle registration
  const register = async (values, onSubmitProps) => {
    try {
      // Create form data for registration
      // This allows us to sent form data with image data
      //const formData = new FormData();
    //   for (let value in values) {
    //     if (value === "picture") {
    //       // Append the image file to the form data
    //       formData.append("image", values.picture);
    //     } else {
    //       formData.append(value, values[value]);
    //     }
    //   }
    // for  (let value in values) {
    //     formData.append(value, values[value]);
    // }
    // formData.append("picturePath", values.picture.name);

      // Upload image to ImgBB and get the URL
    //   const imgbbKey = process.env.REACT_APP_IMGBB_API_KEY;
    //   const imgbbResponse = await fetch(
    //     `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );
    //   const imgbbData = await imgbbResponse.json();
    //   const imageUrl = imgbbData.data.url;

    //   // Update form data with the image URL
    //   const newFormData = {
    //     ...values,
    //     picturePath: imageUrl,
    //   };

      // Send registration data to the server
    //   const savedUserResponse = await fetch(`${API_BASE_URL}/auth/register`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newFormData),
    //   });
    console.log(JSON.stringify(values));
    const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values), // This is where the form data is stored and sent to the server.
      });
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      // Switch to login form if registration is successful
      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
    }
  };

  // Function to handle login
  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      // Check if the response is successful
      if (!loggedInResponse.ok) {
        throw new Error("Login failed: Invalid credentials");
      }
  
      const loggedIn = await loggedInResponse.json();
      onSubmitProps.resetForm();
  
      // Save login data and navigate to home page if login is successful
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/errorPage"); // Navigate to error page on failure
    } finally {
      onSubmitProps.setSubmitting(false); // Indicate that form submission is complete
    }
  };
  
  

  // Function to handle form submission
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values, // Current form values
        errors, // Form validation errors
        touched, // Fields that have been touched
        handleBlur, // Function to handle blur events
        handleChange, // Function to handle change events
        handleSubmit, // Function to handle form submission
        setFieldValue, // Function to set form field values
        resetForm, // Function to reset the form
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && ( //if it's register form we need additional form elements here...
              <>
                <TextField
                  label="First Name" //display placeholder
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : ( //If added to the dropzone, it should show the picture name and edit icon
                          <FlexBetween> 
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
