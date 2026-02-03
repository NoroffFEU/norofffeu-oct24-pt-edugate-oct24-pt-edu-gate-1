import Sidebar from "../components/sidebar.js";


export default function teacherDashboard(){
    return /*HTML*/ `

    <div class="layout">
      <div class="sidebar-root"></div>

      <div class="dashboard">
        <h1>Dashboard</h1>

        <div class="profile-dash-info">
          <img src="../public/icons/Student-initials.png">
          <h2>Joe Bloggs</h2>
          <p>Teacher at Edugate school</p>
        </div>

        <div class="icon-wrapper">
          <div>
            <img src="../public/icons/results.png">
            <p>View results</p>
          </div>
          <div>
            <img src="../public/icons/add-results.png">
            <p>Add results</p>
          </div>
          <div>
            <img src="../public/icons/top-students.png">
            <p>Top students</p>
          </div>
          <div>
            <img src="../public/icons/logout.png">
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  `;

 
}
export function initTeacherDashboard() {
  const sidebarRoot = document.querySelector(".sidebar-root");
  sidebarRoot.appendChild(Sidebar("teacher"));
}