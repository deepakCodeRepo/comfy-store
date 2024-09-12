import styled from "styled-components";
import { useAppContext } from "../utilities/AppProvider";

const About = () => {
  const { darkTheme } = useAppContext();

  return (
    <Wrapper>
      <section className={darkTheme ? "main-section ms-dark" : "main-section"}>
        <div className="about-section">
          <h1 className={darkTheme ? "about about-dark" : "about"}>
            We Love
            <span className={darkTheme ? "comfy comfy-dark" : "comfy"}>
              Comfy
            </span>
          </h1>
          <p className={darkTheme ? "description desc-dark" : "description"}>
            Welcome to Comfy Store, where comfort meets style. We believe that
            everyone deserves to feel at ease in their own space, whether it's
            your home, office, or any place you cherish. Our carefully curated
            collection of products is designed to bring warmth, relaxation, and
            a touch of elegance to your everyday life. <br />
            <br /> At Comfy Store, we pride ourselves on offering high-quality,
            cozy items that cater to your need for comfort. From soft textiles
            and plush cushions to soothing scents and ambient lighting, every
            product is selected with care to enhance your sense of well-being.
            Our goal is to create a haven where you can unwind, recharge, and
            feel truly at home. <br />
            <br />
            We are more than just a store; we are a community of comfort
            enthusiasts who value the simple joys of life. Whether you're
            looking to transform your living space or find the perfect gift for
            a loved one, we're here to help you discover the ultimate in
            comfort. <br />
            <br /> Thank you for choosing Comfy Store. We're excited to be a
            part of your journey to a more comfortable life.
          </p>
        </div>
      </section>
    </Wrapper>
  );
};
export default About;

const Wrapper = styled.main`
  .main-section {
    min-height: 100vh;
  }
  .ms-dark {
    background-color: hsl(231 15% 18%);
  }
  .about-section {
    padding: 5rem 2rem 0rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .about {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.025em;
    color: #474747;
  }
  .about-dark {
    color: white;
  }
  .comfy {
    background-color: hsl(212 100% 51%);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    margin-left: 0.75rem;
  }
  .comfy-dark {
    color: black;
    background-color: hsl(326 100% 67%);
  }
  .description {
    margin-top: 3.5rem;
    font-size: 1.125rem;
    line-height: 1.75;
  }
  .desc-dark {
    color: white;
  }
  @media screen and (min-width: 1210px) {
    .about-section {
      padding: 5rem 13rem 0rem 13rem;
    }
  }
`;
