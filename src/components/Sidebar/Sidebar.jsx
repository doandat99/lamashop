import React from "react";
import { Box, Drawer, makeStyles, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import {
  Home,
  Person,
  ImportContacts,
  BusinessCenter,
} from "@material-ui/icons";
import { pathapp } from "../../constant/path";

const useStyles = makeStyles(() => ({
  sidebar: {
    width: "20rem",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    fontWeight: "bold",
    padding: "2rem ",
  },
  item: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "1rem 0 1rem 1rem",
  },
  padding: {
    paddingLeft: "1rem",
  },
}));

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(false);
  };

  const classes = useStyles();

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleClick}>
      <Box className={classes.sidebar}>
        <Typography className={classes.title} variant="h5" component="div">
          LaMa Shop
        </Typography>
        <div>
          <div className={classes.item} onClick={handleClick}>
            <Home />
            <NavLink className={classes.padding} to={pathapp.home}>
              Home
            </NavLink>
          </div>
          <div className={classes.item} onClick={handleClick}>
            <BusinessCenter />
            <NavLink className={classes.padding} to={pathapp.products}>
              Product
            </NavLink>
          </div>
          <div className={classes.item} onClick={handleClick}>
            <ImportContacts />
            <NavLink className={classes.padding} to={pathapp.about}>
              About
            </NavLink>
          </div>
          <div className={classes.item} onClick={handleClick}>
            <Person />
            <NavLink className={classes.padding} to={pathapp.signin}>
              Signin
            </NavLink>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};
