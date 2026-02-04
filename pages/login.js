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
        alert("Unsuccesful verification. Wrong email or password");
      }
    });
  }, 0);

  return /* HTML */ `
    <section class="login">
      <div class="login-card">
        <h1>Log in</h1>

        <form id="login-form">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            required
          />

          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
          />

          <button id="login-btn" type="button">Submit</button>
        </form>
      </div>
    </section>
  `;
}
