import React, { useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { NavLink, useSearchParams } from "react-router-dom";
import { pathapp } from "../constant/path";
import { cartSlice } from "../redux/reducer/cart";
import { useDispatch } from "react-redux";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "60vw",
    margin: "6rem auto 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  title: {
    fontSize: "4rem",
    marginBottom: "2rem",
  },
  button: {
    marginTop: "2rem",
  },
}));

const PaymentSuccess = () => {
  const classes = useStyle();

  const [status] = useSearchParams();
  const dispatch = useDispatch();

  const statusCheckout = status.get("redirect_status");

  useEffect(() => {
    if (statusCheckout === "succeeded") {
      dispatch(cartSlice.actions.clearCart());
    }
  }, [statusCheckout, dispatch]);

  return (
    <div className={classes.container}>
      <p className={classes.title}>Payment Successful</p>
      <p>
        Thanks yours for your order, order will be shipped to you as soon as
        possible
      </p>
      <NavLink to={pathapp.home}>
        <Button className={classes.button} variant="contained" color="primary">
          Go home
        </Button>
      </NavLink>
    </div>
  );
};
export default PaymentSuccess;
