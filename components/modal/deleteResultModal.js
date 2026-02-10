export function createDeleteResultModal(onConfirm) {
  const modal = document.createElement("div");
  modal.className = "modal hidden";

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">✕</button>
      <h2>Delete This Student’s Results?</h2>
      <p>Are you sure you want to delete this student's selected results? This action is permanent and cannot be undone.</p>

    <div class="modal-actions">
        <button class="danger btn">Yes, delete results</button>
        <button class="btn btn-outline">Cancel</button>
    </div>
    </div>
  `;

  const close = () => modal.classList.add("hidden");

  modal.querySelector(".close-btn").addEventListener("click", close);
  modal.querySelector(".btn-outline").addEventListener("click", close);

  modal.querySelector(".danger").addEventListener("click", () => {
    onConfirm();
    close();
  });

  document.body.appendChild(modal);

  return {
    open() {
      modal.classList.remove("hidden");
    }
  };
}