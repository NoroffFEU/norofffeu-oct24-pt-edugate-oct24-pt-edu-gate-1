// views
import Home, {initHome} from '../pages/home.js'
import Test from '../pages/test.js'
import teacherDashboard, {initTeacherDashboard} from '../pages/teacherDashboard.js';
import Results from "../pages/results.js";
import AddResults from "../pages/addResults.js";
import TopStudents from "../pages/topStudents.js";
import Profile from "../pages/profile.js";
import LogIn, {initLogin} from '../pages/login.js';
import ResultManagement from "../pages/resultMgm.js";
import UserManagement from "../pages/userMgm.js";
import About, {initAbout} from "../pages/about.js";



const routes = [
    { path: "/", view: Home, init: initHome, },
    { path: "/test", view: Test },
    { path: "/dashboard", view: teacherDashboard, init: initTeacherDashboard, protected: true},
    { path: "/results", view: Results, protected: true },
    { path: "/add-results", view: AddResults, protected: true },
    { path: "/top-students", view: TopStudents, protected: true },
    { path: "/profile", view: Profile, protected: true },
    { path: "/login", view: LogIn, init: initLogin },
    { path: "/result-management", view: ResultManagement, protected: true},
    { path: "/user-management", view: UserManagement, protected: true},
    { path: "/about", view: About,  init: initAbout,},
    
];

export default routes;