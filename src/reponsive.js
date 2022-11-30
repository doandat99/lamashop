import { css } from "styled-components";

export const desktop = (props) => {
  return css`
    @media only screen and (max-width: 1920px) {
      ${props}
    }
  `;
};

export const laptop = (props) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 426px) {
      ${props}
    }
  `;
};
