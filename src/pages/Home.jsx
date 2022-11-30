import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { get } from "../api/product";
import Product from "../components/Products/Product";
import Button from "@material-ui/core/Button";
import { mobile, tablet, laptop, desktop } from "../reponsive";
import CircularProgress from "@material-ui/core/CircularProgress";

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 50px auto;
  position: relative;
  &::after {
    content: "";
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 10rem;
    height: 0.1rem;
    background-color: #504f4f;
  }
`;

const Toast = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 20rem auto;
`;

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
const Box = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;
const Banner = styled.div`
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
`;

const Home = () => {
  // Limited number of products taken out
  const [limit, setLimit] = useState(8);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  //Take from the first word part to the limit position
  const slice = data.slice(0, limit);

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

  const LoadMore = () => {
    setLimit(limit + 4);
  };

  // Check Loading data
  if (loading) {
    return (
      <Toast>
        <CircularProgress disableShrink />
      </Toast>
    );
  }
  // Check api error
  if (error) {
    return <Toast>....Have Errors</Toast>;
  }
  // Check data null
  if (data.length === 0) {
    return <Toast>....Data not define</Toast>;
  }

  return (
    <div className="Homepages">
      <Banner>
        <Img
          src="https://images.vexels.com/media/users/3/194731/raw/98a06d45de142b379f6d236526aa9ada-shop-online-web-slider-design.jpg"
          alt="banner"
        />
      </Banner>
      <Title>Lastet Product</Title>
      <Container>
        {slice.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
          />
        ))}
      </Container>
      {
        // Check loadmore, if data > 0 show button , else show null
        data.length - limit > 0 ? (
          <Box>
            <Button variant="contained" color="primary" onClick={LoadMore}>
              Load more
            </Button>
          </Box>
        ) : null
      }
    </div>
  );
};

export default Home;
