export default function SignUp() {
  setTimeout(() => {
    const button = document.querySelector("#signup-btn");

    button.addEventListener("click", function () {
      const passwordInput = document.querySelector("#password");
      const confirmPassword = document.querySelector("#confirm-password");

      if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Password does not match");
        return;
      }

      console.log("Password check if ok");
    });
  }, 0);

  return /* HTML */ `
    <section class="signup">
      <div class="signup-card">
        <h1>Sign up</h1>

        <form id="signup-form">
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

          <div class="form-container">
            <div class="form-field">
              <label for="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Ola"
                required
              />
            </div>

            <div class="form-field">
              <label for="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Nordmann"
                required
              />
            </div>
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Choose password"
              required
            />
          </div>

          <div class="form-field">
            <label for="confirm-password">Confirm password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Repeat password"
              required
            />
          </div>

          <button id="signup-btn" type="button">Submit</button>
        </form>
      </div>
    </section>
  `;
}
