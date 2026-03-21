import { createPagination } from "../components/table/pagination.js";
import { createTable } from "../components/table/table.js";
import { getUser, login } from "../src/auth.js";

export default function TopStudents() {
  let user = getUser();

  if (!user) {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser) {
      login(savedUser);
      user = getUser();
    }
  }

  if (!user) {
    history.pushState(null, null, "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
    return "";
  }

  setTimeout(async () => {
    const container = document.querySelector("#students-table");
    const paginationContainer = document.querySelector("#pagination");
    const searchInput = document.querySelector("#student-search");

    const resultsRes = await fetch("/Data/Results.json");
    const resultsData = await resultsRes.json();

    const studentsRes = await fetch("/Data/Students.json");
    const studentsData = await studentsRes.json();

    const tableData = resultsData.results.map((result) => {
      const student = studentsData.users.find((s) => s.id === result.studentId);

      return {
        studentId: result.studentId,
        firstName: student?.firstName || "-",
        lastName: student?.lastName || "-",
        year: result.session,
        subject: result.subjects[0].name,
        grade: result.subjects[0].grade,
        info: "info",
      };
    });

    let filteredData = tableData;

    const table = createTable(container, [
      { value: "studentId", class: "student-id" },
      { value: "firstName", class: "first-name" },
      { value: "lastName", class: "last-name" },
      { value: "year", class: "year" },
      { value: "subject", class: "subject" },
      { value: "grade", class: "grade" },
      { value: "info", class: "info" },
    ]);

    // Pagination
    const itemsPerPage = 7;
    let currentPage = 1;

    const pagination = createPagination(paginationContainer, (page) => {
      currentPage = page;
      renderPage();
    });

    function renderPage() {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      const paginatedData = filteredData.slice(start, end);

      table.render(paginatedData);

      pagination.render({
        currentPage,
        totalItems: filteredData.length,
        itemsPerPage,
      });
    }

    // Search
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      filteredData = tableData.filter((student) => {
        return (
          student.studentId.toString().toLowerCase().includes(value) ||
          student.firstName.toLowerCase().includes(value) ||
          student.lastName.toLowerCase().includes(value) ||
          student.subject.toLowerCase().includes(value) ||
          student.grade.toLowerCase().includes(value)
        );
      });

      currentPage = 1;
      renderPage();
    });

    renderPage();
  }, 0);

  return /* HTML */ `
    <section class="top-students-page">
      <div class="top-student-content">
        <div class="breadcrumb">
          <span>Dashboard</span>
          <span class="separator">></span>
          <span class="active">Top performing students</span>
        </div>

        <div class="top-student-header">
          <h1>Top Performing Students</h1>
          <p>View the top performing students in your classes</p>
          <img src="public/icons/results.png" class="results-icon" />
        </div>

        <div class="search-container">
          <input
            id="student-search"
            type="text"
            placeholder="Search for student..."
          />
          <button class="search-btn">
            <img src="public/icons/search.png" />
          </button>
        </div>

        <div class="table-wrapper">
          <div class="table-header">
            <div>Student ID</div>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Year</div>
            <div>Subject</div>
            <div>Grade</div>
            <div></div>
          </div>
          <div id="students-table"></div>
        </div>

        <div id="pagination"></div>
        <a href="/dashboard" data-link class="top-students-backbtn"
          >Back to dashboard</a
        >
      </div>
    </section>
  `;
}
