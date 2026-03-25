import { logout } from "../src/auth.js";
import { handleLogout } from "../src/utils.js";

export default function Sidebar(role){
    const sidebar = document.createElement("aside");
    sidebar.className ="sidebar collapsed";

    const toggleBtn = document.createElement("img");
    toggleBtn.className = "toggle-btn";
    toggleBtn.src = "../public/icons/green-double-arrows-right.png";
    toggleBtn.alt = "Toggle sidebar";

    sidebar.addEventListener("mouseenter", () =>{
        if(!sidebar.classList.contains("pinned")){
            sidebar.classList.add("expanded");
            sidebar.classList.remove("collapsed");
        }
    });

    sidebar.addEventListener("mouseleave", () =>{
        if(!sidebar.classList.contains("pinned")){
            sidebar.classList.add("collapsed");
            sidebar.classList.remove("expanded");
        }
    })

    toggleBtn.addEventListener("click", () => {
       const isPinned = sidebar.classList.toggle("pinned");

        if (isPinned) {
            sidebar.classList.add("expanded");
            sidebar.classList.remove("collapsed");
            toggleBtn.src = "../public/icons/green-x.png";
        } else {
            sidebar.classList.add("collapsed");
            sidebar.classList.remove("expanded");
            toggleBtn.src = "../public/icons/green-double-arrows-right.png";
        }
    });

    const menu = document.createElement("ul");
    menu.className = "menu";

    const menuConfig = {
        teacher: [
            { icon: "dashboard.png", text: "Home", path: "/"},
            { icon: "results.png", text: "Results management", path: "/results"},
            { icon: "user-management.png", text: "User management", path: "/user-management"},
            { icon: "top-students.png", text: "Top students", path: "/top-students"},
            { icon: "logout.png", text: "Logout", path: "/login"},

        ], 
        studens: [
            { icon: "dashboard.png", text: "Home"},
            { icon: "user-management.png", text: "Profile"},
            { icon: "results.png", text: "Results management"},
            { icon: "logout.png", text: "Logout"},
        ],
        admin: [
            { icon: "dashboard.png", text: "Home"},
            { icon: "results.png", text: "Results management"},
            { icon: "user-management.png", text: "User management"},
            { icon: "school-management .png", text: "School management"},
            { icon: "logout.png", text: "Logout"},
        ]
    };

    menuConfig[role].forEach(item => {
        const link = document.createElement("a");
        link.href = item.path;
        link.dataset.link = "";
        link.className = "menu-link";

        const li = document.createElement("li");
        
        const img = document.createElement("img");
        img.src = `../public/icons/${item.icon}`;
        img.alt = item.text;

        const label = document.createElement("p");
        label.textContent = item.text;

        li.append(img, label);
        link.appendChild(li)
        menu.appendChild(link);
    });

    menu.addEventListener("click", (e) => {
        const logoutLink = e.target.closest("a[href='/logout']");
        if(!logoutLink) return;

        e.preventDefault();
        logout();

        handleLogout();


    })

    sidebar.append(toggleBtn, menu);
    return sidebar;
}