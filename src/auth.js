let currentUser = null

export function login(user){
    console.log(user)
    currentUser = user;
}

export function logout(){
    currentUser = null;
}

export function getUser(){
    return currentUser;
}

export function isLoggedIn(){
    return currentUser !== null;
}