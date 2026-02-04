import Sidebar from "../components/sidebar.js";
import { getInitials } from "../src/utils.js";

const loggedInUser ={
  name: "Joe Bloggs",
  role: "teacher"
};

export default function teacherDashboard(){

    return /*HTML*/ `

    <div class="layout">
      <div id="sidebar-root"></div>

      <div class="dashboard">
        <h1>Dashboard</h1>

        <div class="profile-dash-info">
         <div id="avatar-root"></div>
         <h2>${loggedInUser.name}</h2>
         <p>${loggedInUser.role} at Edugate school</p>
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
            <img src="../public/icons/user-circle.png">
            <p>See profile</p>
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
  console.log("INIT DASHBOARD");

  const sidebarRoot = document.getElementById("sidebar-root");
  const avatarRoot = document.getElementById("avatar-root");

  console.log("avatarRoot", avatarRoot);
  
  sidebarRoot.appendChild(Sidebar(loggedInUser.role));

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = getInitials(loggedInUser.name);

  avatarRoot.appendChild(avatar)
}