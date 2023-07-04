import { useContext } from "react";
import AuthorizedApp from "./components/header/auth/AuthorizedApp";
import UnAuthorizedApp from "./components/header/auth/UnAuthorizedApp";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);
  return !auth.id ? <AuthorizedApp /> : <UnAuthorizedApp />;
}

export default App;
