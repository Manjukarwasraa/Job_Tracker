import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-5">
      <h1>🚀 Job Tracker</h1>
      <p>Track your job applications like a pro</p>

      <div className="mt-4">
        <Link to="/login" className="btn btn-primary m-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-outline-primary m-2">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;