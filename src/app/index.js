import Main from "./main";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Product from "../components/product";
import Error from "../components/error";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
    },
    {
      path: "/product/:id",
      element: <Product />,
    },
  ]);

  return (
     <>
       <RouterProvider router={router} />
      </>
  );
}

export default App;
