/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import { signup } from "../redux/redux-thunk/usersSlice";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import {
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  TextField,
} from "@material-ui/core";

import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Phone,
} from "@material-ui/icons";
import { signupSchema } from "../constant/validation";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyle = makeStyles((theme) => ({
  layout: {
    width: "40vw",
    margin: "5rem auto",
    justifyContent: "center",
    padding: "3rem 2rem",
    borderRadius: 5,
    border: "1px solid rgba(0,0,0,0.23)",
    boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.23)",
    [theme.breakpoints.down("md")]: {
      width: "85vw",
      border: "none",
      boxShadow: "none",
    },
    [theme.breakpoints.only("md")]: {
      width: "70vw",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    marginBottom: "2rem",
  },
  signin: {
    display: "flex",
    alignItems: "center",
  },
}));

const Signup = () => {
  const classes = useStyle();
  const [show, setShow] = useState(false);
  const [confirm_password, setConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleChangePassWord = () => {
    setShow(!show);
  };

  const handleChangeForgot = () => {
    setConfirm(!confirm_password);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      phonenumber: "",
    },

    validationSchema: signupSchema,

    onSubmit: (values) => {
      dispatch(signup(values));
    },
  });

  return (
    <Grid container className={classes.layout}>
      <Grid item className={classes.margin}>
        <Typography variant="h4">Sign up</Typography>
      </Grid>
      <Grid item className={classes.item}>
        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          onReset={formik.handleReset}
        >
          <TextField
            name="username"
            id="username"
            type="text"
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            variant="outlined"
            className={classes.margin}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            name="email"
            id="email"
            type="email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            value={formik.values.email}
            fullWidth
            variant="outlined"
            className={classes.margin}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="phonenumber"
            id="phonenumber"
            type="text"
            label="Phone number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            onChange={formik.handleChange}
            value={formik.values.phonenumber}
            fullWidth
            variant="outlined"
            className={classes.margin}
            error={
              formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
            }
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
          />
          <TextField
            name="password"
            id="password"
            type={show ? "text" : "password"}
            label="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleChangePassWord}
                >
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            onChange={formik.handleChange}
            value={formik.values.password}
            fullWidth
            variant="outlined"
            className={classes.margin}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            name="confirm_password"
            id="confirm_password"
            type={confirm_password ? "text" : "password"}
            label="Confirm Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleChangeForgot}
                >
                  {confirm_password ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            fullWidth
            variant="outlined"
            className={classes.margin}
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className={classes.margin}
          >
            Sign up
          </Button>
        </form>
        <NavLink to="/signin" className={classes.signin}>
          <ArrowBackIcon /> Back to Signin
        </NavLink>
      </Grid>
    </Grid>
  );
};
export default Signup;
