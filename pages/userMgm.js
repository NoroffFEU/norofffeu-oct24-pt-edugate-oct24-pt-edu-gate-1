import { createTable } from "../components/table/table.js";
import { createPagination } from "../components/table/pagination.js";
import { createDeleteUserModal } from "../components/modal/deleteUserModal.js";

export default function UserManagement() {
  return /*HTML*/`
  <div class="results-page"> 

    <nav class="breadcrumb">
      <a href="/dashboard" data-link>Dashboard</a>
      <span class="separator">›</span>
      <a href="/results" class="current">Select User</a>
    </nav>

    <div class="result-header">
      <h1>Select User</h1>
      <p>Search for the user below & select to make changes to their info:</p>

        <div class="filters">
            <div class="search-box">
                <input type="text" id="user-search" placeholder="Search users..."/>
            </div>

            <select id="role-filter" class="role-filter">
                <option value="">All roles</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
        </div>
      <button class="add-user-btn add-btn">Add user</button>
    </div>

    <div class="user-table">
      <div class="row header">
        <div class="col id">ID</div>
        <div class="col firstName">First Name</div>
        <div class="col lastName">Last Name</div>
        <div class="col selectYear">Year</div>
        <div class="col role">Role</div>
        <div class="col actions"></div>
      </div>
      <div id="user-table-rows"></div>
    </div>

    <div class="pagination"></div>

    <button type="button" class="back-btn">Back to dashboard</button>

  </div>
  `;
}

export async function initUserManagement(){

  const state = {
    allUsers: [],
    filteredUsers: [],
    currentPage: 1,
    itemsPerPage: 7,
    table: null,
    pagination: null,
    userToDelete: null,
  };

  setupNavigation();
  setupTable(state);
  setupPagination(state);
  setupSearch(state);
  setupRoleFilter(state);
  setupModals(state);

  await loadUsers(state);

  render(state);
}

async function loadUsers(state){

  const [studentsRes, teachersRes] = await Promise.all([
    fetch("../Data/Students.json"),
    fetch("../Data/Teachers.json")
  ]);

  const { users: students } = await studentsRes.json();
  const { users: teachers } = await teachersRes.json();

  state.allUsers = [...students, ...teachers];
  state.filteredUsers = [...state.allUsers];
}

function setupTable(state){

  const container = document.getElementById("user-table-rows");

  state.table = createTable(
    container,
    [
      { class:"id", value:"id" },
      { class:"firstName", value:"firstName" },
      { class:"lastName", value:"lastName" },
      { class:"selectYear", value:"class" },
      { class:"role", value:"role" },
    ],
    [
      {
        label:"Edit",
        class:"edit-btn",
        onClick:(row)=> state.handleEdit(row)
      },
      {
        label:"Delete",
        class:"delete-btn",
        onClick:(row)=> state.handleDelete(row)
        
      }
    ],
    {
      onRowClick:(row)=> state.handleEdit(row)
    }
  );


  state.handleEdit = (user) => {

    localStorage.setItem("selectedUser", JSON.stringify(user));

    history.pushState(null, null, "/edit-user");

    window.dispatchEvent(new PopStateEvent("popstate"));
  };
}

function setupModals(state){

  const deleteModal = createDeleteUserModal(() => {
    
    const user = state.userToDelete;

    if(!user) return;
    state.allUsers = state.allUsers.filter(u => u.id !== user.id);
    state.filteredUsers = [...state.allUsers];

    render(state);
  });

  state.handleDelete = (user) => {
   state.userToDelete = user;
    deleteModal.open(user);
  };
}

function setupSearch(state){

  const input = document.getElementById("user-search");

  input.addEventListener("input", () => {

    applyFilters(state);

  });
}

function setupRoleFilter(state){

  const select = document.getElementById("role-filter");

  select.addEventListener("change", () => {

    applyFilters(state);

  });
}

function applyFilters(state){

  const searchValue = document.getElementById("user-search").value.toLowerCase();
  const roleValue = document.getElementById("role-filter").value;

  state.filteredUsers = state.allUsers.filter(user => {

    const matchesSearch =
      user.firstName.toLowerCase().includes(searchValue) ||
      user.lastName.toLowerCase().includes(searchValue) ||
      user.id.toLowerCase().includes(searchValue);

    const matchesRole =
      !roleValue || user.role === roleValue;

    return matchesSearch && matchesRole;
  });

  state.currentPage = 1;

  render(state);
}

function setupPagination(state){

  const container = document.querySelector(".pagination");

  state.pagination = createPagination(container, (page) => {

    state.currentPage = page;

    render(state);

  });
}

function render(state){

  const paginated = getPaginatedData(state);

  state.table.render(paginated);

  state.pagination.render({
    currentPage: state.currentPage,
    totalItems: state.filteredUsers.length,
    itemsPerPage: state.itemsPerPage
  });
}

function getPaginatedData(state){

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;

  return state.filteredUsers.slice(start, end);
}

function setupNavigation(){

  const backBtn = document.querySelector(".back-btn");

  backBtn.addEventListener("click", () => {

    history.pushState(null, null, "/dashboard");

    window.dispatchEvent(new PopStateEvent("popstate"));

  });

  const addUserBtn = document.querySelector(".add-user-btn")
  .addEventListener("click", () =>{
    history.pushState(null, null, "/add-users");

    window.dispatchEvent(new PopStateEvent("popstate"));
  })
}