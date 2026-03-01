export default function Registration() {
  setTimeout(() => {
    const button = document.querySelector("#registration-btn");

    button.addEventListener("click", function () {
      history.pushState(null, null, "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }, 0);

  return /*HTML*/ `

    <section class="registration">
     <div class="registration-card">
    <h1>Registration</h1>

    <form id="registration-form">
     
     <div class="form-field">
      <label for="school">School</label>
      <input
       type="text"
       id="school"
       name="school"
       placeholder="Edugate"
       required
       />
     </div>

     <div class="form-field">
      <label for="address1">Address line 1</label>
      <input
       type="text"
       id="address1"
       name="address1"
       placeholder="Address"
       required
       />
     </div>

     <div class="form-field">
      <label for="address2">Address line 2</label>
      <input
       type="text"
       id="address2"
       name="address2"
       placeholder="Address"
       />
     </div>
    
    <div class="form-container"> 
     <div class="form-field">
      <label for="city">City</label>
      <input
       type="text"
       id="city"
       name="city"
       placeholder="Oslo"
       required
       />
     </div>

     <div class="form-field">
      <label for="postal">Postal Code</label>
      <input
       type="text"
       id="postal"
       name="postal"
       placeholder="0000"
       required
       />
     </div>
    </div>

    <button id="registration-btn" type="button">Submit</button>


    </form>
  </div>
 </section>
`;
}
