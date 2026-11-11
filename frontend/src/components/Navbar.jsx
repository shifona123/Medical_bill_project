import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          💊 MediBill
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/create">Create Bill</Link>
          <Link className="nav-link" to="/bills">Saved Bills</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
