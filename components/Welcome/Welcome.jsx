import styled from "styled-components";


export default function Welcome() {
  return (
    <WelcomeWrapper>
      <h1>Welcome <br></br>to Money Manager</h1>

      <p>
        Keep track of your finances, manage your bank accounts,
        and stay informed about your transactions.
      </p>

      <p>
        Login to get Started.
      </p>
    </WelcomeWrapper>
  );
}

const WelcomeWrapper = styled.div`
  max-width: 600px;
  padding: 5rem;

  background: white;
  border: 2px solid black;
  border-radius: 1rem;

  h1 {
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
`;