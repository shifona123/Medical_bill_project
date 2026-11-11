import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBills, deleteBill } from "../services/api";

const SavedBills = () => {
  const [bills, setBills] = useState([]);

  // Runs once when the page opens
  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const response = await getAllBills();
      setBills(response.data);
    } catch (error) {
      console.log(error);
      alert("Could not load bills. Is the backend running?");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bill?")) {
      return;
    }
    try {
      await deleteBill(id);
      loadBills(); // refresh the list
    } catch (error) {
      console.log(error);
      alert("Could not delete the bill");
    }
  };

  return (
    <div>
      <h3 className="mb-3">Saved Bills</h3>

      <table className="table table-bordered table-striped bg-white">
        <thead className="table-success">
          <tr>
            <th>Bill No</th>
            <th>Date</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Total (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bills.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No bills saved yet
              </td>
            </tr>
          ) : (
            bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.billNo}</td>
                <td>{bill.date}</td>
                <td>{bill.patientName}</td>
                <td>{bill.doctorName}</td>
                <td>{bill.grandTotal.toFixed(2)}</td>
                <td>
                  <Link to={"/bill/" + bill.id} className="btn btn-sm btn-primary me-2">
                    View
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(bill.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SavedBills;
