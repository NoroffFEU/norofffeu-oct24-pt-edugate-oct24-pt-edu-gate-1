import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../components/table/Table";
import Pagination from "../components/table/Pagination";
import EditStudentModal from "../components/modal/EditStudentModal";
import DeleteStudentModal from "../components/modal/DeleteStudentModal";

function findStudentByName(students, query) {
  const search = query.toLowerCase().trim();

  if (!search) return students;

  return students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      student.firstName?.toLowerCase().includes(search) ||
      student.lastName?.toLowerCase().includes(search) ||
      fullName.includes(search)
    );
  });
}

export default function Results() {
  const navigate = useNavigate();

  const [allStudents, setAllStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 7;

  useEffect(() => {
    async function loadStudents() {
      const saved = localStorage.getItem("students");

      if (saved) {
        const parsed = JSON.parse(saved);
        setAllStudents(parsed.users || []);
      } else {
        const res = await fetch("/Data/Students.json");
        const data = await res.json();
        localStorage.setItem("students", JSON.stringify(data));
        setAllStudents(data.users || []);
      }
    }

    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return findStudentByName(allStudents, searchTerm);
  }, [allStudents, searchTerm]);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredStudents.slice(start, end);
  }, [filteredStudents, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  function handleRowClick(student) {
    localStorage.setItem("currentStudent", JSON.stringify(student));
    navigate("/student-results");
  }

  function handleView(student) {
    setSelectedStudent(student);
    setShowEditModal(true);
  }

  function handleUpdateStudent(updatedFields, originalStudent) {
    const updatedStudents = allStudents.map((student) =>
      student === originalStudent ? { ...student, ...updatedFields } : student
    );

    setAllStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify({ users: updatedStudents }));
  }

  function handleDeleteStudent() {
    const updatedStudents = allStudents.filter(
      (student) => student !== selectedStudent
    );

    setAllStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify({ users: updatedStudents }));

    setShowDeleteModal(false);
    setShowEditModal(false);
    setSelectedStudent(null);
  }

  const columns = [
    { className: "id", key: "id" },
    { className: "firstName", key: "firstName" },
    { className: "lastName", key: "lastName" },
    { className: "selectYear", key: "class" },
  ];

  const actions = [
    {
      label: "",
      className: "info-btn",
      onClick: handleView,
    },
  ];

  return (
    <div className="results-page">
      <nav className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span className="separator">›</span>
        <Link to="/results" className="current">
          Select Student
        </Link>
      </nav>

      <div className="result-header">
        <h1>Select Student</h1>
        <img
          className="result-icon-header"
          src="/icons/results.png"
          alt="Results"
        />
        <p>select student to view result</p>

        <div className="search-box">
          <input
            type="text"
            id="student-search"
            placeholder="Search for student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" type="button"></button>
        </div>
      </div>

      <div className="students-table">
        <div className="row header">
          <div className="col id">Student ID</div>
          <div className="col firstName">
            <span className="desktop-label">First Name</span>
            <span className="mobile-label">F.Name</span>
          </div>
          <div className="col lastName">
            <span className="desktop-label">Last Name</span>
            <span className="mobile-label">L.Name</span>
          </div>
          <div className="col selectYear">Year</div>
        </div>

        <Table
          data={paginatedStudents}
          columns={columns}
          actions={actions}
          onRowClick={handleRowClick}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredStudents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        Back to dashboard
      </button>

      {showEditModal && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateStudent}
          onDelete={() => {
            setShowEditModal(false);
            setShowDeleteModal(true);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteStudentModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteStudent}
        />
      )}
    </div>
  );
}