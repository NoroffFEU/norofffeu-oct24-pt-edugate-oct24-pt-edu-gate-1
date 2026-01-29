export default function Home() {
    return /*HTML*/`
    <div>
        <h1>Home</h1>
        <nav>
            <a href="/test" data-link>Go to Test Page</a>
            <br>
           <a href="/dashboard" data-link>Go to dashboard</a>
            <br><br>
            <a href="/non-existent-page" data-link>Go to 404 Page</a>
        </nav>
    </div>  
    `;
}