import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api"; // your axios instance

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const session_id = params.get("session_id");

        await api.post("/payment-success/", {
          session_id,
        });

        setTimeout(() => {
          navigate("/activities");
        }, 3000);

      } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.error ||
          "Unable to verify payment."
        );

        navigate("/books");
      }
    };

    verifyPayment();
  }, [navigate, params]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg border-0 text-center p-5"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="display-1 text-success mb-3">✅</div>

        <h2 className="fw-bold text-success">
          Payment Successful!
        </h2>

        <p className="text-muted mt-3">
          Your payment has been completed successfully.
        </p>

        <div className="spinner-border text-success mt-3"></div>

        <p className="mt-3">
          Redirecting to <strong>Purchased Books...</strong>
        </p>
      </div>
    </div>
  );
}