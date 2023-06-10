import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Box, TextField, FormControl, IconButton, InputAdornment, OutlinedInput, InputLabel, Typography, Button, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Auth = ({ setIsLogin, setUser, isLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);

  useEffect(() => {
    // Clear the form everytime change signUp state
    formik.resetForm();
  }, [signUp]);

  useEffect(() => {
    // Check for user token and ID in localStorage on component mount
    const userToken = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    if (userToken && userId) {
      setIsLogin(true);
      fetchUserData(userToken, userId);
    }
  }, []);

  const validation = signUp ?
    Yup.object({
      username: Yup.string()
        .min(2, "Length must be between 2 and 15 characters")
        .max(15, "Length must be between 2 and 15 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email addresss")
        .required("Required"),
      password: Yup.string()
        .min(8, "Length must be between 8 and 128 characters")
        .max(128, "Length must be between 8 and 128 characters")
        .required("Required"),
    }) :
    Yup.object({
      email: Yup.string()
        .email("Invalid email addresss")
        .required("Required"),
      password: Yup.string()
        .min(8, "Length must be between 8 and 128 characters")
        .max(128, "Length must be between 8 and 128 characters")
        .required("Required"),
    });

  const fetchUserData = async (userToken, id) => {
    try {
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUser(response.data);
      setIsLogin(true);
    } catch (error) {
      console.log('Error fetching user data: ', error);
      // Clear the user token and set the login state to false
      localStorage.removeItem('userToken');
      setIsLogin(false);
    }
  };

  const formik = signUp ?
    // validation for sign up
    useFormik({
      initialValues: {
        username: '',
        email: '',
        password: ''
      },
      validationSchema: validation,
      onSubmit: async (values) => {
        console.log('values: ', values);
        try {
          const response = await axios.post('/api/register', values);
          if (response.status === 201) {
            alert('Congratulations! You have successfully signed up.');
            setSignUp(false);
          }
        } catch (error) {
          console.log('Err in sign up: ', error)
          alert(error.response.data);
        }
      },
    }) :
    // validation for sign in
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: validation,
      onSubmit: async (values) => {
        try {
          const response = await axios.post('/api/login', values);
          if (response.status === 201) {
            alert(`Welcome back, ${response.data.userData.username}`);
            const userToken = response.data.token;
            const userId = response.data.id;
            localStorage.setItem('userToken', userToken);
            localStorage.setItem('userId', userId);
            console.log('userData', response.data.userData)
            setUser(response.data.userData);
            setIsLogin(true);
            fetchUserData(userToken, userId);
          }
        } catch (error) {
          console.log('Err in sign up: ', error)
          alert(error.response.data);
        }
      },
    });

  return (
    <div className='auth-container'>
      <h1>Welcome!</h1>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
        autoComplete="on"
        onSubmit={formik.handleSubmit}
      >
        {signUp && <TextField
          required
          id="outlined-required"
          name='username'
          label="Userame"
          value={formik.values.username || ''}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />}
        <TextField
          required
          id="outlined-email"
          type='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControl required sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.password && formik.errors.password && (
            <Typography variant="caption" color="error">
              {formik.errors.password}
            </Typography>
          )}
        </FormControl>
        <Button variant="contained" color="success" type="submit">{signUp ? 'Sign Up' : 'Sign In'}</Button>
        <Divider>Or sign up with</Divider>
      </Box>
      {!signUp && <div>Don't have an account? <u onClick={() => setSignUp(true)}>Sign up</u></div>}
      {signUp && <div>Already have an account? <u onClick={() => setSignUp(false)}>Sign in</u></div>}
    </div >
  )
}

export default Auth
