import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { signinSchema } from "../constant/validation";
import {
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  Button,
  TextField,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  Lock,
  ArrowForward,
  Email,
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { signin } from "../redux/redux-thunk/usersSlice";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    margin: "10rem auto",
    width: "40rem",
    padding: "3rem 4rem",
    borderRadius: "20px",
    border: "1px solid rgba(0,0,0,0.23)",
    boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.23)",
    "@media (max-width:768px)": {
      border: "none",
      boxShadow: "none",
    },
    "@media (max-width:390px)": {
      width: "30rem",
      border: "none",
      boxShadow: "none",
      margin: "5rem auto 0",
      padding: "0 0",
    },
  },
  gird: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem 3rem",
    "@media(max-width:390px)": {
      padding: "0 0",
      marginTop: "2rem",
    },
  },
  form: {
    marginBottom: "2rem",
  },
  icon: {
    paddingLeft: "0.25rem",
  },
  account: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  text: {
    fontSize: "2rem",
  },
  left: {
    borderRight: "1px solid rgba(0,0,0,0.23)",
    display: "flex",
    alignItems: "center",
    letterSpacing: 3,
    lineHeight: 2,
    "@media (max-width:768px)": {
      display: "none",
    },
    "@media (max-width:390px)": {
      display: "none",
    },
  },
}));

const Signin = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: (values) => {
      dispatch(signin(values));
    },
  });

  const classes = useStyles();

  const [show, setShow] = useState(false);

  const hanldeChange = () => {
    setShow(!show);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.left}>
        <p className={classes.text}>Hello, Wellcome to LaMa Shop</p>
      </div>
      <Grid container className={classes.gird}>
        <Grid item>
          <Typography variant="h4">Sign In</Typography>
        </Grid>

        <Grid item className={classes.item}>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
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
              className={classes.form}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
                    onClick={hanldeChange}
                  >
                    {show ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
              onChange={formik.handleChange}
              value={formik.values.password}
              fullWidth
              variant="outlined"
              className={classes.form}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
              className={classes.form}
            >
              Login
            </Button>
          </form>

          <div>
            <NavLink to="/signup" className={classes.account}>
              Create new account <ArrowForward className={classes.icon} />
            </NavLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
