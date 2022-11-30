import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { pathapp } from "../../constant/path";
import { mobile, tablet, laptop, desktop } from "../../reponsive";

const Item = styled.div`
  width: 350px;
  height: 450px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  position: relative;
  cursor: pointer;
  ${desktop({ width: "300px", height: "350px" })}
  ${laptop({ width: "250px", height: "350px" })}
  ${tablet({ width: "300px", height: "400px" })}
  ${mobile({ width: "150px", height: "250px" })}
`;

const Img = styled.img`
  width: 300px;
  height: 350px;
  margin-bottom: 0.25rem;
  border: none;
  ${desktop({ width: "250px", height: "300px" })}
  ${laptop({ width: "200px", height: "300px" })}
  ${tablet({ width: "200px", height: "300px" })}
  ${mobile({ width: "100px", height: "200px" })}
`;
const Title = styled.h3`
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 0.25rem;
`;
const Price = styled.span`
  margin-bottom: 0.75rem;
`;

const Product = ({ id, title, price, image }) => {
  return (
    <NavLink to={pathapp.products + id}>
      <Item>
        <Img src={image} />
        <Title>{title.substring(0, 12)}</Title>
        <Price>$ {price}</Price>
      </Item>
    </NavLink>
  );
};

export default Product;
