import { getUser } from "../src/auth.js";
import { getInitials } from "../src/utils.js";

export default function editProfile(){

    const user = getUser();

    return /*HTML*/`
    <div>
     <nav class="breadcrumb">
            <a href="/dashboard" data-link>Dashboard</a>
            <span class="separator">›</span>
            <a href="/profile" class="current">Profile</a>
        </nav>
    <div class="profile-wrapper">

        <h1>Edit Profile</h1>

        <div class="avatar">${getInitials(user.name)}</div>

        <form id="editForm">

            <label>Name:</label>
            <input name="name" value="${user.name}" />

            <label>Email:</label>
            <input name="email" value="${user.email}" />

            <label>Date of Birth:</label>
            <input name="birth" value="${user.birth}" />

            <label>ID:</label>
            <input value="${user.id}" readonly/>

            <label>Grad Year:</label>
            <input value="${user.gradYear}"  readonly />

            <label>School:</label>
            <input value="${user.school}"  readonly />

            <button class="greenBtn">Update</button>

        </form>

    </div>
    </div>
    `;
}

export function initEditProfile(){

    const form = document.getElementById("editForm");

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const user = getUser();

        user.name = form.name.value;
        user.email = form.email.value;
        user.birth = form.birth.value;

          history.pushState(null, null, "/profile");
            window.dispatchEvent(new PopStateEvent("popstate"));

    });

}