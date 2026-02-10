
import { getCurrentStudent } from "../src/studentState.js";

export default function Results() {
  return `
    <div class="results-page">
    Dashboard > Select Student > Student Result
        <h1>Student Results </h1>
        <p id="results-subtitle" class="subtitle">Search for a user by firstname</p>

        <div class="results-topbar">
            <div class="search-box">
                <input type="text" id="result-search" placeholder="Search for results..."/>
                <button class="search-btn">🔍</button>
            </div>
            <button class="add-btn">Add result</button>
        </div>
        

        <div class="result-table">
            <div class="row header">
                <div>Year</div>
                <div>Term</div>
                <div>Subject</div>
                <div>Exam</div>
                <div>Result</div>
                <div>Grade</div>
                <div></div>
                
            </div>
            <div id="rows"></div>
        </div>
            <div class="pagination">
            <button>&laquo;</button>
            <button>&lsaquo;</button>
            <button class="active">1</button>
            <button>2</button>
            <span>…</span>
            <button>7</button>
            <button>8</button>
            <button>&rsaquo;</button>
            <button>&raquo;</button>
        </div>

        <button class="back-btn">Back to dashboard</button>
    </div>
  ` 
}

export async function initStudentResultPage(){
    let currentSubjects = [];
    
    const searchInput = document.getElementById("result-search");
    const subtitle = document.getElementById("results-subtitle");
    
    const resultsRes= await fetch("../Data/Results.json");
    const resultData = await resultsRes.json();
    const results = resultData.results

    const selectedStudent = getCurrentStudent();

    const studentResult = results.find(r=> r.studentId === selectedStudent.id);

    currentSubjects = studentResult.subjects
    renderSubjects(currentSubjects, studentResult.session, studentResult.term);
    
    subtitle.textContent = `Here are the results for ${selectedStudent.firstName} ${selectedStudent.lastName}`;

    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        const filtered = currentSubjects.filter(sub =>
            sub.name.toLowerCase().includes(value) ||
            sub.grade.toLowerCase().includes(value) ||
            sub.score.toString().includes(value)
        );
        renderSubjects(filtered, studentResult.session, studentResult.term);
    })
    
   
}

function renderSubjects(subjects, session, term){
    const rowsContainer = document.getElementById("rows");
    rowsContainer.innerHTML = "";
    if(subjects.length === 0){
        rowsContainer.innerHTML = "<div>No results found!</diV>"
    }
    subjects.forEach(sub => {
        const tableRow = document.createElement("div");
        tableRow.className = "row";
        tableRow.innerHTML = `
            <div>${session}</div>
            <div>${term}</div>
            <div>${sub.name}</div>
            <div>exam..</div>
            <div>${sub.score}</div>
            <div>${sub.grade}</div>
               
            <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>

        `;
        rowsContainer.appendChild(tableRow);
    });

}