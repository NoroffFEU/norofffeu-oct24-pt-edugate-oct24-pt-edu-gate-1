export default function Results() {
  return `
    <div class="results-page">
        <h1>Student Results </h1>
        <p id="results-subitle" class="subtitle">Search for a user by firstname</p>

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
    const rowsContainer = document.getElementById("rows");
    const searchInput = document.getElementById("result-search");
    const subtitle = document.getElementById("results-subitle");
    

    const [studentRes, resultsRes]= await Promise.all([
        fetch("../Data/Students.json"),
        fetch("../Data/Results.json")
    ]);

    const studentsData = await studentRes.json();
    const resultData = await resultsRes.json();

    const student = studentsData.users;
    const results = resultData.results
    

    console.log(studentsData.users[0].firstName)

        searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        
        const selectedStudent = student.find(student => 
            `${student.firstName} ${student.lastName}`.toLocaleLowerCase().includes(value)
        )

        if(!selectedStudent){
            alert("No student found!");
        }
        console.log("found student:", selectedStudent);

        const studentResult = results.find(r=> r.studentId === selectedStudent.id);
        console.log("Results:", studentResult);

       
            rowsContainer.innerHTML = "";
         

        studentResult
        .subjects.forEach(sub => {
            const tableRow = document.createElement("div");
            tableRow.className = "row";
            tableRow.innerHTML = `
                <div>${studentResult.session}</div>
                <div>${studentResult.term}</div>
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
             subtitle.textContent = `Here are the results for ${selectedStudent.firstName} ${selectedStudent.lastName}`;

        });
    
   
}