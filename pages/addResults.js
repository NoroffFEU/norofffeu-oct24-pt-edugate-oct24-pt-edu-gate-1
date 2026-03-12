
export default function addResults() {
    return /*HTML */`
    <div>
      <nav class="breadcrumb">
            <a href="/dashboard" data-link>Dashboard</a>
            <span class="separator">›</span>
            <a href="/add-results" class="current">Add results</a>
        </nav>
   <div class="upload-card">

    <h2>Add Results</h2>

    <p class="upload-description">
        Upload an Excel file with the following column structure
    </p>

    <div class="format-preview">

        <div class="format-row header">
            <div>school-id</div>
            <div>student-id</div>
            <div>year</div>
            <div>term</div>
            <div>result</div>
            <div>grade</div>
        </div>

        <div class="format-row">
            <div>School ID</div>
            <div>Student ID</div>
            <div>Year of exam</div>
            <div>Term (1-3)</div>
            <div>Score</div>
            <div>Letter grade</div>
        </div>

    </div>

    <div class="upload-drop-area" id="drop-area">
        <p>Drag & drop Excel file here</p>
        <span>or</span>

        <input type="file" id="fileInput" accept=".xlsx,.xls" hidden>

        <button class="upload-btn" id="uploadBtn">Upload file</button>
    </div>

 
     
</div>
 <button type="button" class="back-btn">Back to dashboard</button>
 </div>
    `
} 

export function initAddResults(){
   
    const backBtn = document.querySelector(".back-btn");

    backBtn.addEventListener("click", () => {
        history.pushState(null, null, "/dashboard");
        window.dispatchEvent(new PopStateEvent("popstate"));
    });

    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("fileInput");
    const uploadBtn = document.getElementById("uploadBtn");

    uploadBtn.addEventListener("click", () => {
    fileInput.click();
    });

    dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("dragover");
    });

    dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
    });

    dropArea.addEventListener("drop", e => {
    e.preventDefault();
    dropArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];

    if(file){
        handleFileUpload(file);
    }
    });

    fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(file){
        handleFileUpload(file);
    }
    });

    function handleFileUpload(file){
    console.log("Uploaded file:", file);
    dropArea.innerHTML = `<img src="../public/icons/success.png"> <p>upload success</p>`
    const reader = new FileReader();

    reader.onload = async function(e){
        const data = new Uint8Array(e.target.result);

    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet);
    console.log(jsonData)

    const {validResults, errors} = await validateResults(jsonData);

    if(errors.length){
        alert(errors.join("\n"));
        return;
    }
    await saveResults(validResults);
    };
    reader.readAsArrayBuffer(file);

    }
}
async function loadStudents() {
        const res = await fetch("../Data/students.json");
        const data = await res.json();
        return data.users;
}

function findStudent(students, studentId, schoolId){
    
    return students.find(student =>
        
        student.id === studentId &&
        student.schoolId === schoolId
    );
}

async function validateResults(data){
    const students = await loadStudents();
    const validResults = [];
    const errors = [];

    data.forEach(element => {
        
        const student = findStudent(students, element["student-id"], element["school-id"]);

        if(!student){
            errors.push(`No student found with id ${element.student_id} in school ${element.school_id}`);
            return;
        }

        validResults.push({
            studentId: element["student-id"],
            term: element.term,
            session: element.year,
            subjects:[{
                name: "upload subject",
                score: element.result,
                grade: element.grade,
            }
        ]
        });
        
    });
    return {validResults, errors};
}

async function saveResults(validResults){

    const res = await fetch("../Data/Results.json");

    const data = await res.json();

    validResults.forEach(newResult => {

        const existingStudent = data.results.find(r =>
            r.studentId === newResult.studentId 
        );

        if(existingStudent){
            existingStudent.subjects.push(...newResult.subjects);
            existingStudent.session = newResult.session;
            existingStudent.term = newResult.term;
        }
        else{
            data.results.push(newResult);
        }

    });
    localStorage.setItem("results", JSON.stringify(data));
    console.log("updated results:", data);
   
}