import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Landing({ userData, setUserData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  function handleLogout() {
    console.log("Logging out...");
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
            <Link to="/signup" className="btn green">
              Sign up
            </Link>
            <Link to="/login" className="btn blue">
              Log in
            </Link>
          </>
        )}
      </div>
    </>
  );
}
