import { useEffect, useState } from "react";

export default function EditStudentModal({
  student,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [mode, setMode] = useState("view");
  const [formData, setFormData] = useState({
    id: "",
    year: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        id: student.id ?? "",
        year: student.year ?? "",
        firstName: student.firstName ?? "",
        lastName: student.lastName ?? "",
      });
      setMode("view");
    }
  }, [student]);

  function handleChange(e) {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id.replace("edit-", "")]: value,
    }));
  }

  function handleUpdate() {
    onUpdate(formData, student);
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content edit-modal" data-mode={mode}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="form-grid">
          {mode === "view" ? (
            <div className="view-only">
              <div className="view-item">
                <span className="label">Student ID</span>
                <span className="value">{student.id ?? "-"}</span>
              </div>

              <div className="view-item">
                <span className="label">Year</span>
                <span className="value">{student.year ?? "-"}</span>
              </div>

              <div className="view-item">
                <span className="label">First name</span>
                <span className="value">{student.firstName ?? "-"}</span>
              </div>

              <div className="view-item">
                <span className="label">Last name</span>
                <span className="value">{student.lastName ?? "-"}</span>
              </div>

              <div className="modal-actions">
                <button
                  id="view-edit-btn"
                  className="btn btn-primary"
                  onClick={() => setMode("edit")}
                >
                  Edit
                </button>

                <button
                  id="view-delete-btn"
                  className="btn btn-danger"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="edit-only">
              <div className="form-group">
                <label>Student ID</label>
                <input
                  id="edit-id"
                  value={formData.id}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input
                  id="edit-year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input
                  id="edit-firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  id="edit-lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  id="edit-update-btn"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update
                </button>

                <button
                  id="edit-cancel-btn"
                  className="btn btn-outline"
                  onClick={() => setMode("view")}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}