import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { cartSelector } from "../redux/selector";

import DeliveryForm from "../components/Delivery/DeliveryForm";

const useStyle = makeStyles(() => ({
  container: {
    width: "80vw",
    display: "flex",
    margin: "3rem auto",
    justifyContent: "space-between",
    "@media (max-width:768px)": {
      flexDirection: "column",
      alignItems: "center",
    },
    "@media (max-width:425px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  image: {
    width: "5rem",
    height: "6rem",
  },
  form: {
    width: "40rem",
    "@media (max-width:768px)": {
      width: "100%",
      paddingTop: "2rem",
    },
    "@media (max-width:425px)": {
      width: "100%",
      paddingTop: "2rem",
    },
  },
  product: {
    width: "35rem",
    fontSize: "1.2rem",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "5px",
    "@media (max-width:425px)": {
      width: "100%",
    },
    "@media (max-width:768px)": {
      width: "100%",
    },
  },
  item: {
    display: "grid",
    marginBottom: "2rem",
    gridTemplateColumns: "5fr 2fr",
    marginTop: "2rem",
    justifyContent: "space-between",
    padding: "1rem",
  },
  marginlef: {
    marginLeft: "2rem",
  },
  marginbottom: {
    marginBottom: "0.5rem",
    paddingLeft: "2rem",
  },
  title: {
    display: "grid",
    gridTemplateColumns: "5fr 2fr",
    padding: "1rem 1.75rem",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
  },
  text: {
    textAlign: "center",
    marginTop: "3rem",
    fontSize: "2rem",
    textTransform: "uppercase",
  },
}));

export const Delivery = () => {
  const classes = useStyle();

  const cart = useSelector(cartSelector);

  const total = cart.reduce((sum, curr) => {
    return sum + curr.price * curr.quantity;
  }, 0);

  return (
    <>
      <p className={classes.text}>Delivery Information</p>
      <div className={classes.container}>
        <div className={classes.product}>
          <div className={classes.title}>
            <div>Product</div>
            <div className={classes.flex}>
              <div>Qty</div>
              <div className={classes.marginlef}>Price</div>
            </div>
          </div>
          {cart.map((item, index) => (
            <div key={index} className={classes.item}>
              <div className={classes.flex}>
                <img className={classes.image} src={item.image} alt="" />
                <p className={classes.marginbottom}>
                  {item.title.substring(0, 12)}
                </p>
              </div>

              <div className={classes.flex}>
                <p>{item.quantity}</p>
                <p className={classes.marginlef}>{item.price} $</p>
              </div>
            </div>
          ))}
          <div>
            {cart.length > 0 ? (
              <div className={classes.total}>
                <p>Total :</p>
                <p>{total.toFixed(2)}$ </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className={classes.form}>
          <DeliveryForm />
        </div>
      </div>
    </>
  );
};
