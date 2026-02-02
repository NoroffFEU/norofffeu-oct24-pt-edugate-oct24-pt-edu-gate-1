export default function Login() {
  return /*HTML*/ `
    <section class="login">
  <div class="login-card">
  <h1>Log in</h1>

  <form id="login-form">
    <label for="email">Email</label>
    <input type="email" 
    id="email" 
    placeholder="xxxx@mail.com" 
    required />

    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter password"
      required
    />

    <button type="submit">Submit</button>
  </form>
  </div>
  </section>
    `;
}
