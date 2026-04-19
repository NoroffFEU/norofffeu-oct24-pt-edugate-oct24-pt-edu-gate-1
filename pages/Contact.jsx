import { use, useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    surname: false,
    message: false,
  });

  function handleSubmit(e){
    e.preventDefault();

    const newErrors = {
      email: email.trim() === "" || !email.includes("@"),
      name: name.trim() === "",
      surname: surname.trim() === "",
      message: message.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error);
    
    if(!hasError) {
      setShowSuccess(true);
      setEmail("");
      setName("");
      setSurname("");
      setMessage("");
    } else{
      setShowSuccess(false);
    }
  }

  return (
        <section className="contact">
      <h1>Contact</h1>

      <p className="contact-text">
        If you have any questions or feedback, please use the contact form.
        <br />
        We would love to hear from you
      </p>

      <div className="contact-card">
        <form id="contact-form">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              required
            />
            {errors.email && (
              <p className="error-text hidden">Valid email required</p>
            )}
            
          </div>

          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input 
            type="text" 
            id="name" 
            placeholder="Ola" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "input-error" : ""}
            required />
            {errors.name && <p class="error-text hidden">Name required</p>}
        
          </div>

         <div className="form-field">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              placeholder="Nordmann"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={errors.surname ? "input-error" : ""}
            />
            {errors.surname && <p className="error-text">Surname required</p>}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={errors.message ? "input-error" : ""}
            />
            {errors.message && <p className="error-text">Message required</p>}
          </div>

          <button id="contact-btn" type="submit">
            Submit
          </button>

          {showSuccess && (
            <p id="contact-enquiry" className="enquiry-message">
              Your enquiry has been sent
            </p>
          )}
        </form>
      </div>
    </section>
  ) 

  
}
