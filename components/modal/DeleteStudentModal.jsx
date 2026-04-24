export default function DeleteStudentModal({ onClose, onConfirm }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Delete Selected Student?</h2>
        <p>
          Are you sure you want to delete selected student? This action is
          permanent and cannot be undone.
        </p>

        <div className="modal-actions">
          <button
            className="btn btn-danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, delete student
          </button>

          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}