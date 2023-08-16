import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Header from "../Header";
import queryClient from "../../../services/query";

function AuthorizedApp() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default AuthorizedApp;
