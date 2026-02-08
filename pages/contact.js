export default function Contact() {
  setTimeout(() => {
    const button = document.querySelector("#contact-btn");

    button.addEventListener("click", function () {
      const email = document.querySelector("#email");
      const name = document.querySelector("#name");
      const surname = document.querySelector("#surname");
      const message = document.querySelector("#message");

      let hasError = false;

      // email
      if (email.value === "" || !email.value.includes("@")) {
        email.classList.add("input-error");
        email.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      // name
      if (name.value === "") {
        name.classList.add("input-error");
        name.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      // surname
      if (surname.value == "") {
        surname.classList.add("input-error");
        surname.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      // message
      if (message.value === "") {
        message.classList.add("input-error");
        message.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }
    });
  }, 0);

  return /* HTML */ `
    <section class="contact">
      <h1>Contact</h1>

      <p class="contact-text">
        If you have any questions or feedback, please use the contact form.
        <br />
        We would love to hear from you
      </p>

      <div class="contact-card">
        <form id="contact-form">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              required
            />
            <p class="error-text hidden">Valid email required</p>
          </div>

          <div class="form-field">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Ola" required />
            <p class="error-text hidden">Name required</p>
          </div>

          <div class="form-field">
            <label for="surname">Surname</label>
            <input type="text" id="surname" placeholder="Nordmann" required />
            <p class="error-text hidden">Surname required</p>
          </div>

          <div class="form-field">
            <label for="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message..."
              required
            ></textarea>
            <p class="error-text hidden">Message required</p>
          </div>

          <button id="contact-btn" type="button">Submit</button>
        </form>
      </div>
    </section>
  `;
}
