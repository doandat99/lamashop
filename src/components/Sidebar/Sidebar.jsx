import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, Typography } from "@material-ui/core";
import {
  Home,
  Person,
  ImportContacts,
  BusinessCenter,
} from "@material-ui/icons";
import { pathapp } from "../../constant/path";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
  item: {
    fontSize: "2rem",
  },
  title: {
    textAlign: "center",
    padding: "1rem 2rem",
  },
});

export const SwipeableTemporaryDrawer = ({ state, toggleDrawer }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const silde = [
    {
      name: "Home",
      icon: <Home className={classes.item} />,
      path: pathapp.home,
      onClick: () => navigate("/"),
    },
    {
      name: "Product",
      icon: <BusinessCenter className={classes.item} />,
      path: pathapp.products,
      onClick: () => navigate("/products"),
    },
    {
      name: "About",
      icon: <ImportContacts className={classes.item} />,
      path: pathapp.about,
      onClick: () => navigate("/about"),
    },
    {
      name: "Signin",
      icon: <Person className={classes.item} />,
      path: pathapp.signin,
      onClick: () => navigate("/signin"),
    },
  ];

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
    >
      <Box className={classes.sidebar}>
        <Typography className={classes.title} variant="h5" component="div">
          LaMa Shop
        </Typography>
        <List>
          {silde.map((item, index) => (
            <ListItem key={index} onClick={item.onClick}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
