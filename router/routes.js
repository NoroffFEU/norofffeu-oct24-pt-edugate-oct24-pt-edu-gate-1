// views
import Home from '../pages/home.js'
import Test from '../pages/test.js'
import teacherDashboard, {initTeacherDashboard} from '../pages/teacherDashboard.js';

const routes = [
    { path: "/", view: Home },
    { path: "/test", view: Test },
    { path: "/dashboard", view: teacherDashboard, init: initTeacherDashboard},
];

export default routes;