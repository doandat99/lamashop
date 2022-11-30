import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/product";
import { AddShoppingCart, ShoppingCart } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import { Skeleton } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { cartSlice } from "../../redux/reducer/cart";
import { pathapp } from "../../constant/path";
import { mobile, tablet } from "../../reponsive";
import { Button } from "@material-ui/core";
import toastr from "toastr";

const Container = styled.div`
  width: 90vw;
  margin: 100px auto;
`;

const Wrapper = styled.div`
  width: 90vw;
  display: flex;
  ${tablet({
    flexWrap: "wrap ",
    justifyContent: "center",
  })}
  ${mobile({
    flexWrap: "wrap ",
    justifyContent: "center",
  })}
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 5rem;
  ${tablet({
    marginLeft: "0",
    padding: "4rem",
  })}
  ${mobile({
    marginLeft: "0",
    padding: "1rem",
  })}
`;

const Img = styled.img`
  width: 500px;
  height: 600px;
  ${tablet({
    width: "300px",
    height: "400px",
    marginBottom: "1rem",
  })}
  ${mobile({
    width: "200px",
    height: "300px",
    marginBottom: "5px",
  })}
`;

const Category = styled.h1`
  text-transform: capitalize;
  color: #d1d2d3;
  ${tablet({
    paddingBottom: "1rem",
  })}
  ${mobile({
    paddingBottom: "1rem",
  })}
`;

const Title = styled.h3`
  font-size: 2rem;
  padding-bottom: 5px;
  ${tablet({
    paddingBottom: "1rem",
  })}
  ${mobile({
    paddingBottom: "1rem",
  })}
`;

const Text = styled.p`
  letter-spacing: 0.1rem;
  line-height: 1.75rem;
  &::first-letter {
    text-transform: capitalize;
  }
  padding-bottom: 1rem;
  ${tablet({
    paddingTop: "1rem",
  })}
  ${mobile({
    paddingTop: "1rem",
  })}
`;

const BoxRating = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  ${tablet({
    paddingBottom: "1rem",
  })}
  ${mobile({
    paddingBottom: "1rem",
  })}
`;

const Number = styled.p`
  margin-right: 0.5rem;
  padding-bottom: 5px;
`;

const Price = styled.span`
  font-size: 2rem;
  padding-bottom: 5px;
  ${tablet({
    paddingBottom: "1rem",
  })}
  ${mobile({
    paddingBottom: "1rem",
  })}
`;

const ButtonList = styled.div`
  display: flex;
  ${tablet({
    marginBottom: "1rem",
  })}
  ${mobile({
    marginBottom: "5px",
  })}
`;

const ButtonItem = styled.button`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  background-color: #fff;
  border: 1px solid rgba(63, 81, 181, 0.68);
  border-radius: 2px;
`;

const Input = styled.input`
  width: 2rem;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
const Padding = styled.div`
  padding-left: 1rem;
`;

const SingleProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    fecthData(id);
  }, [id]);

  const fecthData = async (id) => {
    setLoading(true);
    try {
      const { data } = await getSingleProduct(id);
      setProductData(data);
    } catch {
      alert("Không thể tải trang,Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleChageQuantity = () => {
    setQuantity(quantity);
    dispatch(cartSlice.actions.addToCart({ ...productData, quantity }));
    toastr.success("Add product is success");
  };

  const Loading = () => {
    return (
      <Wrapper>
        <Skeleton variant="rect" width={500} height={600} />
        <Box>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={300} />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" height={100} width={700} />
          <Skeleton variant="rect" width={200} />
          <Skeleton variant="rect" width={200} />
        </Box>
      </Wrapper>
    );
  };

  const RenderProduct = () => {
    const { image, category, title, price, description, rating } = productData;
    return (
      <Wrapper>
        <Img src={image} />
        <Box>
          <Category>{category}</Category>
          <Title>{title}</Title>
          <Price>Price: $ {price}</Price>
          <BoxRating>
            <Number>Rating : {rating && rating.rate}</Number>
            <Rating
              defaultValue={rating && rating.rate}
              readOnly
              precision={0.5}
            />
          </BoxRating>
          <Number>Quantity: {rating && rating.count} item</Number>
          <Text>{description}</Text>
          <ButtonList>
            <ButtonItem
              onClick={() => {
                if (quantity === 1) return;
                setQuantity(quantity - 1);
              }}
            >
              -
            </ButtonItem>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                return 1;
              }}
            />
            <ButtonItem
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </ButtonItem>
          </ButtonList>
          <ButtonList>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChageQuantity}
            >
              Add to cart
              <AddShoppingCart />
            </Button>
            <Padding>
              <NavLink to={pathapp.cart}>
                <Button variant="outlined" color="primary">
                  Go to cart
                  <ShoppingCart />
                </Button>
              </NavLink>
            </Padding>
          </ButtonList>
        </Box>
      </Wrapper>
    );
  };

  return <Container>{loading ? <Loading /> : <RenderProduct />}</Container>;
};
export default SingleProduct;
