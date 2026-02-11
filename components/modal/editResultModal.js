function createModalHTML() {
  return `
    <div class="modal-content edit-modal" data-mode="view">
      <button class="close-btn">✕</button>

      <div class="form-grid">

        <!-- VIEW MODE -->
        <div class="view-only">

          <div class="view-item">
            <span class="label">Year</span>
            <span class="value" id="view-year"></span>
          </div>

          <div class="view-item">
            <span class="label">Term</span>
            <span class="value" id="view-term"></span>
          </div>

          <div class="view-item">
            <span class="label">Subject</span>
            <span class="value" id="view-subject"></span>
          </div>

          <div class="view-item">
            <span class="label">Exam</span>
            <span class="value" id="view-exam"></span>
          </div>

          <div class="view-item">
            <span class="label">Result</span>
            <span class="value" id="view-score"></span>
          </div>

          <div class="view-item">
            <span class="label">Grade</span>
            <span class="value" id="view-grade"></span>
          </div>

          <div class="modal-actions">
            <button id="view-edit-btn" class="btn btn-primary">Edit</button>
            <button id="view-delete-btn" class="btn btn-danger">Delete</button>
          </div>
        </div>

        <!-- EDIT MODE -->
        <div class="edit-only">
          <div class="form-group">
            <label>Year</label>
            <input id="edit-year" />
          </div>

          <div class="form-group">
            <label>Term</label>
            <input id="edit-term" />
          </div>

          <div class="form-group">
            <label>Subject</label>
            <input id="edit-subject" />
          </div>

          <div class="form-group">
            <label>Exam</label>
            <input id="edit-exam" />
          </div>

          <div class="form-group">
            <label>Result</label>
            <input id="edit-score" />
          </div>

          <div class="form-group">
            <label>Grade</label>
            <input id="edit-grade" />
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

export function createEditResultModal(onUpdate) {

  const modal = document.createElement("div");
  modal.className = "modal hidden";

  modal.innerHTML = createModalHTML();

  const modalContent = modal.querySelector(".edit-modal");

  let currentData = null;

 

  function close() {
    modalContent.dataset.mode = "view";
    modal.classList.add("hidden");
  }

  function fillViewData(data) {
    modal.querySelector("#view-year").textContent = data.session ?? "-";
    modal.querySelector("#view-term").textContent = data.term ?? "-";
    modal.querySelector("#view-subject").textContent = data.name;
    modal.querySelector("#view-exam").textContent = data.exam ?? "-";
    modal.querySelector("#view-score").textContent = data.score;
    modal.querySelector("#view-grade").textContent = data.grade;
  }

  function fillEditData(data) {
    modal.querySelector("#edit-year").value = data.session ?? "";
    modal.querySelector("#edit-term").value = data.term ?? "";
    modal.querySelector("#edit-subject").value = data.name;
    modal.querySelector("#edit-exam").value = data.exam ?? "";
    modal.querySelector("#edit-score").value = data.score;
    modal.querySelector("#edit-grade").value = data.grade;
  }

  function switchToEdit() {
    if (!currentData) return;
    modalContent.dataset.mode = "edit";
    fillEditData(currentData);
  }

  function setupEventListeners() {

    modal.querySelector(".close-btn")
      .addEventListener("click", close);

    modal.querySelector("#edit-update-btn")
      .addEventListener("click", () => {

        const updatedFields = {
          session: modal.querySelector("#edit-year").value,
          term: modal.querySelector("#edit-term").value,
          name: modal.querySelector("#edit-subject").value,
          exam: modal.querySelector("#edit-exam").value,
          score: Number(modal.querySelector("#edit-score").value),
          grade: modal.querySelector("#edit-grade").value
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

  setupEventListeners();
  document.body.appendChild(modal);



  return {

    openView(data, onDelete) {
      currentData = data;
      modal.onDelete = onDelete;

      modalContent.dataset.mode = "view";
      fillViewData(data);
      modal.classList.remove("hidden");
    },

    openEdit(data) {
      currentData = data;

      modalContent.dataset.mode = "edit";
      fillEditData(data);
      modal.classList.remove("hidden");
    }

  };
}