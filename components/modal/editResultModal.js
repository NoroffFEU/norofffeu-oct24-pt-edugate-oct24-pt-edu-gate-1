export function createEditResultModal(onUpdate){
    const modal = document.createElement("div");
    modal.className = "modal hidden";

    modal.innerHTML = `
        <div class="modal-content edit-modal">
    <button class="close-btn">✕</button>

    <div class="form-grid">
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
    </div>

    <div class="modal-actions">
        <button id="update-btn" class="btn btn-primary">Update</button>
        <button id="cancel-btn" class="btn btn-outline">Cancel</button>
    </div>
  </div>
    `;

    const close = () => modal.classList.add("hidden");

    modal.querySelector(".close-btn").addEventListener("click", close);
    modal.querySelector("#cancel-btn").addEventListener("click", close);

   modal.querySelector("#update-btn").addEventListener("click", () => {
    onUpdate({
      name: modal.querySelector("#edit-subject").value,
      exam: modal.querySelector("#edit-exam").value,
      score: Number(modal.querySelector("#edit-score").value),
      grade: modal.querySelector("#edit-grade").value
    });
    close();
  });

  document.body.appendChild(modal);

  return {
    open(subject){
        modal.querySelector("#edit-subject").value = subject.name;
        modal.querySelector("#edit-exam").value = subject.exam ?? "";
        modal.querySelector("#edit-score").value = subject.score;
        modal.querySelector("#edit-grade").value = subject.grade;
        modal.classList.remove("hidden");
    }
  };
}