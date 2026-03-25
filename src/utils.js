import {logout} from './auth.js';

export function getInitials(fullName){
    if(!fullName) return "";
    return fullName.trim().split(" ").map(name => name[0]).join("").toUpperCase();
}

export function handleLogout(){
    logout();
    history.pushState(null, null, "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
}

export function findStudentByName(students, searchValue){
    const value = searchValue.toLowerCase();

    return students.filter(student => 
        `${student.firstName} ${student.lastName}`
        .toLowerCase().includes(value)
    )|| null;
}

export function setActiveNav(){
    const links = document.querySelectorAll(".navbar a");
    const currentPath = window.location.pathname;
   

    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        link.classList.remove("active");

        if(linkPath === "/dashboard" && (
            currentPath === "/dashboard" ||
            currentPath.startsWith("/student-results") ||
            currentPath.startsWith("/results") 
        )
    ){
        link.classList.add("active");
    }
    else if( linkPath === currentPath){
        link.classList.add("active")
    }
    });
}

export function mergeStudentResults(resultsArray) {
  const merged = {};

  resultsArray.forEach(entry => {

    if (!merged[entry.studentId]) {
      merged[entry.studentId] = {
        studentId: entry.studentId,
        subjects: []
      };
    }

    entry.subjects.forEach(sub => {
      merged[entry.studentId].subjects.push({
        ...sub,
        term: entry.term,
        session: entry.session
      });
    });

  });

  return Object.values(merged);
}