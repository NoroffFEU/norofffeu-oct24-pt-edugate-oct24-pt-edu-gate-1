let currentUser = null;

export function login(user){

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