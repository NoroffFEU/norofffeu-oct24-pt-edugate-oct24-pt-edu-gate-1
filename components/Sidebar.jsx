// import { logout } from "../src/auth.js";
// import { handleLogout } from "../src/utils.js";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Sidebar({role, onLogout}){
    const [isPinned, setIsPinned] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isExpanded = isPinned || isHovered;


    const menuConfig = {
        teacher: [
            { icon: "dashboard.png", text: "Home", path: "/dashboard"},
            { icon: "results.png", text: "Results management", path: "/results"},
            { icon: "user-management.png", text: "User management", path: "/user-management"},
            { icon: "top-students.png", text: "Top students", path: "/top-students"},

        ], 
        students: [
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

    const items = menuConfig[role] || [];

    return (
        <aside
            className={`sidebar ${isExpanded ? "expanded" : "collapsed"} ${isPinned ? "pinned" : ""}
            `}
            onMouseEnter={() => {
                if(!isPinned) setIsHovered(true);
            }}
            onMouseLeave={() => {
                if(!isPinned) setIsHovered(false);
            }}
        >
            <img 
                className="toggle-btn"
                src={ isPinned 
                    ? "/icons/green-x.png"
                    : "/icons/green-double-arrows-right.png"
                }    
                alt="Toggle sidebar"
                onClick={() => {
                    setIsPinned((prev) => !prev);
                    setIsHovered(false);
                }}
                style={{cursor: "pointer"}}
            />

            <ul className="menu">
                {items.map((item) => (
                    <li key={item.text}>
                        <Link to={item.path} className="menu-link">
                            <img src={`/icons/${item.icon}`} alt={item.text} />
                            <p>{item.text}</p>
                        </Link>
                    </li>
                ))}

                <li>
                    <button type="button" className="menu-link logout-btn" onClick={onLogout}>
                        <img src="/icons/logout.png" alt="Logout" />
                        <p>Logout</p>
                    </button>
                </li>

            </ul>

        </aside>
    )

   
}