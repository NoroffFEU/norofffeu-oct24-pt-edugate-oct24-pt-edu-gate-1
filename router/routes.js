// views
import Home from '../pages/home.js'
import Test from '../pages/test.js'
import Login from `../pages/login.js`

const routes = [
    { path: "/", view: Home },
    { path: "/test", view: Test },
    { path: "/login", view: Login },
];

export default routes;