import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavMenu from "../components/NavMenu";

const HomeLayout = () => {
  //NOTE: At first I had included Wrapper in landing page and it was not working as intended coz after page change there has to be the same Wrapper in that page. So I shifted it to this page so it can be used in all pages.
  return (
    <>
      <Navbar />
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  );
};
export default HomeLayout;
