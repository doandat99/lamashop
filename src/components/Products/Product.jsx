import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { pathproduct } from "../../constant/path";

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
`;

const Img = styled.img`
  width: 300px;
  height: 350px;
  margin-bottom: 0.25rem;
  border: none;
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
  font-size: 14px;
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
        <NavLink to={pathproduct.Product + id}>
          <Detail>Detail</Detail>
        </NavLink>
      </Item>
    </div>
  );
};

export default Product;
