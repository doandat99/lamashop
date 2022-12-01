import React from "react";
import { Badge, IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, userSelector } from "../../redux/selector";
import { pathapp } from "../../constant/path";
import { mobile, tablet } from "../../reponsive";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableTemporaryDrawer } from "../Sidebar/Sidebar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../../redux/redux-thunk/usersSlice";

const Container = styled.div`
  width: 100%;
  box-shadow: 5px 5px 8px #b9b6b6;
  ${mobile({ height: "3rem" })}
`;
const Wrapper = styled.div`
  padding: 1.25rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  ${mobile({ padding: "0 2rem" })}
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const Menuitem = styled.div`
  margin-left: 1.25rem;
  cursor: pointer;
`;

const Menus = styled.div`
  display: none;
  ${tablet({ display: "block" })}
  ${mobile({ display: "block" })}
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = () => {
  //selector
  const cart = useSelector(cartSelector);
  const user = useSelector(userSelector);

  // state
  const [state, setState] = React.useState({
    left: false,
  });

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const position = user?.email.indexOf("@");
  const name = user?.email.substring(0, position);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Container>
      <Wrapper>
        <Menus>
          <IconButton onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
        </Menus>

        <Left>
          <NavLink to="/">
            <Logo>LAMA.</Logo>
          </NavLink>
        </Left>
        <Center>
          <Menuitem>
            <NavLink to={pathapp.home}>Home</NavLink>
          </Menuitem>
          <Menuitem>
            <NavLink to={pathapp.products}>Products</NavLink>
          </Menuitem>
          <Menuitem>
            <NavLink to={pathapp.about}>About</NavLink>
          </Menuitem>
          {user ? (
            <MenuItem>
              <Item
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {name || ""}
                <AccountCircleIcon />
              </Item>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </MenuItem>
          ) : (
            <>
              <Menuitem>
                <NavLink to={pathapp.signin}>Signin</NavLink>
              </Menuitem>
              <Menuitem>
                <NavLink to={pathapp.signup}>Register</NavLink>
              </Menuitem>
            </>
          )}
        </Center>
        <Right>
          <MenuItem>
            <NavLink to={pathapp.cart}>
              <Badge
                badgeContent={cart.length}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCart />
              </Badge>
            </NavLink>
          </MenuItem>
        </Right>
      </Wrapper>
      <SwipeableTemporaryDrawer state={state} toggleDrawer={toggleDrawer} />
    </Container>
  );
};
export default Header;
