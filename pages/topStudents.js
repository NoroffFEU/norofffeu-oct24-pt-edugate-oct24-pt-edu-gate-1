export default function TopStudents() {
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

        <div id="students-table"></div>

        <div id="pagination"></div>
        <a href="/dashboard">Back to dashboard</a>
      </div>
    </section>
  `;
}
