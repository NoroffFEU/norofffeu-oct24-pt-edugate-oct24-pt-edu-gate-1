
import { getCurrentStudent } from "../src/studentState.js";
import { createEditResultModal } from "../components/modal/editResultModal.js";
import { createDeleteResultModal } from "../components/modal/deleteResultModal.js";
import { createPagination } from "../components/table/pagination.js";
import { createTable} from "../components/table/table.js";

export default function StudentResults() {
  return /*HTML*/`
    <div class="results-page">
       <nav class="breadcrumb">
          <a href="/dashboard" data-link>Dashboard</a>
          <span class="separator">›</span>
          <a href="/results" data-link>Select Student</a>
          <span class="separator">›</span>
          <a href="/results" class="current" data-link>Student Result</a>
      </nav>
      <div class="result-header">
        <h1>Student Results </h1>
        <p id="results-subtitle" class="subtitle">Search for a user by firstname</p>

        <div class="results-topbar">
            <div class="search-box">
                <input type="text" id="result-search" placeholder="Search for results..."/>
                <button class="search-btn"></button>
            </div>
            <button class="add-btn">Add result</button>
           
        </div>
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
           
        </div>

        <button type="button" class="back-btn">Back to dashboard</button>
    </div>
  ` 
}


export async function initStudentResultPage(){
  const state = {
    currentSubjects: [],
    studentResult: null,
    deleteIndex: null,
    currentPage: 1,
    itemsPerPage: 5
  };

  setupNavigation();
  state.studentResult = await loadStudentResults(state);
  setupModals(state);
  setupTable(state); 
  setupPagination(state);
  renderInitialPage(state);
  setupSearch(state);
  
}

function setupPagination(state){
  const container =  document.querySelector(".pagination");
  state.pagination =
  createPagination(
   container,

    (page) => {

      state.currentPage = page;

      render(state);
    }
  );
}
function setupTable(state){
  const container = document.getElementById("rows");
    state.table = createTable(
      container, 
    [
        { class:"year", value:"year" },
        { class:"term", value:"term" },
        { class:"subject", value:"name" },
        { class:"exam", value:"exam" },
        { class:"result", value:"score" },
        { class:"grade", value:"grade" }
    ],

    [
        {
            label:"Edit",
            class:"edit-btn",
            onClick:(row)=> state.handleEdit(row._original)
        },
        {
            label:"Delete",
            class:"delete-btn",
            onClick:(row)=> state.handleDelete(
                state.currentSubjects.indexOf(row._original)
            )
        },
         {
            label:"",
            class:"info-btn",
            onClick:(row)=> state.handleView(
                row._original,
              state.currentSubjects.indexOf(row._original)
            )
        }
    ],

    {
        onRowClick:(row)=> state.handleView(
            row._original,
            state.currentSubjects.indexOf(row._original)
        )
    }
    )
}

function setupNavigation(){
   const backBtn = document.querySelector(".back-btn");

  backBtn.addEventListener("click", () => {
    history.pushState(null, null, "/dashboard");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
async function loadStudentResults(state) {
  const resultsRes = await fetch("../Data/Results.json");
  const resultData = await resultsRes.json();

  const selectedStudent = getCurrentStudent();
  const studentResult = resultData.results.find(
    r => r.studentId === selectedStudent.id
  );

  state.currentSubjects = studentResult.subjects.map(sub => ({ ...sub }));


  document.getElementById("results-subtitle").textContent =
    `Here are the results for ${selectedStudent.firstName} ${selectedStudent.lastName}`;

  return studentResult;
}
function setupModals(state) {

  const editModal = createEditResultModal((updatedFields, originalSubject) => {
    Object.assign(originalSubject, updatedFields);
    render(state);
  });

  const deleteModal = createDeleteResultModal(() => {
    state.currentSubjects.splice(state.deleteIndex, 1);
    render(state);
  });

  state.handleView = (subject, index) => {
    state.deleteIndex = index;

    subject.session = state.studentResult.session;
    subject.term = state.studentResult.term;

    editModal.openView(subject, () => deleteModal.open());
  };

  state.handleEdit = (subject) => {
    subject.session = state.studentResult.session;
    subject.term = state.studentResult.term;

    editModal.openEdit(subject);
  };

  state.handleDelete = (index) => {
    state.deleteIndex = index;
    deleteModal.open();
  };
}
function render(state) {
  const paginated =
    getPaginatedSubjects(state);
    const tableData = paginated.map(subject => ({

        year: state.studentResult.session,
        term: state.studentResult.term,

        name: subject.name,
        exam: subject.exam ?? "-",
        score: subject.score,
        grade: subject.grade,

        _original: subject

    }));

  state.table.render(tableData);

  state.pagination.render({

    currentPage: state.currentPage,

    totalItems: state.currentSubjects.length,

    itemsPerPage: state.itemsPerPage
  });
}
function renderInitialPage(state) {
  render(state);
}

function setupSearch(state) {
  const searchInput = document.getElementById("result-search");

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    state.currentSubjects = state.studentResult.subjects
      .filter(sub =>
        sub.name.toLowerCase().includes(value) ||
        sub.grade.toLowerCase().includes(value) ||
        sub.score.toString().includes(value)
      )
      .map(sub => ({ ...sub }));

    state.currentPage = 1;

    render(state);
  });
}



function getPaginatedSubjects(state){
  const start = (state.currentPage -1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  return state.currentSubjects.slice(start, end)
}


