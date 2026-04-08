export default function Landing() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Edugate</h1>
          <p>
            Welcome to Edugate, the platform that lets you access your exam
            results online.
          </p>
        </div>
      </section>
      <div className="hero-buttons">
        <a href="/signup" data-link className="btn green">
          Sign up
        </a>
        <a href="/login" data-link className="btn blue">
          Log in
        </a>
      </div>
    </>
  );
}
