import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BillPreview from "../components/BillPreview";
import { getBillById } from "../services/api";

const ViewBill = () => {
  const { id } = useParams(); // id comes from the URL: /bill/:id
  const [bill, setBill] = useState(null);

  useEffect(() => {
    loadBill();
  }, []);

  const loadBill = async () => {
    try {
      const response = await getBillById(id);
      setBill(response.data);
    } catch (error) {
      console.log(error);
      alert("Could not load the bill");
    }
  };

  // ---------- Download PDF ----------
  const downloadPdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("MediBill Pharmacy", 105, 15, { align: "center" });
    doc.setFontSize(11);
    doc.text("Medicine Bill", 105, 22, { align: "center" });

    // Bill + patient details
    doc.text("Bill No: " + bill.billNo, 14, 35);
    doc.text("Date: " + bill.date, 14, 42);
    doc.text("Patient: " + bill.patientName, 120, 35);
    doc.text("Phone: " + bill.phone, 120, 42);
    doc.text("Doctor: " + bill.doctorName, 120, 49);

    // Medicine table (autoTable draws the table for us)
    // Note: the default PDF font cannot show the rupee symbol, so we write "Rs."
    const tableRows = [];
    for (let i = 0; i < bill.medicines.length; i++) {
      const item = bill.medicines[i];
      tableRows.push([i + 1, item.name, item.quantity, item.price, item.amount]);
    }

    autoTable(doc, {
      startY: 58,
      head: [["#", "Medicine", "Qty", "Price (Rs.)", "Amount (Rs.)"]],
      body: tableRows,
      headStyles: { fillColor: [25, 135, 84] },
    });

    // Totals (below the table)
    const endY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text("Subtotal: Rs. " + bill.subtotal.toFixed(2), 196, endY, { align: "right" });
    doc.text("GST (5%): Rs. " + bill.gst.toFixed(2), 196, endY + 7, { align: "right" });
    doc.setFontSize(13);
    doc.text("Grand Total: Rs. " + bill.grandTotal.toFixed(2), 196, endY + 16, { align: "right" });

    doc.save(bill.billNo + ".pdf");
  };

  // While data is loading
  if (bill === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h3>Bill {bill.billNo}</h3>
        <button className="btn btn-success" onClick={downloadPdf}>
          ⬇ Download PDF
        </button>
      </div>
      <BillPreview bill={bill} />
    </div>
  );
};

export default ViewBill;
