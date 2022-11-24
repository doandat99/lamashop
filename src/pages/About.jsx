import { InputAdornment, TextField } from "@material-ui/core";
import { Phone, Person, Email, Message } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import imagelink from "../assets/img";
import { useFormik } from "formik";
import { contactSchema } from "../constant/validation";
import { mobile, tablet } from "../reponsive";

const Container = styled.div`
  width: 100%;
  margin: 2rem 0;
`;

const Wrapper = styled.div`
  width: 50vw;
  margin: 0 auto;
  ${tablet({ width: "85vw" })}
  ${mobile({ width: "80vw" })}
`;

const ContainerClient = styled(Container)`
  background: linear-gradient(#ffe0e7, #ecfafc);
  padding: 6rem 0;
`;

const WrapperClient = Wrapper;

const Section = styled.section`
  background-image: url("https://mobirise.com/bootstrap-template/about-us-page-template/assets/images/mitch-rosen-188054-2000x1125.jpg");
  width: 100vw;
  min-width: 100%;
  height: 15rem;
  background-position: 50% 50%;
  background-size: cover;
  margin: 3rem 0;
`;

const ListIcon = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 3rem;
`;

const Icon = styled.img`
  width: 5rem;
`;

const TextClient = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 5rem;
`;

const UseImg = styled.img`
  margin-bottom: 2rem;
  width: 7rem;
  border-radius: 50%;
`;

const UserText = styled.p`
  margin-bottom: 3rem;
`;

const UserName = styled.p`
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  text-align: center;
  font-size: 1.25rem;
  letter-spacing: 1px;
`;

const Box = styled.div`
  margin-bottom: 2rem;
`;

const BoxButton = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const ButtonContact = styled.a`
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-size: 1.25rem;
  cursor: pointer;
  background-color: #ffff;
  border: 2px solid black;
  &:hover {
    color: #ffffff;
    background-color: #333333;
    border-color: #333333;
    transition: all 0.5s ease-in-out;
  }
`;

const ButtonSend = styled.button`
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-size: 1.25rem;
  cursor: pointer;
  background-color: #ffff;
  border: 2px solid black;
  &:hover {
    color: #ffffff;
    background-color: #333333;
    border-color: #333333;
    transition: all 0.5s ease-in-out;
  }
`;

const About = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      messages: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Meet our team</Title>
          <Text>
            We are all very different. We were born in different cities, at
            different times, we love different music, food, movies. But we have
            something that unites us all. It is our company. We are its heart.
            We are not just a team, we are a family.
          </Text>
          <BoxButton>
            <ButtonContact href="#form">Contact us</ButtonContact>
          </BoxButton>
        </Wrapper>

        <Section />
        <Wrapper>
          <User>
            <UseImg src={imagelink.user} />
            <UserText>
              Good afternoon. I am very pleased with the quality of the work of
              your employee representing your wonderful company.
            </UserText>
            <UserName>Doan Tien Dat</UserName>
            <p>Developer</p>
          </User>
        </Wrapper>
      </Container>
      <ContainerClient>
        <WrapperClient>
          <TextClient>Our Client</TextClient>
          <Text>Thank you for choosing us</Text>
          <ListIcon>
            {imagelink.icon.map((image, index) => (
              <Icon key={index} src={image} />
            ))}
          </ListIcon>
        </WrapperClient>
      </ContainerClient>
      <Container>
        <Wrapper id="form">
          <Title>Contact us</Title>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Box>
              <TextField
                id="name"
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
            <Box>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                hinttext="Email"
                type="email"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box>
              <TextField
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Box>
            <Box>
              <TextField
                id="messages"
                name="messages"
                type="text"
                label="Messages"
                fullWidth
                minRows={5}
                multiline
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Message />
                    </InputAdornment>
                  ),
                }}
                onChange={formik.handleChange}
                value={formik.values.messages}
                error={
                  formik.touched.messages && Boolean(formik.errors.messages)
                }
                helperText={formik.touched.messages && formik.errors.messages}
              />
            </Box>

            <BoxButton>
              <ButtonSend type="submit">Send Form</ButtonSend>
            </BoxButton>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};
export default About;
