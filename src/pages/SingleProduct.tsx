import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useAppContext } from "../utilities/AppProvider";

// Define the overall schema for the JSON object
const SingleProductSchema = z.object({
  data: z.object({
    id: z.number(),
    attributes: z.object({
      title: z.string(),
      company: z.string(),
      description: z.string(),
      image: z.string().url(),
      price: z.string(),
      colors: z.array(z.string()), // Array of strings (color hex codes)
    }),
  }),
});
type SingleProductType = z.infer<typeof SingleProductSchema>;

const SingleProduct = () => {
  const location = useLocation();
  const { pathname } = location;

  const id = parseInt(pathname.split("products/")[1]);

  const { data, isLoading } = useQuery<SingleProductType>({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://strapi-store-server.onrender.com/api/products/${id}`
      );
      return SingleProductSchema.parse(response.data);
    },
  });

  const { darkTheme } = useAppContext();

  if (isLoading) {
    return (
      <Wrapper>
        <div className="loading-section">
          <h1 className="loading">Loading...</h1>;
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className={darkTheme ? "main-section ms-dark" : "main-section"}>
        <section className="product-section">
          <div className="img-section">
            <div>
              <Link to="/" className={darkTheme ? "link link-dark" : "link"}>
                Home
              </Link>{" "}
              <span style={{ color: "grey" }}>&#8827;</span>{" "}
              <Link
                to="/products"
                className={darkTheme ? "link link-dark" : "link"}
              >
                Products
              </Link>
            </div>
            <img
              src={data?.data.attributes.image}
              alt={data?.data.attributes.title}
            />
          </div>
          <div className="info-section">
            <h1 className={darkTheme ? "title title-dark" : "title"}>
              {data?.data.attributes.title}
            </h1>
            <h4 className={darkTheme ? "company company-dark" : "company"}>
              {data?.data.attributes.company}
            </h4>
            <p className={darkTheme ? "price price-dark" : "price"}>
              ${parseInt(data?.data.attributes.price ?? "0") / 100}
            </p>
            <p
              className={
                darkTheme ? "description description-dark" : "description"
              }
            >
              {data?.data.attributes.description}
            </p>
            <div className="colors">
              <p
                className={
                  darkTheme ? "color-title color-title-dark" : "color-title"
                }
              >
                Colors
              </p>
              {data?.data.attributes.colors.map((item, index) => {
                return (
                  // FIXME: add active state to the buttons
                  <button
                    type="button"
                    style={{ backgroundColor: `${item}` }}
                    className="color"
                    key={index}
                  ></button>
                );
              })}
            </div>
            <div className="amount">
              <p
                className={
                  darkTheme ? "amount-title amount-title-dark" : "amount-title"
                }
              >
                Amount
              </p>
              <select
                name="amount"
                id="amount"
                className={darkTheme ? "select select-dark" : "select"}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <button
              className={
                darkTheme ? "add-to-bag add-to-bag-dark" : "add-to-bag"
              }
            >
              Add to bag
            </button>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
export default SingleProduct;

const Wrapper = styled.main`
  .loading-section {
    min-height: 100vh;
  }
  .loading {
    padding: 5rem 2rem 0rem 2rem;
    text-align: center;
    font-size: 3rem;
  }
  .main-section {
    min-height: 100vh;
  }
  .ms-dark {
    background-color: hsl(231 15% 18%);
  }
  .product-section {
    padding: 5rem 2rem 0rem 2rem;
    display: grid;
    grid-template-rows: 1fr auto;
  }
  .link {
    color: #474747;
    text-decoration: none;
    font-size: 1.1rem;
  }
  .link-dark {
    color: white;
  }
  .link:hover {
    text-decoration: underline;
  }
  .img-section {
    height: 30rem;
  }
  img {
    height: 24rem;
    width: 24rem;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 1.5rem;
  }
  .title {
    color: #474747;
    text-transform: capitalize;
    font-size: 2rem;
    line-height: 2.25;
    font-weight: 700;
  }
  .title-dark {
    color: white;
  }
  .company {
    font-size: 1.3rem;
    line-height: 1.75;
    font-weight: 700;
    color: hsl(229 10 60);
    margin-top: 0.5rem;
  }
  .company-dark {
    color: hsl(229 10 90);
  }
  .price {
    font-size: 1.2rem;
    line-height: 1.75;
    margin-top: 0.75rem;
    color: #454547;
  }
  .price-dark {
    color: white;
  }
  .description {
    line-height: 2rem;
    margin-top: 1.5rem;
    color: #454547;
  }
  .description-dark {
    color: white;
  }
  .color-title {
    color: #454547;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-top: 1.5rem;
  }
  .color-title-dark {
    color: white;
  }
  .color {
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.7rem;
    margin-right: 0.5rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  .amount-title {
    color: #454547;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-top: 1.5rem;
  }
  .amount-title-dark {
    color: white;
  }
  .select {
    padding: 0.8rem;
    width: 18rem;
    margin-top: 0.5rem;
    border-radius: 10px;
    background-color: transparent;
    border-color: hsl(247 47 36);
    cursor: pointer;
  }
  .select-dark {
    border-color: hsl(265 89 71);
    color: white;
  }
  .select-dark option {
    background-color: hsl(231 15% 18%);
  }
  .add-to-bag {
    background-color: hsl(247 47 50);
    border-radius: 10px;
    margin-top: 2.5rem;
    margin-bottom: 7rem;
    padding: 1rem 1.5rem;
    color: white;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .add-to-bag-dark {
    background-color: hsl(265 89 71);
    color: black;
  }
  .add-to-bag.add-to-bag-dark:hover {
    background-color: hsl(265 89 60);
  }
  .add-to-bag:hover {
    background-color: hsl(247 47 40);
  }
  @media screen and (min-width: 1210px) {
    .loading {
      padding: 5rem 13rem 0rem 13rem;
      text-align: center;
    }
    .main-section {
      min-height: 20vh;
    }
    .product-section {
      padding: 5rem 13rem 0rem 13rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      min-height: fit-content;
    }
    img {
      width: 30rem;
    }
    .info-section {
      margin-top: 1.5rem;
    }
  }
`;
