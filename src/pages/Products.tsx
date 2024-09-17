import { useNavigate, Form, Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
// import { useAppContext } from "../utilities/AppProvider";
import { HiViewGrid } from "react-icons/hi";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";

// Define the overall schema for the JSON object
const DataSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      attributes: z.object({
        title: z.string(),
        company: z.string(),
        image: z.string().url(), // validating as a URL
        price: z.string().regex(/^\d+$/), // string but only digits
      }),
    })
  ),
  meta: z.object({
    pagination: z.object({
      pageCount: z.number(),
    }),
  }),
});
type ProductsType = z.infer<typeof DataSchema>;

const Products = () => {
  const [searchParams] = useSearchParams();
  // Get current page from the URL, defaulting to 1 if not provided
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") || "1", 10)
    : 1;
  const { data, isLoading } = useQuery<ProductsType>({
    queryKey: ["paginateProducts", currentPage],
    queryFn: async () => {
      const response = await axios.get(
        `https://strapi-store-server.onrender.com/api/products?page=${currentPage}`
      );
      return DataSchema.parse(response.data);
    },
  });
  const totalPages: number = data?.meta?.pagination?.pageCount ?? 1;

  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    navigate(`/products?page=${page}`);
  };

  const [pageNext, setPageNext] = useState(2);
  useEffect(() => {
    setPageNext(currentPage + 1);
  }, [currentPage]);
  const handleNext = () => {
    if (pageNext > 3) {
      navigate("/products?page=1");
      return setPageNext(2);
    }
    navigate(`/products?page=${pageNext}`);
    setPageNext(pageNext + 1);
  };
  const [pagePrev, setPagePrev] = useState(3);
  useEffect(() => {
    setPagePrev(currentPage - 1);
  }, [currentPage]);
  const handlePrev = () => {
    if (pagePrev < 1) {
      navigate("/products?page=3");
      return setPagePrev(2);
    }
    navigate(`/products?page=${pagePrev}`);
    setPagePrev(pagePrev - 1);
  };

  // const { darkTheme } = useAppContext();

  const displayProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  const [viewOne, setViewOne] = useState(true);
  const [viewTwo, setViewTwo] = useState(false);
  const ViewOne = () => {
    setViewOne(true);
    setViewTwo(false);
  };
  const ViewTwo = () => {
    setViewOne(false);
    setViewTwo(true);
  };

  return (
    <Wrapper>
      <div className="main-section">
        <section className="product-section">
          <Form className="form">
            <div className="form-row">
              <label htmlFor="product">search product</label>
              <input type="text" id="product" className="search-product" />
            </div>
            <div className="form-row">
              <label htmlFor="category">select category</label>
              <select name="category" id="category" className="search-category">
                <option value="All">All</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="company">select company</label>
              <select name="company" id="company" className="search-company">
                <option value="All">All</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="sort">sort by</label>
              <select name="sort" id="sort" className="sort-by">
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="price" className="price">
                <span>select price</span>
                <span>$1,000.00</span>
              </label>
              {/* //INFO: learn to apply css to range */}
              <input
                type="range"
                id="price"
                className="select-price"
                min="0"
                max="1000"
                step="10"
                // value="1000"
                defaultValue="1000"
              />
              <div className="price p-below">
                <span>0</span>
                <span>Max: $1,000.00</span>
              </div>
            </div>
            <div className="shipping-row">
              <label htmlFor="shipping" className="shipping">
                Free shipping
              </label>
              {/* //INFO: learn to apply css to checkbox */}
              <input type="checkbox" id="shipping" className="free-shipping" />
            </div>
            <button className="search-btn">search</button>
            <Link to="/products" className="reset">
              reset
            </Link>
          </Form>
          <div className="view">
            <p className="products-count">22 products</p>
            <div>
              <button
                className={viewOne ? "view-btn active" : "view-btn"}
                onClick={ViewOne}
              >
                <HiViewGrid />
              </button>
              <button
                className={viewTwo ? "view-btn active" : "view-btn"}
                onClick={ViewTwo}
              >
                <IoMenu />
              </button>
            </div>
          </div>
          <hr />
          <div className={viewTwo ? "allProducts-viewTwo " : "allProducts"}>
            {isLoading ? (
              <div className="loading-section">
                <h1 className="loading">Loading...</h1>
              </div>
            ) : (
              data?.data.map((item) => {
                return (
                  <div
                    className={
                      viewOne
                        ? "product-viewOne "
                        : viewTwo
                        ? "product-viewTwo"
                        : "product-viewOne"
                    }
                    key={item.id}
                    onClick={() => displayProduct(item.id)}
                  >
                    <img
                      src={item.attributes.image}
                      alt={item.attributes.title}
                      className={
                        viewOne
                          ? "image-viewOne "
                          : viewTwo
                          ? "image-viewTwo"
                          : "image-viewOne"
                      }
                    />
                    <h3
                      className={
                        viewTwo ? "product-title-viewTwo " : "product-title"
                      }
                    >
                      {item.attributes.title}
                    </h3>
                    <h4
                      className={
                        viewTwo ? "product-price-viewTwo " : "product-price"
                      }
                    >
                      ${parseInt(item.attributes.price) / 100}
                    </h4>
                  </div>
                );
              })
            )}
          </div>
          <div className="pagination">
            <button onClick={handlePrev}>prev</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNext}>next</button>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
export default Products;

