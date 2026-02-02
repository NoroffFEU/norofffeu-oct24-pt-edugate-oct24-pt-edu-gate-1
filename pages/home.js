export default function Home() {
  return /*HTML*/ `
    <div>
        <h1>Home</h1>
        <nav>
            <a href="/login" data-link>Go to login</a>
            <br><br>
            <a href="/non-existent-page" data-link>Go to 404 Page</a>
        </nav>
    </div>  
    `;
}
