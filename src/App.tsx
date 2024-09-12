import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HomeLayout,
  Error,
  Landing,
  About,
  Cart,
  Checkout,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";
import AppProvider from "./utilities/AppProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <Error />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: "Checkout",
        element: <Checkout />,
      },
      {
        path: "Orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
