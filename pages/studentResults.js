
import { getCurrentStudent } from "../src/studentState.js";
import { createEditResultModal } from "../components/modal/editResultModal.js";
import { createDeleteResultModal } from "../components/modal/deleteResultModal.js";

export default function Results() {
  return /*HTML*/`
    <div class="results-page">
       <nav class="breadcrumb">
          <a href="/dashboard" data-link>Dashboard</a>
          <span class="separator">›</span>
          <a href="/results" data-link>Select Student</a>
          <span class="separator">›</span>
          <a href="/results" class="current" data-link>Student Result</a>
      </nav>
        <h1>Student Results </h1>
        <p id="results-subtitle" class="subtitle">Search for a user by firstname</p>

        <div class="results-topbar">
            <div class="search-box">
                <input type="text" id="result-search" placeholder="Search for results..."/>
                <button class="search-btn"></button>
            </div>
            <button class="add-btn">Add result</button>
           
        </div>
        

        <div class="result-table">
            <div class="row header">
                <div class="col year">Year</div>
                <div class="col term">Term</div>
                <div class="col subject">Subject</div>
                <div class="col exam">Exam</div>
                <div class="col result">Result</div>
                <div class="col grade">Grade</div>
                <div class="col actions"></div>
            </div>
            <div id="rows"></div>
        </div>

        <div class="pagination">
            <button>&laquo;</button>
            <button>&lsaquo;</button>
            <button class="active">1</button>
            <button>2</button>
            <span>…</span>
            <button>7</button>
            <button>8</button>
            <button>&rsaquo;</button>
            <button>&raquo;</button>
        </div>

        <button type="button" class="back-btn">Back to dashboard</button>
    </div>
  ` 
}

export async function initStudentResultPage() {
  let currentSubjects =[];
  let deleteIndex = null;

  const searchInput = document.getElementById("result-search");
  const subtitle = document.getElementById("results-subtitle");
  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", () => {
     history.pushState(null, null, "/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
  })

  const resultsRes = await fetch("../Data/Results.json");
  const resultData = await resultsRes.json();

  const selectedStudent = getCurrentStudent();
  const studentResult = resultData.results.find(
    r => r.studentId === selectedStudent.id
  );

  currentSubjects =  studentResult.subjects.map(sub => ({ ...sub }));

  /* ---------- modals ---------- */

  const editModal = createEditResultModal((updatedFields, originalSubject) => {

  Object.assign(originalSubject, updatedFields);

  renderSubjects(
    currentSubjects,
    studentResult.session,
    studentResult.term,
    handleView,
    handleEdit,
    handleDelete
  );
});

  const deleteModal = createDeleteResultModal(() => {
    currentSubjects.splice(deleteIndex, 1);

    renderSubjects(
      currentSubjects,
      studentResult.session,
      studentResult.term,
      handleView,
      handleEdit,
      handleDelete
    );
  });

  /* ---------- handlers ---------- */

  function handleView(subject, index) {
    deleteIndex = index;

      subject.session = studentResult.session;
      subject.term = studentResult.term;

      editModal.openView(
      subject,
      () => deleteModal.open()
    );
  }

  function handleEdit(subject, index) {
    editIndex = index;

    subject.session = studentResult.session;
    subject.term = studentResult.term;

    editModal.openEdit(subject);
  }
  function handleDelete(index) {
    deleteIndex = index;
    deleteModal.open();
  }

  /* ---------- initial render ---------- */

  renderSubjects(
    currentSubjects,
    studentResult.session,
    studentResult.term,
    handleView,
    handleEdit,
    handleDelete
  );

  subtitle.textContent = `Here are the results for ${selectedStudent.firstName} ${selectedStudent.lastName}`;

  /* ---------- search ---------- */

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = currentSubjects.filter(sub =>
      sub.name.toLowerCase().includes(value) ||
      sub.grade.toLowerCase().includes(value) ||
      sub.score.toString().includes(value)
    );

    renderSubjects(
      filtered,
      studentResult.session,
      studentResult.term,
      handleView,
      handleEdit,
      handleDelete
    );
  });
}


function renderSubjects(subjects, session, term, onView, onEdit, onDelete) {
  const rowsContainer = document.getElementById("rows");
  rowsContainer.innerHTML = "";

  if (subjects.length === 0) {
    rowsContainer.innerHTML = "<div>No results found</div>";
    return;
  }

  subjects.forEach((sub, index) => {
    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <div class="col year">${session}</div>
      <div class="col term">${term}</div>
      <div class="col subject">${sub.name}</div>
      <div class="col exam">${sub.exam ?? "-"}</div>
      <div class="col result">${sub.score}</div>
      <div class="col grade">${sub.grade}</div>
      <div class="col actions">
        <div class="info-btn"></div>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    row.querySelector(".info-btn").onclick = () => onView(sub, index);
    row.querySelector(".edit-btn").onclick = () => onEdit(sub, index);
    row.querySelector(".delete-btn").onclick = () => onDelete(index);

    rowsContainer.appendChild(row);
  });
}