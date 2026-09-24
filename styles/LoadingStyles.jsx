// styles/LoadingStyles.js

import styled from "styled-components";

export const Loading = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.8);
`;

export const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top: 2px solid #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;