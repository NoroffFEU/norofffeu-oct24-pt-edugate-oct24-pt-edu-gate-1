import routes from "./routes.js";
import { isLoggedIn } from "../src/auth.js";

const NotFound = () => /*HTML*/`
<div>
    <h1>404 - Page Not Found</h1>
    <a href="/" data-link>Home</a>
</div>
`;

function router() {
    let path = location.pathname;
    try {
        const url = new URL(window.location.href);
        path = url.pathname;
    } catch (e) {
    }
    if (path.endsWith("index.html") || path === "/templates/") path = "/";

    const route = routes.find(r => r.path === path);

    if( route?.protected && !isLoggedIn()){
        history.replaceState(null, null, "/login");
        path = "/login";
        route = routes.find(r => r.path ==="/login");
    }

    const view = route ? route.view : NotFound;
    document.querySelector("#app").innerHTML = view();
    

    if(route && route.init){
        route.init();
    }
}

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

export function initRouter() {
    document.addEventListener("click", e => {
        const link = e.target.closest('a[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.href);
        }
    });

    window.addEventListener("popstate", router);
    document.addEventListener("DOMContentLoaded", router);
}
