import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { useAppContext } from "../utilities/AppProvider";

// Define the overall schema for the JSON object
const DataSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      attributes: z.object({
        title: z.string(),
        image: z.string().url(), // validating as a URL
        price: z.string().regex(/^\d+$/), // string but only digits
      }),
    })
  ),
});
type DataSchemaType = z.infer<typeof DataSchema>;

const Landing = () => {
  const { data, isLoading } = useQuery<DataSchemaType>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await axios.get(
        "https://strapi-store-server.onrender.com/api/products?featured=true"
      );
      return DataSchema.parse(response.data);
    },
  });

  const { darkTheme } = useAppContext();

  const navigate = useNavigate();
  const displayFeaturedProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <Wrapper>
      <div className={darkTheme ? "main-section ms-dark" : "main-section"}>
        <section className="top-section">
          <div>
            <h1 className={darkTheme ? "title title-dark" : "title"}>
              We are changing the way people shop
            </h1>
            <p className={darkTheme ? "description desc-dark" : "description"}>
              Welcome to Comfy Store, where comfort meets style. We believe that
              everyone deserves to feel at ease in their own space, whether it's
              your home, office, or any place you cherish. Our carefully curated
              collection of products is designed to bring warmth, relaxation,
              and a touch of elegance to your everyday life.
            </p>
            <NavLink to="/products">
              <button
                className={darkTheme ? "products-btn pb-dark" : "products-btn"}
              >
                Our Products
              </button>
            </NavLink>
          </div>
          {/* // FIXME: design as per website by adding sliding images */}
          <div className="home-images">
            <img src="/src/assets/hero1.png" alt="wp" className="home-img" />
            <img src="/src/assets/hero2.png" alt="wp" className="home-img" />
            <img src="/src/assets/hero3.png" alt="wp" className="home-img" />
            <img src="/src/assets/hero4.png" alt="wp" className="home-img" />
          </div>
        </section>
        <section className="bottom-section">
          <h2 className={darkTheme ? "fp-title fp-title-dark" : "fp-title"}>
            Featured Products
          </h2>
          <hr />
          {isLoading ? (
            <h1 className="loading">Loading...</h1>
          ) : (
            <div className="featured-products">
              {data?.data.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="featured-product"
                    onClick={() => displayFeaturedProduct(item.id)}
                  >
                    <img
                      src={item.attributes.image}
                      alt={item.attributes.title}
                    />
                    <h3
                      className={
                        darkTheme ? "product-title pt-dark" : "product-title"
                      }
                    >
                      {item.attributes.title}
                    </h3>
                    <h4>${parseInt(item.attributes.price) / 100}</h4>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </Wrapper>
  );
};
export default Landing;

const Wrapper = styled.main`
  .ms-dark {
    background-color: hsl(231 15% 18%);
  }
  .top-section {
    padding: 5rem 2rem 0rem 2rem;
    min-height: 15rem;
  }
  .title {
    font-size: 2.5rem;
    color: #434343;
  }
  .title-dark {
    color: white;
  }
  .description {
    font-style: italic;
    font-weight: 500;
    color: #2b2b2b;
    margin-top: 2rem;
    letter-spacing: 1px;
    line-height: 1.5;
  }
  .desc-dark {
    color: white;
  }
  .products-btn {
    margin-top: 2rem;
    background-color: hsl(212 100% 51%);
    border: none;
    border-radius: 4px;
    padding: 1rem;
    letter-spacing: 1px;
    font-size: 1rem;
    font-weight: 520;
    cursor: pointer;
    color: white;
  }
  .products-btn:hover {
    background-color: hsl(212 100% 36%);
  }
  .pb-dark {
    background-color: hsl(326 100% 74%);
    color: black;
    transition: all 0.3s ease-in-out;
  }
  .pb-dark:hover {
    background-color: hsl(326 100% 67%);
    color: black;
  }
  .home-img {
    display: none;
  }
  .bottom-section {
    padding: 4rem 2rem;
    min-height: 30rem;
  }
  .fp-title {
    font-size: 1.7rem;
    color: #646464;
    margin-bottom: 1.5rem;
  }
  .fp-title-dark {
    color: white;
  }
  .loading {
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
  }
  .featured-products {
    margin-top: 3rem;
  }
  .featured-product {
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
  .featured-product:hover {
    box-shadow: 0px 0px 10px gray;
  }
  img {
    width: 100%;
    height: 16rem;
    object-fit: cover;
    border-radius: 10px;
  }
  .product-title {
    color: #515050;
    margin-top: 2rem;
    text-transform: capitalize;
  }
  .pt-dark {
    color: white;
  }
  h4 {
    color: #9031f0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 768px) {
    h1 {
      font-size: 4rem;
    }
    p {
      font-size: 1.2rem;
    }
    .featured-products {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media screen and (min-width: 1024px) {
    .top-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .home-images {
      display: flex;
      overflow: hidden;
    }
    .home-img {
      border: 0.7rem solid black;
      display: block;
      min-height: 90%;
      min-width: 60%;
      border-radius: 30px;
    }
    .featured-products {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
  @media screen and (min-width: 1210px) {
    .top-section {
      padding: 5rem 13rem 0rem 13rem;
      min-height: 15rem;
    }
    .bottom-section {
      padding: 4rem 13rem;
    }
  }
`;
