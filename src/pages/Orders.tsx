import styled from "styled-components";
import { useAppContext } from "../utilities/AppProvider";

const Orders = () => {
  const { darkTheme } = useAppContext();

  return (
    <Wrapper>
      <div className={darkTheme ? "main-section ms-dark" : "main-section"}>
        <section
          className={darkTheme ? "cart-section cs-dark" : "cart-section"}
        >
          <h1 className={darkTheme ? "title title-dark" : "title"}>
            Your Orders is empty
          </h1>
          <hr />
        </section>
      </div>
    </Wrapper>
  );
};
export default Orders;

const Wrapper = styled.main`
  .main-section {
    min-height: 100vh;
  }
  .ms-dark {
    background-color: hsl(231 15% 18%);
  }
  .cart-section {
    padding: 5rem 2rem 0rem 2rem;
  }
  .title {
    color: #474747;
    margin-bottom: 1rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0.05em;
  }
  .title-dark {
    color: white;
  }
  @media screen and (min-width: 1210px) {
    .cart-section {
      padding: 5rem 13rem 0rem 13rem;
    }
  }
`;
