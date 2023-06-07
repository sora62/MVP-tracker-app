import React, { useState } from 'react'
import { useFormik, Formik, Form, useField } from 'formik';
import * as Yup from "yup";

import Box from '@mui/material/Box';
import { TextField, FormControl, IconButton, InputAdornment, OutlinedInput, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Auth = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const validation = signUp ?
    Yup.object({
      name: Yup.string()
        .min(2, "Length must be between 2 and 15 characters")
        .max(15, "Length must be between 2 and 15 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email addresss`")
        .required("Required"),
      password: Yup.string()
        .min(8, "Length must be between 8 and 128 characters")
        .max(128, "Length must be between 8 and 128 characters")
        .required("Required"),
    }) :
    Yup.object({
      email: Yup.string()
        .email("Invalid email addresss`")
        .required("Required"),
      password: Yup.string()
        .min(8, "Length must be between 8 and 128 characters")
        .max(128, "Length must be between 8 and 128 characters")
        .required("Required"),
    });
  const formik = signUp ?
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: ''
      },
      validationSchema: validation,
      onSubmit: (values) => {
        console.log('values: ', values);
      },
    }) :
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: validation,
      onSubmit: (values) => {
        console.log('values: ', values);
        setIsLogin(true);
      },
    });

  return (
    <div className='auth-container'>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}
        autoComplete="on"
        onSubmit={formik.handleSubmit}
      >
        {signUp && <TextField
          id="outlined-required"
          name='name'
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />}
        <TextField
          id="outlined-email"
          type='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name='password'
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
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helpertext={formik.touched.password && formik.errors.password}
          />
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
