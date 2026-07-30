// import { saveToMyLibrary } from "../utils/libraryStorage";
import { stripePromise } from "../stripe";
import { createCheckoutSession } from "../services/paymentService";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook, buyBook } from "../services/bookService";

export default function BuyBook() {
  // const { key } = useParams();
  // const decodedKey = decodeURIComponent(key);
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [pherror, setPhError] = useState("");
  const [adderror, setAddError] = useState("");

  // useEffect(() => {
  //   getBooks().then((data) => {
  //     const found = data.find((b) => b.key === decodedKey);
  //     setBook(found);
  //   });
  // }, [decodedKey]);
  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await getBook(id);

        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadBook();
  }, [id]);

  if (!book) {
    return <p className="text-center mt-5">Loading book...</p>;
  }

  const handleCancel = () => {
    navigate("/books");
    form.current.reset();
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    var isValid = true;
    if (name.trim() === "") {
      setError("enter name");
      isValid = false;
    } else if (!name.match(/^[a-zA-Z]/)) {
      setError("enter a valid name");
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("enter  email");
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("enter a valid email");
      isValid = false;
    }

    if (address === "") {
      setAddError("enter your address");
      isValid = false;
    } else if (!address.match(/[a-zA-Z0-9.-]/)) {
      setAddError("enter a valid address");
      isValid = false;
    }

    if (phno.length !== 10 || phno === "") {
      setPhError("enter a valid phone number");
      isValid = false;
    }

    if (isValid) {
      try {
        const { url } = await createCheckoutSession(book.id);

window.location.href = url;
      } catch (error) {
        // alert("Unable to start payment.");
        console.error(error);
    console.error(error.response?.data);

    alert(error.response?.data?.error || error.message);
      }
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column min-vh-100">
      <h2 className="mb-3 fw-bold text-center text-primary">Buy Book</h2> <hr />
      <div className="card p-3">
        <div className="d-flex justify-content-center">
          <div>
            <img
              src={book.cover}
              className="card-img-top p-2"
              style={{ height: "250px", width: "200px" }}
            />

            <h5 className="ms-2">
              <strong></strong> {book.title}
            </h5>
            <p className="fw-bold ">Price: ₹{book.price}</p>
          </div>
        </div>

        <form action="" onSubmit={handleBuy}>
          <input
            className="form-control mb-2"
            placeholder="enter your Full Name"
            value={name}
            onInput={(e) => {
              setName(e.target.value);
            }}
          />
          <p className="text-danger">{error}</p>

          <input
            className="form-control mb-2"
            placeholder="enter your Email"
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="text-danger">{emailerror}</p>

          <input
            className="form-control mb-2"
            placeholder="enter your Phone Number"
            type="number"
            value={phno}
            onInput={(e) => {
              setPhno(e.target.value);
            }}
          />
          <p className="text-danger">{pherror}</p>

          <input
            className="form-control mb-2"
            placeholder="enter your Address"
            value={address}
            onInput={(e) => {
              setAddress(e.target.value);
            }}
          />
          <p className="text-danger">{adderror}</p>

          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Payment Method</label>

            <div className="border rounded p-3">
              <input type="radio" checked readOnly className="me-2" />

              <strong>Stripe Secure Checkout</strong>

              <p className="text-muted mb-0">
                Pay securely using your Credit Card, Debit Card, or UPI through
                Stripe.
              </p>
            </div>
          </div>
          <p className="text-danger"></p>

          <button className="btn btn-success mx-2" type="submit">
            pay
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
        {/* <BookForm
          readOnly
          initialData={{
            title: book.title,
            author: book.author || "Unknown",
            image: book.image,
            status: "Purchased",
          }}
          onSave={() => handleBuy()}
        /> */}
      </div>
    </div>
  );
}
