import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { TbMenu2 } from "react-icons/tb";
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useAppContext } from "../utilities/AppProvider";

const Navbar = () => {
  const { menuBtn, setMenuBtn, darkTheme, setDarkTheme } = useAppContext();

  return (
    <Wrapper>
      <section
        className={darkTheme ? "nav-first-sec nfs-dark" : "nav-first-sec"}
      >
        <div className="nav-first-links">
          <NavLink to="/login" className="nav-first-link">
            Sign in / Guest
          </NavLink>
          <NavLink to="/register" className="nav-first-link">
            Create Account
          </NavLink>
        </div>
      </section>
      <section
        className={darkTheme ? "nav-second-sec nss-dark" : "nav-second-sec"}
      >
        <TbMenu2
          className={darkTheme ? "menu-icon mi-dark" : "menu-icon"}
          onClick={() => setMenuBtn(!menuBtn)}
        />
        <Link to="/" className="logo-link">
          <p className={darkTheme ? "logo logo-dark" : "logo"}>C</p>
        </Link>
        <div className="menu-links">
          <ul>
            <li>
              <NavLink
                to="/"
                className={darkTheme ? "menu-link ml-dark" : "menu-link"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={darkTheme ? "menu-link ml-dark" : "menu-link"}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={darkTheme ? "menu-link ml-dark" : "menu-link"}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={darkTheme ? "menu-link ml-dark" : "menu-link"}
              >
                Cart
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/checkout"
                className={darkTheme ? "menu-link ml-dark " : "menu-link"}
              >
                Checkout
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={darkTheme ? "menu-link ml-dark " : "menu-link"}
              >
                Orders
              </NavLink>
            </li> */}
          </ul>
        </div>
        <div className="theme-cart">
          {darkTheme ? (
            <MdSunny
              className="light-sun"
              onClick={() => setDarkTheme(!darkTheme)}
            />
          ) : (
            <IoMoonSharp
              className="moon-icon"
              onClick={() => setDarkTheme(!darkTheme)}
            />
          )}
          <Link to="/cart">
            <div className={darkTheme ? "cart cart-dark" : "cart"}>
              <IoCartOutline
                className={darkTheme ? "cart-icon ci-dark" : "cart-icon"}
              />
              <span
                className={darkTheme ? "cart-amount ca-dark" : "cart-amount"}
              >
                3
              </span>
            </div>
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.header`
  /* position: fixed;
  top: 0;
  min-width: 100%; */
  .nav-first-sec {
    width: 100%;
    min-height: 1.75rem;
    background-color: hsl(217 92% 10%/1);
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .nfs-dark {
    background-color: hsl(230 15% 30%/1);
  }
  .nav-first-links {
    min-width: 6rem;
    margin-right: 1rem;
  }
  .nav-first-link {
    color: white;
    text-decoration: none;
    font-size: 0.75rem;
    line-height: 1rem;
    font-family: sans-serif;
    margin-right: 1rem;
  }
  .nav-first-link:hover {
    text-decoration: underline;
  }
  .nav-second-sec {
    background-color: hsl(217 100% 97%/1);
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nss-dark {
    background-color: hsl(231 15% 11%);
  }
  .logo {
    display: none;
  }
  .menu-icon {
    font-size: 2.3rem;
    margin-left: 2rem;
    color: #383875;
    cursor: pointer;
  }
  .mi-dark {
    color: white;
  }
  .menu-icon:hover {
    padding: 3px;
    background-color: #c9cecf;
    border-radius: 20%;
  }
  .mi-dark:hover {
    background-color: hsl(230 15% 30%);
  }
  .menu-links ul {
    display: none;
  }
  .theme-cart {
    margin-right: 2rem;
    display: flex;
    align-items: center;
    min-width: 4rem;
  }
  .light-sun {
    font-size: 1.2rem;
    margin-right: 1.5rem;
    color: white;
    cursor: pointer;
  }
  .moon-icon {
    font-size: 1.2rem;
    margin-right: 1.5rem;
    color: #383875;
    cursor: pointer;
  }
  .cart {
    position: relative;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .cart:hover {
    background-color: #c9cecf;
    border-radius: 50%;
  }
  .cart-dark:hover {
    background-color: hsl(230 15% 30%);
  }
  .cart-icon {
    color: #383875;
    font-size: 2rem;
  }
  .ci-dark {
    color: white;
  }
  .cart-amount {
    position: absolute;
    top: 0;
    right: 0;
    background-color: hsl(212 100% 51%);
    max-width: 1.5rem;
    padding: 1px 6px;
    border-radius: 40%;
    color: white;
    font-size: 1rem;
  }
  .ca-dark {
    background-color: hsl(326 100% 67%);
    color: black;
  }
  @media screen and (min-width: 768px) {
    .nav-first-sec {
      min-height: 1.8rem;
    }
    .nav-first-link {
      font-size: 0.8rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .nav-first-sec {
      min-height: 2rem;
    }
    .nav-first-link {
      font-size: 0.9rem;
    }
    .logo-link {
      text-decoration: none;
      cursor: pointer;
    }
    .logo {
      display: block;
      font-size: 2.3rem;
      margin-left: 2rem;
      font-weight: 900;
      color: white;
      background-color: hsl(212 100% 51%);
      padding: 0 0.75rem;
      border-radius: 10px;
    }
    .logo:hover {
      background-color: hsl(212 100% 36%);
      transition: all 0.3s ease-in-out;
    }
    .logo-dark {
      background-color: hsl(326 100% 74%);
      color: black;
      transition: all 0.3s ease-in-out;
    }
    .logo-dark:hover {
      background-color: hsl(326 100% 67%);
    }
    .menu-icon {
      display: none;
    }
    .menu-links ul {
      display: flex;
      justify-content: space-evenly;
      min-width: 20rem;
    }
    .menu-links ul li {
      list-style-type: none;
    }
    .menu-link {
      text-decoration: none;
      color: #303030;
      padding: 10px;
    }
    .ml-dark {
      color: white;
    }
    .menu-link:hover {
      border-radius: 10px;
      background-color: #dbe1e2;
    }
    .ml-dark:hover {
      background-color: hsl(60 30% 96%/0.1);
    }
    .active {
      border-radius: 10px;
      background-color: black;
      color: white;
    }
    .ml-dark.active {
      background-color: hsl(230 15% 30%);
    }
    .active:hover {
      border-radius: 10px;
      background-color: black;
      color: white;
    }
    .ml-dark.active:hover {
      background-color: hsl(230 15% 30%);
    }
  }
  @media screen and (min-width: 1210px) {
    .nav-first-links {
      margin-right: 12rem;
    }
    .logo {
      font-size: 2.3rem;
      margin-left: 13rem;
    }
    .menu-icon {
      margin-left: 13rem;
    }
    .menu-links ul {
      min-width: 30rem;
    }
    .theme-cart {
      margin-right: 13rem;
    }
  }
`;