const Wrapper = styled.main`
  .main-section {
    min-height: 100vh;
  }
  .product-section {
    padding: 5rem 2rem 0rem 2rem;
    /* display: grid;
    grid-template-rows: repeat(4, auto);
    row-gap: 2rem; */
  }
  .form {
    background-color: hsl(217 100% 97%/1);
    padding: 1rem 2rem;
    display: grid;
    grid-template-rows: repeat(7, 1fr, auto);
    row-gap: 1.5rem;
    border-radius: 0.375rem;
  }
  .form-row {
    display: flex;
    flex-direction: column;
  }
  label {
    text-transform: capitalize;
    font-size: 1rem;
    line-height: 1.25rem;
    color: hsl(214 30 32);
  }
  .search-product {
    color: #5d5f61;
    height: 2rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    line-height: 2rem;
    border-width: 1px;
    border-color: hsl(214 30 32);
    background-color: hsl(0 0 100);
    border-radius: 0.5rem;
    margin-top: 0.7rem;
  }
  select {
    color: #3f4041;
    height: 2rem;
    margin-top: 0.7rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    line-height: 2rem;
    border-width: 1px;
    border-color: hsl(214 30 32);
    background-color: hsl(0 0 100);
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .price {
    display: flex;
    justify-content: space-between;
  }
  .p-below {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: #3f4041;
  }
  .select-price {
    margin-top: 0.5rem;
  }
  input[type="range"]::-moz-range-track {
    background-color: hsl(212 100 44);
    border-radius: 0.5rem;
    height: 0.5rem;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb {
    background-color: white;
    border-color: hsl(212 100 44);
    border-width: 3.5px;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    cursor: pointer;
  }
  .shipping-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .shipping {
    text-align: center;
  }
  .free-shipping {
    height: 1.25rem;
    width: 1.25rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
    border-color: hsl(212 100 44);
    cursor: pointer;
  }
  .search-btn {
    height: 2.75rem;
    border-radius: 5px;
    border: none;
    background-color: hsl(212 100 44);
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }
  .search-btn:hover {
    background-color: hsl(212 100 32);
  }
  .reset {
    height: 2.75rem;
    background-color: hsl(310 49 48);
    color: white;
    display: grid;
    place-items: center;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.1s ease-in-out;
  }
  .reset:hover {
    background-color: hsl(310 49 42);
  }
  .view {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    margin-bottom: 0.5rem;
  }
  .products-count {
    color: hsl(214 30 32);
    font-size: 1.1rem;
    padding: 1rem 0.5rem;
  }
  .view-btn {
    background-color: transparent;
    border: none;
    color: hsl(214 30 32);
    font-size: 1.6rem;
    margin-left: 1rem;
    cursor: pointer;
    padding: 0.5rem 0.5rem;
    transition: all 0.2s ease-in-out;
  }
  .view-btn.active {
    color: white;
  }
  .active {
    background-color: hsl(212 100 44);
    border-radius: 40% 10%;
  }
  .view-btn.active:hover {
    background-color: hsl(212 100 54);
    border-radius: 40% 10%;
  }
  .view-btn:hover {
    background-color: hsl(214 30 85);
    border-radius: 40% 10%;
    /* border-radius: 60px 60px 60px 60px; */
  }
  .allProducts {
    margin-top: 1rem;
  }
  .loading-section {
    min-height: 100vh;
  }
  .loading {
    font-size: 2rem;
    text-align: center;
    margin-top: 1rem;
  }
  .product-viewOne {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 4px grey;
    padding: 1rem;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  .product-viewTwo {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    box-shadow: 0px 0px 4px grey;
    padding: 1rem;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  .product-viewOne:hover {
    box-shadow: 0px 0px 10px gray;
  }
  .product-viewTwo:hover {
    box-shadow: 0px 0px 10px gray;
  }
  .image-viewOne {
    width: 100%;
    height: 16rem;
    object-fit: cover;
    border-radius: 10px;
  }
  .image-viewTwo {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 10px;
  }
  //FIXME: image also should scale when we hover on product in viewTwo
  .image-viewTwo:hover {
    transform: scale(1.05);
  }
  .product-title {
    color: #515050;
    margin-top: 2rem;
    text-transform: capitalize;
  }
  .pt-dark {
    color: white;
  }
  .product-price {
    color: #9031f0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .product-title-viewTwo {
    color: #515050;
    text-transform: capitalize;
    margin-top: 2rem;
  }
  .product-price-viewTwo {
    color: #9031f0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 640px) {
    .form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1.5rem;
    }
    .product-viewTwo {
      display: grid;
      grid-template-columns: 1fr 60% auto;
      column-gap: 1rem;
    }
    .product-title-viewTwo {
      color: #515050;
      text-transform: capitalize;
      margin-top: 0;
    }
    .product-price-viewTwo {
      color: #515050;
      margin-top: 0;
    }
  }
  @media screen and (min-width: 768px) {
    .form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 1.5rem;
    }
    .allProducts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .allProducts-viewTwo {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: 1fr;
    }
    .image-viewTwo {
      width: 12rem;
      height: 12rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .form {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 1.5rem;
    }
    .allProducts {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
    .product-viewTwo {
      display: grid;
      grid-template-columns: 1fr 65% auto;
      column-gap: 1rem;
    }
    .product-title-viewTwo {
      font-size: 1.3rem;
    }
    .product-price-viewTwo {
      font-size: 1.3rem;
    }
  }
  @media screen and (min-width: 1210px) {
    .product-section {
      padding: 5rem 13rem 0rem 13rem;
    }
  }
`;
