import "./home.css";
function Home() {
  return (
    <div className="Home">
      <div className="center">
        <h1>
          <b>CSC:</b> Customer Support ChatBot
        </h1>
      </div>
      <hr />
      <main>
        <p>This chatbot answers the question based on the following page</p>
        <br />
        <h2>
          <a
            href="https://www.optisolbusiness.com/"
            target="_blank"
            rel="noreferrer"
          >
            Optisol Business Solution
          </a>
        </h2>
      </main>
    </div>
  );
}

export default Home;
