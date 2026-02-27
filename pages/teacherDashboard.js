import Sidebar from "../components/sidebar.js";
import { getInitials, handleLogout } from "../src/utils.js";
import { getUser } from "../src/auth.js";





export default function teacherDashboard(){
  const user = getUser();
    return /*HTML*/ `

    <div class="layout">
      <div id="sidebar-root"></div>

      <div class="dashboard">
        <h1>Dashboard</h1>

        <div class="profile-dash-info">
         <div id="avatar-root"></div>
         <h2>${user.name}</h2>
         <p>${user.role} at Edugate school</p>
        </div>

        <div class="icon-wrapper">
          <a href="/results" data-link class="icon-item top">
            <img src="../public/icons/results.png">
            <p>View results</p>
          </a>

          <a href="/add-results" data-link class="icon-item top">
            <img src="../public/icons/add-results.png">
            <p>Add results</p>
          </a>

          <a href="/top-students" data-link class="icon-item top">
            <img src="../public/icons/top-students.png">
            <p>Top students</p>
          </a>

          <a href="/profile" data-link class="icon-item bottom bottom-1">
            <img src="../public/icons/user-circle.png">
            <p>See profile</p>
          </a>

          <a href="/login" id="dashboard-logout" data-link class="icon-item bottom bottom-2">
            <img src="../public/icons/logout.png">
            <p>Log out</p>
          </a>
        </div>
      </div>
    </div>
  `;

 
}
export function initTeacherDashboard() {

  const user = getUser();
  if (!user) return;

  const sidebarRoot = document.getElementById("sidebar-root");
  const avatarRoot = document.getElementById("avatar-root");
  
  sidebarRoot.appendChild(Sidebar(user.role));

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = getInitials(user.name);

  avatarRoot.appendChild(avatar)

  const logoutBtn = document.getElementById("dashboard-logout");
  if(logoutBtn){
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    })
  }
}