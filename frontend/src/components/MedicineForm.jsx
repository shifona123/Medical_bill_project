import { useState } from "react";

// Small form to add ONE medicine row.
// "onAdd" is a function given by the parent (CreateBill).
const MedicineForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name === "" || quantity === "" || price === "") {
      alert("Please fill medicine name, quantity and price");
      return;
    }

    // Make one medicine object
    const medicine = {
      name: name,
      quantity: Number(quantity),
      price: Number(price),
      amount: Number(quantity) * Number(price),
    };

    onAdd(medicine); // send it to the parent

    // clear the inputs
    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <div className="row g-2 align-items-end">
      <div className="col-md-5">
        <label className="form-label">Medicine Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Paracetamol 500mg"
        />
      </div>
      <div className="col-md-2">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          min="1"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <label className="form-label">Price (₹)</label>
        <input
          type="number"
          min="0"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-success w-100" onClick={handleAdd}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default MedicineForm;
