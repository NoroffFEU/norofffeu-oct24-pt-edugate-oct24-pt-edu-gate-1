import { getUser } from "../src/auth.js";
import { getInitials } from "../src/utils.js";

export default function profile(){
    const user = getUser();
    return /*HTML*/ `
    <div>
     <nav class="breadcrumb">
            <a href="/dashboard" data-link>Dashboard</a>
            <span class="separator">›</span>
            <a href="/profile" class="current">Profile</a>
        </nav>
        <div class="profile-wrapper">
            <h1>Profile</h1>
            <div id="profile-avatar-root"></div>
            
                <div class="profile-info">
                    <p>Name:</p>
                    <p>${user.name}</p>
                </div>
                <div class="profile-info">
                    <p>Email:</p>
                    <p>${user.email}</p>
                </div>
                <div class="profile-info">
                    <p>Date of birth:</p>
                    <p>${user.birth}</p>
                </div>
                <div class="profile-info">
                    <p>ID:</p>
                    <p>${user.id}</p>
                </div>
                <div class="profile-info">
                    <p>Grad Year:</p>
                    <p>${user.gradYear}</p>
                </div>
                <div class="profile-info">
                    <p>School:</p>
                    <p>${user.school}</p>
                </div>
                <div id="edit-profile"></div>
        </div>
    </div>
    `
}

export function initProfilePage(){
    const user = getUser();

    const profileAvatarRoot = document.getElementById("profile-avatar-root");
 
    const profileAvatar = document.createElement("div");
    profileAvatar.className ="avatar";
    profileAvatar.textContent = getInitials(user.name);
    profileAvatarRoot.appendChild(profileAvatar);

    const editProfile = document.getElementById("edit-profile");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Profile";
    editBtn.className = "blueBtn";
    editProfile.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
       history.pushState(null, null, "/editProfile");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    
}


