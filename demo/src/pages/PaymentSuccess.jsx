// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import api from "../services/api"; // your axios instance

// export default function PaymentSuccess() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   console.log("API URL:", import.meta.env.VITE_API_URL);
//   console.log("Session:", session_id);
//   console.log("PaymentSuccess component rendered");

//   useEffect(() => {
//   console.log("PaymentSuccess mounted");

//   const verifyPayment = async () => {
//     const session_id = params.get("session_id");

//     console.log("Session ID:", session_id);

//     try {
//       console.log("Before API call");
//       console.log("Base URL:", import.meta.env.VITE_API_URL);
//       console.log("Full URL:", `${import.meta.env.VITE_API_URL}/payment-success/`);

//       const response = await api.post("/payment-success/", {
//         session_id,
//       });

//       console.log("API Success:", response.data);

//       setTimeout(() => {
//         navigate("/activities");
//       }, 3000);

//     } catch (error) {
//       console.log("API Error:", error);
//       console.log("Response:", error.response);
//     }
//   };

//   verifyPayment();
// }, [navigate, params]);

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div
//         className="card shadow-lg border-0 text-center p-5"
//         style={{ maxWidth: "500px", width: "100%" }}
//       >
//         <div className="display-1 text-success mb-3">✅</div>

//         <h2 className="fw-bold text-success">
//           Payment Successful!
//         </h2>

//         <p className="text-muted mt-3">
//           Your payment has been completed successfully.
//         </p>

//         <div className="spinner-border text-success mt-3"></div>

//         <p className="mt-3">
//           Redirecting to <strong>Purchased Books...</strong>
//         </p>
//       </div>
//     </div>
//   );
// }
console.log("PaymentSuccess mounted");
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  console.log("✅ PaymentSuccess component rendered");

  useEffect(() => {
    console.log("✅ useEffect started");

    const verifyPayment = async () => {
      const session_id = params.get("session_id");

      console.log("Session ID:", session_id);

      try {
        const me = await api.get("/me/");
        console.log(me.data);
        console.log("Before API call");

        const res = await api.post("/payment-success/", {
          session_id,
        });

        console.log("API Response:", res.data);

        setTimeout(() => navigate("/activities"), 3000);
      } catch (err) {
        console.error("API Error:", err);
        console.error(err.response);
      }
    };

    verifyPayment();
  }, [navigate, params]);

  return( <div><h1>Payment Success Page</h1></div>);
}