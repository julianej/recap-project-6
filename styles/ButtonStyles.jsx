import styled from "styled-components";


export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

    padding: 0;
    right: 2rem;
    position: absolute;
    border: 2px solid #000;
    border-radius: 50%;
    background: #fff;
    color: #000;
    cursor: pointer;
    top: 3rem;

  border: 2px solid #000;
  border-radius: 50%;

  background: #fff;
  color: #000;

  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }

  @media (min-width: 740px) {
    display:block;
    right: 5rem;
  }
`;

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

  background: black;
  color: #fff;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;