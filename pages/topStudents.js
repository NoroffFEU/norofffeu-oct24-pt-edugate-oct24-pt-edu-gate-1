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
      };
    });

    const table = createTable(container, [
      { value: "studentId", class: "student-id" },
      { value: "firstName", class: "first-name" },
      { value: "lastName", class: "last-name" },
      { value: "year", class: "year" },
      { value: "subject", class: "subject" },
      { value: "grade", class: "grade" },
    ]);

    table.render(tableData);
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
          </div>
          <div id="students-table"></div>
        </div>

        <div id="pagination"></div>
        <a href="/dashboard">Back to dashboard</a>
      </div>
    </section>
  `;
}
