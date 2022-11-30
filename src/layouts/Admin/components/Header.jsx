import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import HomeIcon from "@material-ui/icons/Home";
import { pathapp } from "../../../constant/path";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useStyles } from "./HeaderStyle";

const MiniDrawer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const paths = location.pathname;

  //state
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const rtl = "rtl";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const itemsList = [
    {
      text: "Dashbroad",
      icon: <HomeIcon />,
      path: pathapp.admin,
    },
    {
      text: "Product",
      icon: <BusinessCenterIcon />,
      path: pathapp.adminproduct,
    },
    {
      text: "User",
      icon: <AccountCircle />,
      path: pathapp.admincategory,
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            LaMa Admin
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary" overlap="rectangular">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary" overlap="rectangular">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          {renderMenu}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === rtl ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, path } = item;

            return (
              <ListItem
                button
                key={text}
                component={Link}
                to={path}
                selected={path === paths}
              >
                <ListItemIcon>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Outlet />
      </main>
    </div>
  );
};
export default MiniDrawer;
