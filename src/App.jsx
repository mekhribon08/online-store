import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthorizedApp from "./components/header/auth/AuthorizedApp";
import UnAuthorizedApp from "./components/header/auth/UnAuthorizedApp";

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token" || {token:false})
  const auth = JSON.parse(token)
  // if(!auth) return useEffect(() => {
  //   navigate("/auth");
  //   <UnAuthorizedApp/>;
  // }, [])
  
  if(!auth) return <UnAuthorizedApp />
  return (auth.token ? <AuthorizedApp /> : <UnAuthorizedApp />);
}

export default App;
