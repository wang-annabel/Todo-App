import { useState, useEffect } from "react";
import Auth from "./auth.jsx";
import Dashboard from "./Dashboard.jsx";

import "./styles.css";
import "./fanta.css";

function App() {
  const apiBase = "http://localhost:5000/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Check if token exists on mount
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <>
        <div>
          <Dashboard
            apiBase={apiBase}
            token={token}
            onLogout={() => handleLogout()}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Auth
            apiBase={apiBase}
            onLogin={() => setIsLoggedIn(true)}
            onSetToken={(val) => setToken(val)}
          />
        </div>
      </>
    );
  }
}

export default App;
