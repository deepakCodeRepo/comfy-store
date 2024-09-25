import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../utilities/AppProvider";
import { useEffect } from "react";

const NavMenu = () => {
  const { menuBtn, setMenuBtn, darkTheme } = useAppContext();

  //INFO: menu disappears as location of page changes
  const location = useLocation();
  useEffect(() => {
    setMenuBtn(false);
  }, [location, setMenuBtn]);

  return (
    <Wrapper>
      <div className={menuBtn ? "dropdown-menu show-menu " : "dropdown-menu"}>
        <ul className={`${darkTheme ? "menu-links mls-dark" : "menu-links"}`}>
          <li>
            <NavLink
              to="/"
              className={darkTheme ? "menu-link ml-dark " : "menu-link"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={darkTheme ? "menu-link ml-dark " : "menu-link"}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={darkTheme ? "menu-link ml-dark " : "menu-link"}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={darkTheme ? "menu-link ml-dark " : "menu-link"}
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
    </Wrapper>
  );
};
export default NavMenu;

const Wrapper = styled.nav`
  .dropdown-menu {
    display: none;
    position: absolute;
    min-width: 13rem;
    margin-left: 2rem;
    margin-top: 4px;
  }
  .show-menu {
    display: block;
  }
  .menu-links {
    border-radius: 10px;
    background-color: hsl(217 100% 97%/1);
    padding: 8px 0;
  }
  .mls-dark {
    background-color: hsl(231 15% 11%);
  }
  .menu-links li {
    list-style: none;
    margin: 0px 6px;
  }
  .menu-link {
    display: block;
    text-decoration: none;
    color: rgb(23 37 84);
    padding: 6px;
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
  @media screen and (min-width: 1024px) {
    .menu-links {
      display: none;
    }
  }
`;
