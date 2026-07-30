import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 text-center p-5"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="display-1 text-danger mb-3">
          ❌
        </div>

        <h2 className="fw-bold text-danger">
          Payment Cancelled
        </h2>

        <p className="text-muted mt-3">
          Your payment was cancelled.
        </p>

        <p className="text-muted">
          No amount has been charged.
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/books")}
        >
          Back to Books
        </button>
      </div>
    </div>
  );
}