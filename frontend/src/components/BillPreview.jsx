import BillTable from "./BillTable";

// Shows the final bill like a paper. Used in ViewBill page.
const BillPreview = ({ bill }) => {
  return (
    <div className="bill-paper">
      <h3 className="text-center text-success">MediBill Pharmacy</h3>
      <p className="text-center text-muted">Medicine Bill</p>
      <hr />

      <div className="row mb-3">
        <div className="col-md-6">
          <p className="mb-1"><b>Bill No:</b> {bill.billNo}</p>
          <p className="mb-1"><b>Date:</b> {bill.date}</p>
        </div>
        <div className="col-md-6">
          <p className="mb-1"><b>Patient:</b> {bill.patientName}</p>
          <p className="mb-1"><b>Phone:</b> {bill.phone}</p>
          <p className="mb-1"><b>Doctor:</b> {bill.doctorName}</p>
        </div>
      </div>

      <BillTable medicines={bill.medicines} />

      <div className="text-end">
        <p className="mb-1">Subtotal: ₹{bill.subtotal.toFixed(2)}</p>
        <p className="mb-1">GST (5%): ₹{bill.gst.toFixed(2)}</p>
        <h5>Grand Total: ₹{bill.grandTotal.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default BillPreview;
