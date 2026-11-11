import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicineForm from "../components/MedicineForm";
import BillTable from "../components/BillTable";
import { getAllBills, saveBill } from "../services/api";

const CreateBill = () => {
  const navigate = useNavigate();

  // Patient details
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  // List of medicines added so far
  const [medicines, setMedicines] = useState([]);

  // ---- Calculations (done every time medicines change) ----
  let subtotal = 0;
  for (let i = 0; i < medicines.length; i++) {
    subtotal = subtotal + medicines[i].amount;
  }
  const gst = subtotal * 0.05; // GST is 5% of subtotal
  const grandTotal = subtotal + gst;

  // Called by MedicineForm when "Add" is clicked
  const addMedicine = (medicine) => {
    setMedicines([...medicines, medicine]);
  };

  // Remove one medicine using its position in the list
  const removeMedicine = (index) => {
    const newList = medicines.filter((item, i) => i !== index);
    setMedicines(newList);
  };

  // Make bill numbers like MB1001, MB1002 ...
  const makeBillNo = async () => {
    const response = await getAllBills();
    const bills = response.data;
    let biggest = 1000;
    for (let i = 0; i < bills.length; i++) {
      const number = Number(bills[i].billNo.replace("MB", ""));
      if (number > biggest) {
        biggest = number;
      }
    }
    return "MB" + (biggest + 1);
  };

  const handleSave = async () => {
    if (patientName === "" || phone === "" || doctorName === "") {
      alert("Please fill patient name, phone and doctor name");
      return;
    }
    if (medicines.length === 0) {
      alert("Please add at least one medicine");
      return;
    }

    try {
      const billNo = await makeBillNo();

      const bill = {
        billNo: billNo,
        date: date,
        patientName: patientName,
        phone: phone,
        doctorName: doctorName,
        medicines: medicines,
        subtotal: subtotal,
        gst: gst,
        grandTotal: grandTotal,
      };

      const response = await saveBill(bill);
      alert("Bill saved: " + billNo);
      navigate("/bill/" + response.data.id); // go to the bill page
    } catch (error) {
      console.log(error);
      alert("Could not save. Is the backend running on port 5000?");
    }
  };

  return (
    <div>
      <h3 className="mb-3">Create Bill</h3>

      {/* Patient details */}
      <div className="card p-3 mb-3">
        <h5>Patient Details</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <label className="form-label">Patient Name</label>
            <input
              className="form-control"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Doctor Name</label>
            <input
              className="form-control"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Add medicine */}
      <div className="card p-3 mb-3">
        <h5>Add Medicine</h5>
        <MedicineForm onAdd={addMedicine} />
      </div>

      {/* Medicine list + totals */}
      <div className="card p-3 mb-3">
        <h5>Medicines</h5>
        <BillTable medicines={medicines} onDelete={removeMedicine} />
        <div className="text-end">
          <p className="mb-1">Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p className="mb-1">GST (5%): ₹{gst.toFixed(2)}</p>
          <h5>Grand Total: ₹{grandTotal.toFixed(2)}</h5>
        </div>
      </div>

      <button className="btn btn-success btn-lg" onClick={handleSave}>
        Save Bill
      </button>
    </div>
  );
};

export default CreateBill;
