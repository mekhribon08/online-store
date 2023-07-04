import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import Profile from "../pages/about/auth/Profile";
import Contact from "../pages/about/contact/Contact";
import Error from "../pages/about/error/Error";
import Home from "../pages/about/home/Home";
import Post from "../pages/about/posts/Post";
import Posts from "../pages/about/posts/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      }
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
