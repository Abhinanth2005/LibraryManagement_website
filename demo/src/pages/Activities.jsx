// import {
//   getMyBorrowedBooks,
//   getMyPurchasedBooks,
//   returnBook,
// } from "../services/bookService";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Activities() {
//   // const [borrowed, setBorrowed] = useState([]);
//   const [purchased, setPurchased] = useState([]);
//   const [activeTab, setActiveTab] = useState("borrowed");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const navigate = useNavigate();
  



//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const borrowedData = await getMyBorrowedBooks();
//         const purchasedData = await getMyPurchasedBooks();

//         setBorrowed(borrowedData);
//         setPurchased(purchasedData);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     loadData();
//   }, []);

//   const handleOpenModal = (book) => {
//     setSelectedBook(book);
//     setShowModal(true);
//   };

//   const handleConfirmReturn = async () => {
//     try {
//       await returnBook(selectedBook.book.id);

//       alert("Book returned successfully.");

//       setBorrowed(borrowed.filter((item) => item.id !== selectedBook.id));

//       setShowModal(false);
//       setSelectedBook(null);
//     } catch (error) {
//       alert(error.response?.data?.message || "Unable to return book.");
//     }
//   };

// const borrowed = books.filter(book => book.is_borrowed);
//   // const purchased = items.filter(i => i.type === "PURCHASED");

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center fw-bold text-primary mb-2">Borrowed Books</h2>{" "}
//       <hr />
//       <div className="text-center mb-4">
//         <button
//           className={`btn me-2 ${
//             activeTab === "borrowed" ? "btn-primary" : "btn-outline-primary"
//           }`}
//           onClick={() => setActiveTab("borrowed")}
//         >
//           Borrowed Books ({borrowed.length})
//         </button>

//         <button
//           className={`btn ${
//             activeTab === "purchased" ? "btn-success" : "btn-outline-success"
//           }`}
//           onClick={() => setActiveTab("purchased")}
//         >
//           Purchased Books ({purchased.length})
//         </button>
//       </div>
//       {activeTab === "borrowed" && (
//         <div>
//           {borrowed.map((b) => (
//             // <div key={b.bookId}>{b.title} <div></div></div>
//             <div className="">
//               <div className="row" key={b.bookId}>
//                 <div className="col-3">
//                   <img
//                     src={b.image}
//                     className="card-img-top p-2 ms-5 mb-2"
//                     style={{ height: "200px", width: "150px" }}
//                   />
//                 </div>
//                 <div className="col-9 d-flex align-items-center my-2 pb-2 ">
//                   <div className="ms-2 ps-2 me-2" style={{ width: "70%" }}>
//                     <h3 className="ms-2">
//                       <strong>{b.title}</strong> by {b.author}
//                     </h3>
//                     <p className="text-lowercase text-lowercase">
//                       {b.type} on {b.timestamp}
//                     </p>
//                     <div className="d-flex justify-content-end">
//                       <button
//                         className=" btn btn-danger justify-content-end ms-3"
//                         onClick={() => handleOpenModal(b)}
//                       >
//                         return
//                       </button>
//                       {showModal && selectedBook && (
//                         <div
//                           className="modal fade show d-block mt-5 px-3"
//                           tabIndex="-1"
//                           // style={{ width:"600px",height:"450px"}}
//                         >
//                           <div className="modal-dialog">
//                             <div className="modal-content">
//                               <div className="modal-header">
//                                 <h3 className="text-center">Return Book</h3>
//                                 <button
//                                   type="button"
//                                   className="btn-close"
//                                   onClick={() => setShowModal(false)}
//                                 ></button>
//                               </div>

//                               <div className="modal-body">
//                                 <div className="text-center mb-3">
//                                   <img
//                                     src={selectedBook.image}
//                                     style={{ height: "150px" }}
//                                     alt="book image"
//                                   />
//                                 </div>

//                                 <h5>
//                                   <strong>Title:</strong> {selectedBook.title}
//                                 </h5>
//                                 <p>
//                                   <strong>Author:</strong> {selectedBook.author}
//                                 </p>
//                                 <p>
//                                   <strong>Borrowed On:</strong>{" "}
//                                   {selectedBook.timestamp}
//                                 </p>

//                                 <p className="text-danger fw-bold mt-3">
//                                   Are you sure you want to return this book?
//                                 </p>
//                               </div>

