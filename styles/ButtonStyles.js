import styled from "styled-components";

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;

  border: 2px solid #000;
  border-radius: 8px;

  background: #000;
  color: #fff;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  padding: 1rem;

  border: 2px solid #000;
  border-radius: 8px;

  background: #fff;
  color: #000;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 1rem;

  border: 2px solid #000;
  border-radius: 8px;

  background: transparent;
  color: #000;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;