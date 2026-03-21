export function createDeleteUserModal(onConfirm){
  const modal = document.createElement("div");
  modal.className = "modal hidden";

  modal.innerHTML = /*HTML */`
     <div class="modal-content">
      <button class="close-btn">✕</button>
      <h2>Delete Selected User?</h2>
      <p>Are you sure you want to delete this user? 
      This action is permanent and cannot be undone.</p>

    <div class="modal-actions">
        <button class="btn btn-danger">Yes, delete user</button>
        <button class="btn btn-outline">Cancel</button>
    </div>
    </div>
  `;
  let currentUser = null;
  const close = () => modal.classList.add("hidden");

  modal.querySelector(".close-btn").addEventListener("click", close);
  modal.querySelector(".btn-outline").addEventListener("click", close);

  modal.querySelector(".btn-danger").addEventListener("click", () => {
    onConfirm(currentUser);
    close();
  });

  document.body.appendChild(modal);

  return {
    open(user) {
      currentUser = user;
      modal.classList.remove("hidden");
    }
  };
}