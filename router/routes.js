// views
import Home, { initHome } from "../pages/home.js";
import Test from "../pages/test.js";
import teacherDashboard, {
  initTeacherDashboard,
} from "../pages/teacherDashboard.js";
import StudentResults, {
  initStudentResultPage,
} from "../pages/studentResults.js";
import AddResults from "../pages/addResults.js";
import TopStudents from "../pages/topStudents.js";
import Profile, { initProfilePage } from "../pages/profile.js";
import LogIn from "../pages/login.js";
import ResultManagement from "../pages/resultMgm.js";
import UserManagement, {initUserManagement} from "../pages/userMgm.js";
import Contact from "../pages/contact.js";
import Landing from "../pages/landing.js";
import Results, { initStudentSearch } from "../pages/results.js";
import About, { initAbout } from "../pages/about.js";
import SignUp from "../pages/signup.js";
import Registration from "../pages/registration.js";
import editProfile, { initEditProfile } from "../pages/editprofile.js";
import EditUser from "../pages/editUser.js";
import addUsers from "../pages/addUsers.js";

const routes = [
  { path: "/", view: Home, init: initHome },
  { path: "/test", view: Test },
  {
    path: "/dashboard",
    view: teacherDashboard,
    init: initTeacherDashboard,
    protected: true,
  },
  { path: "/results", view: Results, init: initStudentSearch, protected: true },
  {
    path: "/student-results",
    view: StudentResults,
    init: initStudentResultPage,
     protected: true
  },
  { path: "/add-results", view: AddResults, protected: true },
  { path: "/top-students", view: TopStudents, protected: true },
  { path: "/profile", view: Profile, init: initProfilePage,  protected: true},
  { path: "/editProfile", view: editProfile, init: initEditProfile,  protected: true},
  { path: "/login", view: LogIn },
  { path: "/result-management", view: ResultManagement, protected: true },
  { path: "/user-management", view: UserManagement,init: initUserManagement, protected: true },
  { path: "/contact", view: Contact },
  { path: "/landing", view: Landing },
  { path: "/about", view: About, init: initAbout },
  { path: "/signup", view: SignUp },
  { path: "/registration", view: Registration },
  { path: "/edit-user", view: EditUser },
  { path: "/add-users", view: addUsers },

];

export default routes;
