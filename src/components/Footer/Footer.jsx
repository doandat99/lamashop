import styled from "styled-components";
import React from "react";
import { Facebook, Twitter, Instagram, Pinterest } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { path } from "../../constant/path";
import { link } from "../../constant/link";

const Container = styled.div`
  width: 100%;
  background-color: #f8f8f8;
`;
const Wrapper = styled.div`
  padding: 2rem 3rem;
  text-align: center;
`;
const Title = styled.div`
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
const MenuIcon = styled.a`
  margin-right: 1rem;
  font-size: 2rem;
`;
const ListIcon = styled.div`
  margin-top: 1rem;
`;
const MenuList = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const MenuItem = styled.span`
  margin-left: 1.25rem;
  cursor: pointer;
`;

const Icon = [<Facebook />, <Twitter />, <Instagram />, <Pinterest />];

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Title>LAMA Shop</Title>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>

        <ListIcon>
          {link.map((item, index) => (
            <MenuIcon key={index} href={item}>
              {Icon[index]}
            </MenuIcon>
          ))}
        </ListIcon>

        <MenuList>
          {path.map((item, index) => (
            <MenuItem key={index}>
              <NavLink to={item.url}>{item.name}</NavLink>
            </MenuItem>
          ))}
        </MenuList>
        <p>Copyright &copy;2022 by Doan Dat</p>
      </Wrapper>
    </Container>
  );
};
export default Footer;
