import styled from "styled-components";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppContext } from "../utilities/AppProvider";

const Footer = () => {
  const { darkTheme } = useAppContext();

  return (
    <Wrapper>
      <section className={darkTheme ? "footer-sec footer-dark" : "footer-sec"}>
        <div className="social-icons">
          <a href="https://www.instagram.com">
            <FaInstagram />
          </a>
          <a href="https://www.Facebook.com">
            <FaFacebook />
          </a>
          <a href="https://www.Twitter.com">
            <FaTwitter />
          </a>
          <a href="https://www.Youtube.com">
            <FaYoutube />
          </a>
        </div>
        <div className="footer-links">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/about" className="footer-link">
            About
          </Link>
          <Link to="/products" className="footer-link">
            Products
          </Link>
          <Link to="/cart" className="footer-link">
            Cart
          </Link>
        </div>
        <p>Copyright &copy; 2024 | Developed by Deepak S U</p>
      </section>
    </Wrapper>
  );
};
export default Footer;

const Wrapper = styled.footer`
  .footer-sec {
    background-color: hsl(217 92% 10%/1);
    min-height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-dark {
    background-color: black;
  }
  div {
    display: flex;
    justify-content: space-evenly;
  }
  .social-icons {
    width: 40%;
    margin-top: 1rem;
  }
  a {
    color: white;
    font-size: 1.2rem;
  }
  .footer-links {
    margin-top: 1rem;
    width: 60%;
  }
  .footer-link {
    color: white;
    text-decoration: none;
  }
  p {
    margin-top: 1rem;
    color: white;
  }
  @media screen and (min-width: 768px) {
    a {
      font-size: 1.4rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
  @media screen and (min-width: 1024px) {
    a {
      font-size: 1.6rem;
    }
    p {
      font-size: 1.3rem;
    }
  }
  @media screen and (min-width: 1210px) {
    a {
      font-size: 1.4rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;
