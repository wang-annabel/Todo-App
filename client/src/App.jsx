import { useState } from "react";
import Auth from "./auth.jsx";
import Dashboard from "./Dashboard.jsx";

import "./styles.css";
import "./fanta.css";

function App() {
  const apiBase = "http://localhost:5000/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (isLoggedIn) {
    return (
      <>
        <Dashboard apiBase={apiBase} token={token} />
      </>
    );
  } else {
    return (
      <>
        <Auth
          apiBase={apiBase}
          onLogin={() => setIsLoggedIn(true)}
          onSetToken={(val) => setToken(val)}
        />
      </>
    );
  }
}

export default App;
