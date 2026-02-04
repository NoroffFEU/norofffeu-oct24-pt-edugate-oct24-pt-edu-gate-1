export function getInitials(fullName){
    if(!fullName) return "";
    return fullName.trim().split(" ").map(name => name[0]).join("").toUpperCase();
}