import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get } from "../../api/product";
// import { get as call } from "../../api/category";
import { mobile, tablet, laptop, desktop } from "../../reponsive";
import CircularProgress from "@material-ui/core/CircularProgress";
import Product from "./Product";

const Container = styled.div`
  width: 90vw;
  height: 100%;
  margin: 50px auto;
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-between;
  row-gap: 3rem;
  ${desktop({ gridTemplateColumns: "auto auto auto auto", rowGap: "2rem" })}
  ${laptop({ gridTemplateColumns: "auto auto auto" })}
  ${tablet({ gridTemplateColumns: "auto auto" })}
  ${mobile({ gridTemplateColumns: "auto auto" })}
`;

const Message = styled.div`
  font-size: 2rem;
  text-align: center;
  height: 100vh;
  margin: 20rem auto;
`;

const ButtonItem = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 1rem 1.5rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  background-color: #ffff;
  cursor: pointer;
  text-transform: capitalize;
  margin-top: 1rem;
  ${mobile({ padding: "0.5rem", fontSize: "0.7rem" })}
`;

const ButtonToggle = styled(ButtonItem)`
  opacity: 0.6;
  ${({ active }) =>
    active && `opacity:1;  background-color:#333333; color:#ffff`}
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  padding-top: 3rem;
  ${mobile({ paddingTop: "1rem" })}
`;

const types = [
  "all",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

const Products = () => {
  const [data, setData] = useState([]);

  const [filterData, setFilterData] = useState(data);

  const [active, setActive] = useState(types[0]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await get();
      setData(data);
      setFilterData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const filterProduct = (category) => {
    const updateData = data.filter((data) => data.category === category);
    setFilterData(updateData);
  };

  // Check Loading data
  if (loading) {
    return (
      <Message>
        <CircularProgress disableShrink />
      </Message>
    );
  }
  // Check api bị lỗi
  if (error) {
    return <Message>....Have Errors</Message>;
  }
  // Check data rỗng
  if (data.length === 0) {
    return <Message>....Data not define</Message>;
  }

  return (
    <>
      <Wrapper>
        <ButtonGroup>
          {types.map((type) => (
            <ButtonToggle
              key={type}
              active={active === type}
              onClick={() => {
                if (type === "all") {
                  setActive(type);
                  setFilterData(data);
                } else {
                  setActive(type);
                  filterProduct(type);
                }
              }}
            >
              {type}
            </ButtonToggle>
          ))}
        </ButtonGroup>
      </Wrapper>
      <Container>
        {filterData.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
          />
        ))}
      </Container>
    </>
  );
};
export default Products;
