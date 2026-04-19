// let currentUser = {
//         name: "Joe Bloggs",
//         role: "teacher",
//         email: "joeblog2020@edugate.no",
//         birth: "01/01/2002",
//         id: 1921840,
//         gradYear: 2020,
//         school: "The academy",
//       }
// to use when coding så we dont need to login every time we save

// let currentUser = null;

// export function login(user){

//     currentUser = user;
// }

// export function logout(){
//     currentUser = null;
// }

// export function getUser(){
//     return currentUser;
// }

// export function isLoggedIn(){
//     return currentUser !== null;
// }
export function saveUser(user){
    localStorage.setItem("user", JSON.stringify(user));
}

export function getUser(){
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
}

export function logout() {
    localStorage.removeItem("user");
}

export function isLoggedIn(){
    return !!localStorage.getItem("user");
}
export function performLogout(setUserData, navigate) {
  setUserData(null);
  localStorage.removeItem("user");
  navigate("/login");
}