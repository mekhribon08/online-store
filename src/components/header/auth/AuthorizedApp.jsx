import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Header from "../Header";
import Footer from "../footer/Footer";
import queryClient from "../../../services/query";

function AuthorizedApp() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default AuthorizedApp;
