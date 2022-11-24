import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get } from "../../api/product";
import { mobile, tablet, laptop } from "../../reponsive";
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
  ${laptop({ gridTemplateColumns: "auto auto " })}
  ${tablet({ gridTemplateColumns: "auto auto" })}
  ${mobile({ gridTemplateColumns: "auto auto" })}
`;

const Message = styled.div`
  font-size: 2rem;
  text-align: center;
  height: 100vh;
  margin: 20rem auto;
`;

const Products = () => {
  const [data, setData] = useState([]);

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
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
    <Container>
      {data.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={product.image}
          price={product.price}
          title={product.title}
        />
      ))}
    </Container>
  );
};
export default Products;
