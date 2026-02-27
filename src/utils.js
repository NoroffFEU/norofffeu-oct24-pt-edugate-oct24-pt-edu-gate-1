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