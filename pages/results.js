import { findStudentByName } from "../src/utils.js";
import { setCurrentStudent} from "../src/studentState.js";

export default function Results(){
    return `
    <div> 
    Dashboard > Select Student
        <div class="results-topbar">
            <div class="search-box">
                <input type="text" id="student-search" placeholder="Search for results..."/>
                <button class="search-btn">🔍</button>
                
            </div>
        </div>
    </div>
    
    `;

 


}

export async function initStudentSearch() {
    const searchInput = document.getElementById("student-search");
    const studentRes =  await fetch("../Data/students.json");

    const studentData = await studentRes.json();
    const student = studentData.users;
    

    searchInput.addEventListener("input", () => {
        const value = searchInput.value;

        const foundStudent = findStudentByName(student, value);
        if(!foundStudent){
            setCurrentStudent(null);
            return;
        }
        setCurrentStudent(foundStudent);
            console.log(foundStudent)
        history.pushState(null, null, "/student-results");
        window.dispatchEvent(new PopStateEvent("popstate"));

    });
}

