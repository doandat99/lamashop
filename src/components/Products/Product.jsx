import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { pathapp } from "../../constant/path";
import { mobile, tablet } from "../../reponsive";

const Item = styled.div`
  width: 350px;
  height: 450px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  ${tablet({ width: "300px", height: "400px" })}
  ${mobile({ width: "150px", height: "200px" })}
`;

const Img = styled.img`
  width: 300px;
  height: 350px;
  margin-bottom: 0.25rem;
  border: none;
  ${tablet({ width: "200px", height: "300px" })}
  ${mobile({ width: "90px", height: "140px" })}
`;
const Title = styled.h3`
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 0.25rem;
`;
const Price = styled.span`
  margin-bottom: 0.75rem;
`;
const Detail = styled.button`
  width: 6rem;
  padding: 0.5rem;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #a8a5a5;
  color: #111111;
  &:hover {
    background-color: #111111;
    color: #fff;
    transition: all 0.5s ease-in-out;
  }
`;

const Product = ({ id, title, price, image }) => {
  return (
    <div>
      <Item>
        <Img src={image} />
        <Title>{title.substring(0, 12)}</Title>
        <Price>$ {price}</Price>
        <NavLink to={pathapp.products + id}>
          <Detail>Detail</Detail>
        </NavLink>
      </Item>
    </div>
  );
};

export default Product;
