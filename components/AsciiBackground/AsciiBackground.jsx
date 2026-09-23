import styled, { keyframes } from "styled-components";

const move = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(-20px, 15px, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const AsciiWrapper = styled.div`
  position: fixed;
  inset: 0;

  z-index: -1;

  overflow: hidden;

  pointer-events: none;

  opacity: 0.12;
`;

const Ascii = styled.pre`
  position: absolute;

  top: 5%;
  left: 17%;

  transform: translate(-50%, -50%);

  margin: 0;

  font-family: monospace;
  font-size: 4rem;
  line-height: 1;

  white-space: pre;

  animation: ${move} 8s ease-in-out infinite;
`;

export default function AsciiBackground() {
  return (
    <AsciiWrapper>
      <Ascii>
{`
       .       .       .       .
    .     +-------+       .       .
          |       |   .       .
      .   |  €    |       .       .
          |       |    +-------+
    .     +-------+    |       |
                       |  €    |
       .       .       +-------+
    +-------+
    |       |       .       .
    |  €    |   .       .       .
    +-------+             .
          .       .       .       .
`}
      </Ascii>
    </AsciiWrapper>
  );
}