import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
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

  const activeModal = useSelector(state => state.modals.name);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <Error/>
    },
    {
      path: "/product/:id",
      element:<Product/>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
