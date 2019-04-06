import styled, { css } from 'styled-components';

export const Button = styled.button`
  border: 1px solid green;
  :hover {
    border: 1px solid pink;
  }

  @media (max-width: 700px) {
    background: palevioletred;
  }

    ${props => props.primary && css`
    border: 1px solid blue;
  `}
`