import { useState, useEffect } from "react";
export default function Landing(userData) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData) {
      console.log("User data in landing page:", userData);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  function handleLogout() {
    setUserData(null);
    localStorage.removeItem("user");
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Edugate</h1>
          <p>
            Welcome to Edugate, the platform that lets you access your exam
            results online.
          </p>
        </div>
      </section>
      <div className="hero-buttons">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn red">
            Log out
          </button>
        ) : (
          <>
            <a href="/signup" data-link className="btn green">
              Sign up
            </a>
            <a href="/login" data-link className="btn blue">
              Log in
            </a>
          </>
        )}
      </div>
    </>
  );
}
