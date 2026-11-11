import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-5">
      <h1 className="text-success">💊 MediBill</h1>
      <p className="lead">Create medicine bills and download them as PDF in a minute.</p>

      <div className="row justify-content-center mt-4 g-3">
        <div className="col-md-3">
          <div className="card p-3 h-100">
            <h5>Step 1</h5>
            <p>Enter patient details and add medicines</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 h-100">
            <h5>Step 2</h5>
            <p>Bill total and 5% GST are calculated automatically</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 h-100">
            <h5>Step 3</h5>
            <p>Save the bill and download the PDF</p>
          </div>
        </div>
      </div>

      <Link to="/create" className="btn btn-success btn-lg mt-4">
        Create Bill
      </Link>
    </div>
  );
};

export default Home;
