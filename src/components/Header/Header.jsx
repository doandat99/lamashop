import React from "react";
import { Badge } from "@material-ui/core";
import { ShoppingCart, Search } from "@material-ui/icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/selector";
import { path, pathcart } from "../../constant/path";

const Container = styled.div`
  height: 5rem;
  width: 100%;
  box-shadow: 5px 5px 8px #b9b6b6;
`;
const Wrapper = styled.div`
  padding: 1.25rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Language = styled.p`
  font-size: 14px;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
  border: 1px solid gainsboro;
  padding: 0.25rem;
`;
const InputSearch = styled.input`
  outline: none;
  border: none;
  padding: 0.125rem;
`;
const Center = styled.div`
  text-align: center;
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

export const Header = () => {
  const cart = useSelector(cartSelector);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchBox>
            <InputSearch />
            <Search />
          </SearchBox>
        </Left>
        <Center>
          <Logo>LAMA.</Logo>
        </Center>
        <Right>
          {path.map((item, index) => (
            <MenuItem key={index}>
              <NavLink to={item.url}>{item.name}</NavLink>
            </MenuItem>
          ))}
          <MenuItem>
            <NavLink to={pathcart.url}>
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
    </Container>
  );
};
