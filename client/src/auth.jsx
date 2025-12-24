import { useState } from "react";

import "./styles.css";
import "./fanta.css";

function Auth({ apiBase, onLogin, onSetToken }) {
  const [isRegistration, setIsRegistration] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function toggleIsRegister() {
    setIsRegistration(!isRegistration);
    setError("");
  }

  async function fetchTodos() {
    console.log("fetch");
  }

  async function handleAuth() {
    if (
      isLoading ||
      isAuthenticating ||
      !email ||
      !password ||
      password.length < 6 ||
      !email.includes("@")
    ) {
      return;
    }

    //set error display to none
    setIsAuthenticating(true);

    try {
      let data;
      if (isRegistration) {
        console.log("registering");
        // api call
        const response = await fetch(apiBase + "auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password: password }),
        });
        data = await response.json();
      } else {
        //login
        const response = await fetch(apiBase + "auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password: password }),
        });
        data = await response.json();
        console.log(data);
      }

      if (data.token) {
        onSetToken(data.token);
        localStorage.setItem("token", data.token);
        onLogin();
        await fetchTodos();
      } else {
        throw Error("❌ Failed to authenticate...");
      }
    } catch (err) {
      console.log(err);
    } finally {
      //change auth button inner text
      setIsAuthenticating(false);
    }
  }

  return (
    <>
      <section id="auth">
        <div>
          <h2 className="sign-up-text">
            {isRegistration ? "Sign Up" : "Log In"}
          </h2>
          <p>{isRegistration ? "Create an account" : "Welcome back!"}</p>
        </div>

        {error && <p id="error">{error}</p>}

        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="********"
          type="password"
        />
        <button id="authBtn" onClick={() => handleAuth()}>
          {isAuthenticating ? "Authenticating" : "Submit"}
        </button>
        <hr />
        <div className="register-content">
          <p>
            {isRegistration
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <button onClick={() => toggleIsRegister()} id="registerBtn">
            {isRegistration ? "Log in" : "Sign up"}
          </button>
        </div>
      </section>
    </>
  );
}

export default Auth;
