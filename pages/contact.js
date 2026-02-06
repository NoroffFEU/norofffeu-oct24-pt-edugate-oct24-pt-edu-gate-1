export default function Contact() {
  return /* HTML */ `
    <section class="contact">
     <h1>Contact</h1>

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
        <input
         type="text"
         id="name"
         placeholder="Ola"
         required
        />
      </div>

      <div class="form-field">
        <label for="surname">Surname</label>
        <input 
         type="text" 
         id="surname" 
         placeholder="Nordmann" 
         required
        />

      <div class="form-field">
        <label for="message">Message</label>
        <textarea id="message" placeholder="Your message..." required></textarea>
      </div>

      <button type="submit">Submit</button>
     </form>

    </section>
  `;
}
