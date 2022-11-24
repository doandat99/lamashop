import React from "react";
import { Badge, IconButton } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/selector";
import { path, pathapp } from "../../constant/path";
import { mobile, tablet } from "../../reponsive";
import MenuIcon from "@material-ui/icons/Menu";
import { SwipeableTemporaryDrawer } from "../Sidebar/Sidebar";

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
  text-align: center;
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

const MenuItem = styled.span`
  margin-left: 1.25rem;
  cursor: pointer;
`;

const Menu = styled.div`
  display: none;
  ${tablet({ display: "block" })}
  ${mobile({ display: "block" })}
`;

const Header = () => {
  //selector
  const cart = useSelector(cartSelector);

  // state
  const [state, setState] = React.useState({
    left: false,
  });

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
        <Menu>
          <IconButton onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
        </Menu>

        <Left>
          <NavLink to="/">
            <Logo>LAMA.</Logo>
          </NavLink>
        </Left>
        <Center>
          {path.map((item, index) => (
            <MenuItem key={index}>
              <NavLink to={item.url}>{item.name}</NavLink>
            </MenuItem>
          ))}
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
