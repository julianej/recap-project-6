
import styled from "styled-components";

export default function Welcome({ variant = "default" }) {
  return (
    <WelcomeWrapper $variant={variant}>
      <h1>Welcome to Money Manager<br></br>
        Keep track of your finances, manage your bank accounts,
        and stay informed about your transactions.
      </h1>
    </WelcomeWrapper>
  );
}

const WelcomeWrapper = styled.section`
  padding: 3rem;
  background: white;
  border: 2px solid black;
  border-radius: 1rem;
  width: 100%;

  @media (min-width: 740px) {
   width: 100%;
   padding-right: 40%;
   font-size: 3rem;
  }


  h1 {
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
  }

  /* DASHBOARD */
  ${({ $variant }) =>
    $variant === "dashboard" && `

    @media (min-width: 740px) {
        width: 100%;
        padding-right: 0;
        }
      width: 100%;
      padding: 2.5rem;

      h1 {
        font-size: 2rem;
      }
    `}

`;