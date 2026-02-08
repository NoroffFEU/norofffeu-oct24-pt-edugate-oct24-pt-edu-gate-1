export default function Contact() {
  return /* HTML */ `
    <section class="contact">
      <div class="contact-card">
        <h1>Contact</h1>

        <p>
          If you have any questions or feedback, please use the contact form. We
          would love to hear from you
        </p>

        <form id="contact-form">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div class="form-field">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Ola" required />
          </div>

          <div class="form-field">
            <label for="surname">Surname</label>
            <input type="text" id="surname" placeholder="Nordmann" required />
          </div>

          <div class="form-field">
            <label for="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message..."
              required
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  `;
}
