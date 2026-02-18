
import { createTable} from "../components/table/table.js";
import { createPagination } from "../components/table/pagination.js";
import { findStudentByName } from "../src/utils.js";
import { setCurrentStudent } from "../src/studentState.js";

export default function Results(){
    return /*HTML*/`
    <div class="results-page"> 
        <nav class="breadcrumb">
            <a href="/dashboard" data-link>Dashboard</a>
            <span class="separator">›</span>
            <a href="/results" class="current">Select Student</a>
        </nav>

        <div class="result-header">
            <h1>Select Student </h1>
            <img class="result-icon-header" src="../public/icons/results.png">
            <p>select student to view result</p>
            <div class="search-box">
                <input type="text" id="student-search" placeholder="Search for student..."/>
                <button class="search-btn"></button>     
            </div>
        </div>

        <div class="result-table">
            <div class="row header">
                <div class="col id">Student ID</div>
                <div class="col firstName">
                    <span class="desktop-label">First Name </span>
                    <span class="mobile-label">F.Name </span>
                </div>
                <div class="col lastName">
                    <span class="desktop-label">Last Name </span>
                    <span class="mobile-label">L.Name </span>
                </div>
                <div class="col selectYear">Year</div>
            </div>
            <div id="result-table-rows"></div>
        </div>
        <div class="pagination"></div>
        <button type="button" class="back-btn">Back to dashboard</button>
    </div>
    
    `;

}


export async function initStudentSearch(){

    const state = {
        allStudents: [],
        students: [],
        filteredStudents: [],

        currentPage: 1,
        itemsPerPage: 7,

        table: null,
        pagination: null
    };

    setupNavigation();

    setupTable(state);

    setupPagination(state);

    setupSearch(state);

    await loadStudents(state);

    render(state);
}

async function loadStudents(state){

    const res =
        await fetch("../Data/students.json");

    const data =
        await res.json();

   state.allStudents = data.users;

    state.students = [...state.allStudents];

    state.filteredStudents = [...state.allStudents];
    
}

function setupTable(state){
   
    const container = document.getElementById("result-table-rows");
   
    state.table = createTable(container,
    

        [
        { class:"id", value:"id" },
        { class:"firstName", value:"firstName" },
        { class:"lastName", value:"lastName" },
        { class:"selectYear", value:"class" }
        ],

        [
        {
            label:"",
            class:"info-btn",
            onClick: selectStudent
        }
        ], 
        {
            onRowClick: (student) => {
                selectStudent(student)
            }
        })
}

function setupNavigation(){
   const backBtn = document.querySelector(".back-btn");

  backBtn.addEventListener("click", () => {
    history.pushState(null, null, "/dashboard");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
function setupPagination(state){

    const container =
        document.querySelector(".pagination");

    state.pagination =
        createPagination(

            container,

            (page)=>{

                state.currentPage =
                    page;

                render(state);
            }
        );
}
function setupSearch(state){

    const input =
        document.getElementById("student-search");

    input.addEventListener("input", ()=>{

       const results = findStudentByName(state.allStudents, input.value);
        state.filteredStudents = results
        state.currentPage = 1;

        render(state);
    });
}

function render(state){

    const paginated =
        getPaginatedData(state);

    state.table.render(paginated);

    state.pagination.render({

        currentPage:
            state.currentPage,

        totalItems:
            state.filteredStudents.length,

        itemsPerPage:
            state.itemsPerPage
    });
}


function getPaginatedData(state){

    const start =
        (state.currentPage - 1)
        *
        state.itemsPerPage;

    const end =
        start
        +
        state.itemsPerPage;

    return state.filteredStudents.slice(start, end);
}
function selectStudent(student){

    setCurrentStudent(student);

    history.pushState(
        null,
        null,
        "/student-results"
    );

    window.dispatchEvent(
        new PopStateEvent("popstate")
    );
}
