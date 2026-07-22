import { useState } from "react";

export default function BorrowModal({ show, onClose, onConfirm, book }) {
  const [days, setDays] = useState("");

  if (!show || !book) return null;

  const handleSubmit = () => {
    if (!days || days <= 0) {
      alert("Please enter a valid number of days");
      return;
    }
    onConfirm(book, Number(days));
    setDays("");
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Borrow Book</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p className="fw-semibold">{book.title}</p>

            <label className="form-label">Read duration (days)</label>
            <input
              type="number"
              className="form-control"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="1"
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-warning" onClick={handleSubmit}>
              Confirm Borrow
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