//                               <div className="modal-footer">
//                                 <button
//                                   className="btn btn-secondary"
//                                   onClick={() => setShowModal(false)}
//                                 >
//                                   Cancel
//                                 </button>
//                                 <button
//                                   className="btn btn-danger"
//                                   onClick={handleConfirmReturn}
//                                 >
//                                   Confirm Return
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <hr />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {activeTab === "purchased" && (
//         <div>
//           <h2 className="mt-4  text-success text-center fw-bold">
//             Purchased Books
//           </h2>
//           <hr />
//           {purchased.map((p) => (
//             // <div key={p.bookId}><h4>{p.title}</h4>
//             <div className="">
//               <div className="row" key={p.bookId}>
//                 <div className="col-3">
//                   <img
//                     src={p.image}
//                     className="card-img-top p-2"
//                     style={{ height: "200px", width: "150px" }}
//                   />
//                 </div>
//                 <div className="col-9 d-flex align-items-center my-2 pb-2 ">
//                   <div className="ms-2 ps-2" style={{ width: "70%" }}>
//                     <h3 className="ms-2">
//                       <strong>{p.title}</strong> by {p.author}
//                     </h3>
//                     <p className="text-lowercase text-lowercase">
//                       {p.type} on {p.timestamp}
//                     </p>
//                     <div className="d-flex justify-content-end"></div>
//                   </div>
//                 </div>
//                 <hr />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <br />
//       <br />
//       <h5>
//         Want any help?{" "}
//         <a href="" onClick={() => navigate(`/contacts`)}>
//           click here
//         </a>
//       </h5>
//       <br />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, returnBook } from "../services/bookService";

export default function Activities() {
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("borrowed");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data.results || data);
      } catch (error) {
        console.log(error);
      }
    };

    loadBooks();
  }, []);

  const borrowed = books.filter((book) => book.is_borrowed);
  const purchased = books.filter((book) => book.is_purchased);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleConfirmReturn = async () => {
    try {
      await returnBook(selectedBook.id);

      alert("Book returned successfully.");

      setBooks((prev) =>
        prev.map((book) =>
          book.id === selectedBook.id
            ? {
                ...book,
                is_borrowed: false,
                available: book.available + 1,
                status: "Available",
              }
            : book
        )
      );

      setShowModal(false);
      setSelectedBook(null);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to return book.");
    }
  };

  return (
    <div className="container mt-4">
      

      <div className="text-center mb-4">
        <button
          className={`btn me-2 ${
            activeTab === "borrowed"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("borrowed")}
        >
          Borrowed({borrowed.length})
        </button>

        <button
          className={`btn ${
            activeTab === "purchased"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setActiveTab("purchased")}
        >
          Purchased ({purchased.length})
        </button>
      </div>
      <hr />

      {activeTab === "borrowed" && (
        <>
        <h2 className="text-center text-decoration-underline text-warning mb-3">Borrowed Books</h2>
         <hr />
          {borrowed.length === 0 ? (
            <h5 className="text-center text-muted">
              No borrowed books.
            </h5>
          ) : (
            borrowed.map((b) => (
              <div key={b.id}>
                <div className="row">
                  <div className="col-3">
                    <img
                      src={b.cover}
                      className="card-img-top p-2 ms-5 mb-2"
                      style={{ height: "200px", width: "150px" }}
                      alt={b.title}
                    />
                  </div>

                  <div className="col-9 d-flex align-items-center my-2 pb-2">
                    <div className="ms-2 ps-2 me-2" style={{ width: "70%" }}>
                      <h3 className="ms-2">
                        <strong>{b.title}</strong> by {b.author}
                      </h3>

                      <p>
                        Borrowed on{" "}
                        {new Date(b.created_at).toLocaleDateString()}
                      </p>

                      <div className="d-flex justify-content-end">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleOpenModal(b)}
                        >
                          Return
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>
              </div>
            ))
          )}
        </>
      )}

      {activeTab === "purchased" && (
        <>
         <h2 className="text-center text-decoration-underline text-success mb-3">Borrowed Books</h2> <hr />
          {purchased.length === 0 ? (
            <h5 className="text-center text-muted">
              No purchased books.
            </h5>
          ) : (
            purchased.map((p) => (
              <div key={p.id}>
                <div className="row">
                  <div className="col-3">
                    <img
                      src={p.cover}
                      className="card-img-top p-2 ms-5 mb-3"
                      style={{ height: "200px", width: "150px" }}
                      alt={p.title}
                    />
                  </div>

                  <div className="col-9 d-flex align-items-center my-2 pb-2">
                    <div className="ms-2 ps-2" style={{ width: "70%" }}>
                      <h3 className="ms-2">
                        <strong>{p.title}</strong> by {p.author}
                      </h3>

                      <p>
                        Purchased on{" "}
                        {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <hr />
                </div>
              </div>
            ))
          )}
        </>
      )}

      {showModal && selectedBook && (
        <div
          className="modal fade show d-block mt-5 px-3"
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h3>Return Book</h3>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">

                <div className="text-center mb-3">
                  <img
                    src={selectedBook.cover}
                    style={{ height: "150px" }}
                    alt={selectedBook.title}
                  />
                </div>

                <h5>
                  <strong>Title:</strong> {selectedBook.title}
                </h5>

                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>

                <p className="text-danger fw-bold">
                  Are you sure you want to return this book?
                </p>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={handleConfirmReturn}
                >
                  Confirm Return
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      <br />

      <h5>
        Want any help?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/contacts");
          }}
        >
          Click here
        </a>
      </h5>
    </div>
  );
}