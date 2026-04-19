import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../src/Auth";

export default function Login({setUserData}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
     e.preventDefault();
    if(
      email === "teacher@edugate.com" &&
      password === "password1"
    ){
      const user = {
        name: "joe Bloggs",
        role: "teacher",
        email: "joeblog2020@edugate.no",
        birth: "01/01/2002",
        id: 1921840,
        gradYear: 2020,
        school: "The academy",
      };

      setUserData(user);
      saveUser(user);
      console.log("logged in..")
      navigate("/dashboard");
    }
    else{
      setShowError(true);
    }
  }


  return(
    <section className="login">
      {showError && (
        <div id="login-error" className="login-error">
          <div className="error-icon">
            <img src="/icons/fail.png" alt="Error" />
          </div>
          <div>
            <p className="error-title">Failed Sign Up!</p>
            <p className="error-text">Wrong password or email address!</p>
          </div>
          <img 
            src="/icons/x-red.png"
            className="close-error"
            alt="close"
            onClick={() => setShowError(false)}
            style={{cursor: "pointer"}}  
          />
        </div>
      )}
      <div className="login-card">
        <h1>Log in</h1>

        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>  

          <p className="forgot-password">
            Forgot your password? Click <span>here</span>
          </p>

          <button id="login-btn" type="submit">
            Submit
          </button>

        </form>

      </div>
    </section>
  )
}