import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { performLogout } from "../src/Auth";

export default function Landing({userData, setUserData}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(!!userData);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  function handleLogout() {
   performLogout(setUserData, navigate);
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
            <Link to="/signup" data-link className="btn green">
              Sign up
            </Link>
            <Link to="/login" data-link className="btn blue">
              Log in
            </Link>
          </>
        )}
      </div>
    </>
  );
}
