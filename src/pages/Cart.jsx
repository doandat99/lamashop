import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { cartSelector } from "../redux/selector";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { cartSlice } from "../redux/reducer/cart";
import { NavLink } from "react-router-dom";
import { pathapp } from "../constant/path";
import { mobile, tablet } from "../reponsive";

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const Table = styled.div`
  margin: 5rem auto;
  width: 90vw;
`;

const RowTitle = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 3fr 2fr 1fr;
  background-color: #f7f7f7;
  padding: 1rem 2rem;
  border-radius: 5px;
  ${mobile({ gridTemplateColumns: "5fr 2fr 3fr 2fr 1fr" })}
`;

const Col = styled.div``;

const Title = styled.p`
  font-size: 1.25rem;
  text-transform: uppercase;
  text-align: center;
  margin-right: 1rem;
`;
const DataTable = styled.div`
  margin: 2rem 0;
`;
const Product = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 3fr 2fr 1fr;
  text-align: center;
  height: 10rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  ${mobile({ gridTemplateColumns: "5fr 2fr 3fr 2fr 1fr" })}
`;

const Img = styled.img`
  width: 5rem;
  height: 6rem;
`;

const Text = styled.p``;

const Price = styled.span``;

const Quanntity = styled.div``;

const Buttons = styled.button`
  padding: 0.25rem 0.5rem;
  margin: 0 0.2rem;
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;
  ${tablet({ fontSize: "1.5rem" })};
  ${mobile({ fontSize: "1rem" })};
`;

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  width: 1rem;
  text-align: center;
  border: none;
  ${tablet({ fontSize: "1rem" })};
  ${mobile({ fontSize: "1rem" })};
`;

const TableFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Total = styled.div`
  padding-bottom: 1rem;
`;

const TotalItem = styled.p`
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Error = styled.p`
  font-size: 3rem;
  text-align: center;
  padding-top: 10rem;
`;

const Checkout = styled.div`
  padding-right: 1rem;
`;

const Cart = () => {
  const cart = useSelector(cartSelector);

  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  return (
    <Container>
      {cart.length > 0 ? (
        <React.Fragment>
          <Table>
            <RowTitle>
              <Col>
                <Title>Product</Title>
              </Col>
              <Col>
                <Title>Price</Title>
              </Col>
              <Col>
                <Title>Quantity</Title>
              </Col>
              <Col>
                <Title>Total</Title>
              </Col>
            </RowTitle>
            <DataTable>
              {cart.map((product) => (
                <Product key={product.id}>
                  <Col>
                    <Img src={product.image} />
                    <Text> {product.title}</Text>
                  </Col>
                  <Col>
                    <Price> $ {product.price}</Price>
                  </Col>
                  <Col>
                    <Quanntity>
                      <Buttons
                        onClick={() => {
                          if (product.quantity === 1) {
                            dispatch(
                              cartSlice.actions.removeProductToCart(product.id)
                            );
                          } else {
                            dispatch(
                              cartSlice.actions.decreaseProductToCart(
                                product.id
                              )
                            );
                          }
                        }}
                      >
                        -
                      </Buttons>
                      <Input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => e.target.value}
                      />
                      <Buttons
                        onClick={() =>
                          dispatch(
                            cartSlice.actions.increaseProductToCart(product.id)
                          )
                        }
                      >
                        +
                      </Buttons>
                    </Quanntity>
                  </Col>
                  <Col>$ {(product.quantity * product.price).toFixed(2)}</Col>
                  <Col>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        dispatch(
                          cartSlice.actions.removeProductToCart(product.id)
                        );
                      }}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </Col>
                </Product>
              ))}
            </DataTable>

            {cart.length ? (
              <TableFooter>
                <Total>
                  <TotalItem>Total Item: {cart.length}</TotalItem>
                  <TotalItem>Total Cart:$ {total.toFixed(2)}</TotalItem>
                </Total>
                <Checkout>
                  <NavLink to={pathapp.delivery}>
                    <Button variant="contained" color="primary">
                      Check out
                      <CheckCircleOutlineIcon />
                    </Button>
                  </NavLink>
                </Checkout>
              </TableFooter>
            ) : null}
          </Table>
        </React.Fragment>
      ) : (
        <Error>No Data ...!</Error>
      )}
    </Container>
  );
};

export default Cart;
