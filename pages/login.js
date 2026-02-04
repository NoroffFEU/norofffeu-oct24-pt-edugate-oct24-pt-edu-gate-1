export default function Login() {
  setTimeout(() => {
    const button = document.querySelector("#login-btn");

    button.addEventListener("click", function () {
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");

      if (
        emailInput.value === "teacher@edugate.com" &&
        passwordInput.value === "password1"
      ) {
        window.location.href = "/dashboard";
      } else {
        document.getElementById("login-error").classList.remove("hidden");
      }
    });
  }, 0);

  return /* HTML */ `
    <section class="login">
      <div class="login-card">
        <div id="login-error" class="login-error hidden">
          Failed Sign Up! Wrong password or email address!
        </div>
        <h1>Log in</h1>

        <form id="login-form">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div class="form-field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <p class="forgot-password">
            Forgot your password? Click <span>here</span>
          </p>

          <button id="login-btn" type="button">Submit</button>
        </form>
      </div>
    </section>
  `;
}
