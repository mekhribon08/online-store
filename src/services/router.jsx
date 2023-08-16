import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UnAuthorizedApp from "../components/header/auth/UnAuthorizedApp";
// import About from "../pages/about/About";
import Profile from "../pages/about/auth/Profile";
// import Contact from "../pages/about/contact/Contact";
import Error from "../pages/about/error/Error";
import Home from "../pages/about/home/Home";
// import Post from "../pages/about/posts/Post";
// import Posts from "../pages/about/posts/Posts";
import Cart from "../pages/cart/cart";
import Categories from "../pages/categories/Categories";
import Product from "../pages/categories/Product";
import Products from "../pages/categories/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/auth",
        element:<UnAuthorizedApp/>,
        index:true
      },
      {
        path:"/login",
        element:<UnAuthorizedApp registered={false} />,
      },
      {
        path:"/cart",
        element:< Cart/>,
      },
      {
        path:"/categories/:id",
        element:< Categories/>,
      },
      {
        path:"/product/:id",
        element:<Product/>,
      },{
        path:"/products/:identifier",
        element:<Products/>,
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
      // {
      //   path: "/contact",
      //   element: <Contact />,
      // },
      // {
      //   path: "/posts",
      //   element: <Posts />,
      // },
      // {
      //   element: <Post />,
      //   path: "/posts/:id",
      // },
    ],
  },
]);

export default router;
