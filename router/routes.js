// views
import Home from "../pages/home.js";
import Test from "../pages/test.js";
import teacherDashboard, {
  initTeacherDashboard,
} from "../pages/teacherDashboard.js";
import Results from "../pages/results.js";
import AddResults from "../pages/addResults.js";
import TopStudents from "../pages/topStudents.js";
import Profile from "../pages/profile.js";
import LogIn, { initLogin } from "../pages/login.js";
import ResultManagement from "../pages/resultMgm.js";
import UserManagement from "../pages/userMgm.js";
import Contact from "../pages/contact.js";

const routes = [
  { path: "/", view: Home },
  { path: "/test", view: Test },
  { path: "/dashboard", view: teacherDashboard, init: initTeacherDashboard },
  { path: "/results", view: Results },
  { path: "/add-results", view: AddResults },
  { path: "/top-students", view: TopStudents },
  { path: "/profile", view: Profile },
  { path: "/login", view: LogIn, init: initLogin },
  { path: "/result-management", view: ResultManagement },
  { path: "/user-management", view: UserManagement },
  { path: "/contact", view: Contact },
];

export default routes;
