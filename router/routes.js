// views
import Home from '../pages/home.js'
import Test from '../pages/test.js'
import Dashboard from '../pages/dashboard.js';

const routes = [
    { path: "/", view: Home },
    { path: "/test", view: Test },
    { path: "/dashboard", view: Dashboard},
];

export default routes;