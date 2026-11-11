// Shows the list of medicines in a table.
// "onDelete" is optional: if the parent gives it, a Remove button appears.
const BillTable = ({ medicines, onDelete }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-success">
        <tr>
          <th>#</th>
          <th>Medicine</th>
          <th>Qty</th>
          <th>Price (₹)</th>
          <th>Amount (₹)</th>
          {onDelete && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {medicines.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center text-muted">
              No medicines added yet
            </td>
          </tr>
        ) : (
          medicines.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.amount}</td>
              {onDelete && (
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(index)}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default BillTable;
