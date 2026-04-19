import Sidebar from "../components/Sidebar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { performLogout } from "../src/Auth.jsx";

// import { getInitials, handleLogout } from "../src/utils.js";
// import { getUser } from "../src/auth.js";

function getInitials(name){
  if(!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

}


export default function TeacherDashboard({userData, setUserData}){
  const navigate = useNavigate();

  function handleLogout(){
    performLogout(setUserData, navigate)
  }

  if(!userData){
      alert("You must be logged in to view this page!");
     navigate("/login");
  }

  return (
  <div className="layout">
    <Sidebar role={userData.role} onLogout={handleLogout} />

    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="profile-dash-info">
        <div className="avatar">
          {getInitials(userData.name)}
        </div>
        <h2>{userData.name}</h2>
        <p>{userData.role} at Eduagate school</p>
      </div>

      <div className="icon-wrapper">
        <Link to="/results" className="icon-item top">
          <img src="/icons/results.png" alt="View results"/>
          <p>View results</p>
        </Link>

        <Link to="/add-results" className="icon-item top">
          <img src="/icons/add-results.png" alt="Add results"/>
          <p>Add results</p>
        </Link>

        <Link to="/top-students" className="icon-item top">
          <img src="/icons/top-students.png" alt="Top students"/>
          <p>Top Students</p>
        </Link>

        <Link to="/profile" className="icon-item bottom bottom-1">
          <img src="/icons/user-circle.png" alt="See profile" />
          <p>See profile</p>
        </Link>
        
        <button
          onClick={handleLogout}
          className="icon-item bottom bottom-2"
          type="button"
        >
          <img src="/icons/logout.png" 
            alt="Log out" />
            <p>Log Out</p>
        </button>
        
      </div>
    </div>
  </div>
  );

 
  

 
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