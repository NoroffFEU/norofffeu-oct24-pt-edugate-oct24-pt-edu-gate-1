function createStudentModalHTML(){
    return /*HTML*/ `
     <div class="modal-content edit-modal" data-mode="view">
      <button class="close-btn">✕</button>

      <div class="form-grid">

        <!-- VIEW MODE -->
        <div class="view-only">

          <div class="view-item">
            <span class="label">Student ID</span>
            <span class="value" id="view-studentID"></span>
          </div>

          <div class="view-item">
            <span class="label">Year</span>
            <span class="value" id="view-studentYear"></span>
          </div>

          <div class="view-item">
            <span class="label">first name</span>
            <span class="value" id="view-studentFirstName"></span>
          </div>

          <div class="view-item">
            <span class="label">last name</span>
            <span class="value" id="view-studentLastName"></span>
          </div>

          <div class="modal-actions">
            <button id="view-edit-btn" class="btn btn-primary">Edit</button>
            <button id="view-delete-btn" class="btn btn-danger">Delete</button>
          </div>
        </div>

        <!-- EDIT MODE -->
        <div class="edit-only">
          <div class="form-group">
            <label>Student ID</label>
            <input id="edit-studentID" />
          </div>

          <div class="form-group">
            <label>Year</label>
            <input id="edit-studentYear" />
          </div>

          <div class="form-group">
            <label>First Name</label>
            <input id="edit-studentFirstName" />
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input id="edit-studentLastName" />
          </div>

          <div class="modal-actions">
            <button id="edit-update-btn" class="btn btn-primary">Update</button>
            <button id="edit-cancel-btn" class="btn btn-outline">Cancel</button>
          </div>
        </div>

      </div>
    </div>
    `;
}

export function createEditStudentModal(onUpdate){
    const modal = document.createElement("div");
    modal.className = "modal hidden";

    modal.innerHTML = createStudentModalHTML();

    const modalContent = modal.querySelector(".edit-modal");

    let currentData = null;

    function close() {
        modalContent.dataset.mode = "view";
        modal.classList.add("hidden");

    }
    function fillStudentViewData(data) {
        modal.querySelector("#view-studentID").textContent = data.id ?? "-";
        modal.querySelector("#view-studentYear").textContent =  "";
        modal.querySelector("#view-studentFirstName").textContent = data.firstName;
        modal.querySelector("#view-studentLastName").textContent = data.lastName ?? "-";
    }

      function fillStudentEditData(data) {
    modal.querySelector("#edit-studentID").value = data.id ?? "";
    modal.querySelector("#edit-studentYear").value = data.year ?? "";
    modal.querySelector("#edit-studentFirstName").value = data.firstName;
    modal.querySelector("#edit-studentLastName").value = data.lastName ?? "";
    
  }
   function switchToEdit() {
    if (!currentData) return;
    modalContent.dataset.mode = "edit";
    fillStudentEditData(currentData);
  }

  function setupEvetListenersStudents(){

    modal.querySelector(".close-btn")
    .addEventListener("click", close);
    
    modal.querySelector("#edit-update-btn")
      .addEventListener("click", () => {

        const updatedFields = {
          id: modal.querySelector("#edit-studentID").value,
          year: modal.querySelector("#edit-studentYear").value,
          firstName: modal.querySelector("#edit-studentFirstName").value,
          lastName: modal.querySelector("#edit-studentLastName").value,
        };

        onUpdate(updatedFields, currentData);
        close();
      });

        modal.querySelector("#edit-cancel-btn")
      .addEventListener("click", () => {
        modalContent.dataset.mode = "view";
      });

    modal.querySelector("#view-edit-btn")
      .addEventListener("click", switchToEdit);

    modal.querySelector("#view-delete-btn")
      .addEventListener("click", () => {
        if (typeof modal.onDelete === "function") {
          close();
          modal.onDelete();
        }
      });

  }
  
  setupEvetListenersStudents();
  document.body.appendChild(modal);

   return {

    openView(data, onDelete) {
      currentData = data;
      modal.onDelete = onDelete;

      modalContent.dataset.mode = "view";
      fillStudentViewData(data);
      modal.classList.remove("hidden");
    },

    openEdit(data) {
      currentData = data;

      modalContent.dataset.mode = "edit";
      fillStudentEditData(data);
      modal.classList.remove("hidden");
    }

  };

}