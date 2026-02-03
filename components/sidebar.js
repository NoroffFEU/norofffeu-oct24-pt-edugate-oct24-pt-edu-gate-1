export default function Sidebar(role){
    const sidebar = document.createElement("aside");
    sidebar.className ="sidebar collapsed";

    const toggleBtn = document.createElement("img");
    toggleBtn.className = "toggle-btn";
    toggleBtn.src = "../public/icons/green-double-arrows-right.png";
    toggleBtn.alt = "Toggle sidebar";

    toggleBtn.addEventListener("click", () => {
        const isCollapsed = sidebar.classList.toggle("collapsed");
        toggleBtn.src = isCollapsed
            ? "../public/icons/green-double-arrows-right.png"
            : "../public/icons/green-x.png";
    });

    const menu = document.createElement("ul");
    menu.className = "menu";

    const menuConfig = {
        teacher: [
            { icon: "dashboard.png", text: "Home"},
            { icon: "results.png", text: "Results management"},
            { icon: "user-management.png", text: "User management"},
            { icon: "top-students.png", text: "Top students"},
            { icon: "logout.png", text: "Logout"},

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
        const li = document.createElement("li");
        
        const img = document.createElement("img");
        img.src = `../public/icons/${item.icon}`;
        img.alt = item.text;

        const label = document.createElement("p");
        label.textContent = item.text;

        li.append(img, label);
        menu.appendChild(li);
    });

    sidebar.append(toggleBtn, menu);
    return sidebar;
}