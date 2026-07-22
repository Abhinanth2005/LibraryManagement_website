// import { saveToMyLibrary } from "../utils/libraryStorage";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";


export default function BuyBook() {
  const { key } = useParams();
  const decodedKey = decodeURIComponent(key);
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phno, setPhno] = useState("")
  const [address, setAddress] = useState("")

  const [error, setError] = useState("")
  const [emailerror, setEmailError] = useState("")
  const [pherror, setPhError] = useState("")
  const [adderror, setAddError] = useState("")



  useEffect(() => {
    getBooks().then((data) => {
      const found = data.find((b) => b.key === decodedKey);
      setBook(found);
    });
  }, [decodedKey]);

  if (!book) {
    return <p className="text-center mt-5">Loading book...</p>;
  }

  const handleCancel = () => {
    navigate("/books");
    form.current.reset()
  }

  const handleBuy = (e) => {
    e.preventDefault()
    var isValid = true;
    if (name.trim() === "") {
      setError("enter name")
      isValid = false;
    }
    else if (!name.match(/^[a-zA-Z]/)) {
      setError("enter a valid name")
      isValid = false;
    }
    if (email.trim() === "") {
      setEmailError("enter  email")
      isValid = false;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("enter a valid email")
      isValid = false;
    }

    if (address === "") {
      setAddError("enter your address")
      isValid = false;
    }
    else if (!address.match(/[a-zA-Z0-9.-]/)) {
      setAddError("enter a valid address")
      isValid = false;
    }

    if (phno.length !== 10 || phno === "") {
      setPhError("enter a valid phone number")
      isValid = false;
    }

    if (isValid) {

      alert(`Book "${book.title}" purchased successfully!`);
      navigate("/books");
      // form.current.reset()
const entry2 = {
        bookId: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        type: "PURCHASED",
        timestamp: new Date().toISOString(),
      };

      const data = JSON.parse(localStorage.getItem("myLibrary")) || [];
      data.push(entry2);
      localStorage.setItem("myLibrary", JSON.stringify(data));
      
    }





  };

  return (
    <div className="container mt-4 d-flex flex-column min-vh-100">
      <h2 className="mb-3 fw-bold text-center text-primary">Buy Book</h2> <hr />

      <div className="card p-3">
        <div className="d-flex justify-content-center">
          <div>
            <img
              src={book.image}
              className="card-img-top p-2"
              style={{ height: "250px", width: "200px" }}
            />

            <h5 className="ms-2"><strong></strong> {book.title}</h5>
            <p className="fw-bold ">
              Price: ₹{book.price}
            </p>
          </div>
        </div>


        <form action="" onSubmit={handleBuy}>
          <input
            className="form-control mb-2"
            placeholder="enter your Full Name"
            value={name} onInput={(e) => { setName(e.target.value) }}
          />
          <p className="text-danger">{error}</p>

          <input
            className="form-control mb-2"
            placeholder="enter your Email"
            value={email} onInput={(e) => { setEmail(e.target.value) }}
          />
          <p className="text-danger">{emailerror}</p>

          <input
            className="form-control mb-2"
            placeholder="enter your Phone Number" type="number"
            value={phno} onInput={(e) => { setPhno(e.target.value) }}
          />
          <p className="text-danger">{pherror}</p>

          <input
            className="form-control mb-2"
            placeholder="enter your Address"
            value={address} onInput={(e) => { setAddress(e.target.value) }}
          />
          <p className="text-danger">{adderror}</p>


          <div class="radio" id="radio">
            <label for="payment" class="form-label fs-5 fw-bold">Select Payment method</label> <br />
            <label><input type="radio" name="payment" value="cod" class="fs-6" checked /> Cash on Delivery</label><br />
            <label><input type="radio" name="payment" value="card" class="fs-6" disabled /> Credit/Debit Card</label> <br />
            <label><input type="radio" name="payment" value="upi" class="fs-6" disabled /> UPI</label>
          </div>
          <p className="text-danger"></p>

          <button className="btn btn-success mx-2" type="submit">
            Confirm Purchase
          </button>
          <button className="btn btn-danger" type="cancel" onClick={handleCancel}>Cancel</button>
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

