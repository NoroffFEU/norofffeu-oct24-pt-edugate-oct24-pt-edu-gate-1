export default function Registration() {
  setTimeout(() => {
    const button = document.querySelector("#registration-btn");

    button.addEventListener("click", function () {
      const school = document.querySelector("#school");
      const address1 = document.querySelector("#address1");
      const city = document.querySelector("#city");
      const postal = document.querySelector("#postal");

      let hasError = false;

      if (school.value === "") {
        school.classList.add("input-error");
        school.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      if (address1.value === "") {
        address1.classList.add("input-error");
        address1.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      if (city.value === "") {
        city.classList.add("input-error");
        city.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      if (postal.value === "") {
        postal.classList.add("input-error");
        postal.nextElementSibling.classList.remove("hidden");
        hasError = true;
      }

      if (hasError) return;

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
       <p class="error-message hidden">School is required</p>
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
       <p class="error-message hidden">Address is required</p>
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
       <p class="error-message hidden">City is required</p>
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
       <p class="error-message hidden">Postal is required</p>
     </div>
    </div>

    <button id="registration-btn" type="button">Submit</button>




    </form>
  </div>
 </section>
`;
}
