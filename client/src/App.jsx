import { useState } from "react";
import Auth from "./auth.jsx";

import "./styles.css";
import "./fanta.css";

function App() {
  const apiBase = "http://localhost:5000/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <>
        <div>dashboard</div>
      </>
    );
  } else {
    return (
      <>
        <Auth apiBase={apiBase} onLogin={() => setIsLoggedIn(true)} />
      </>
    );
  }
}

export default App;
