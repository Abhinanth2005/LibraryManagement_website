import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookList({ books = [] }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      <div className="row">
        {books.map((book) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.cover}
                alt={book.title}
                className="card-img-top p-2 mt-4"
                style={{
                  height: "220px",
                  objectFit: "contain",
                }}
              />

              <div className="card-body">
                <h6 className="card-title text-truncate">{book.title}</h6>

                <p className="text-muted small">{book.author}</p>

                <p className="small">Category: {book.category_name}</p>

                <span
                  className={`badge ${
                    book.status === "Available" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {book.status}
                </span>

                <div className="text-center ">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => {
                      setSelectedBook(book);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>
                </div>

                {book.status === "Available" && (
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    {book.is_borrowed ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => navigate(`/return/${book.id}`)}
                      >
                        Return
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm px-2"
                          onClick={() => navigate(`/borrow/${book.id}`)}
                        >
                          Borrow
                        </button>

                        <button
                          className="btn btn-danger btn-sm px-3"
                          onClick={() => navigate(`/buy/${book.id}`)}
                        >
                          Buy
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedBook && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title fw-bold">{selectedBook.title}</h4>

                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <img
                        src={selectedBook.cover}
                        className="img-fluid rounded shadow"
                        alt={selectedBook.title}
                      />
                    </div>

                    <div className="col-md-8">
                      <p>
                        <strong>Author:</strong> {selectedBook.author}
                      </p>

                      <p>
                        <strong>Category:</strong> {selectedBook.category_name}
                      </p>

                      <p>
                        <strong>Price:</strong> ₹{selectedBook.price}
                      </p>

                      <p>
                        <strong>Available:</strong> {selectedBook.available}
                      </p>

                      <p>
                        <strong>Status:</strong>
                        <span
                          className={`badge ms-2 ${
                            selectedBook.status === "Available"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {selectedBook.status}
                        </span>
                      </p>

                      <hr />

                      <p>
                        <strong>Publisher:</strong> {selectedBook.publisher}
                      </p>
                      <p>
                        <strong>Published Year:</strong>{" "}
                        {selectedBook.published_year}
                      </p>

                      <p className="mt-3">
                        <strong>Description:</strong>
                        <br />
                        {selectedBook.description ||
                          "No description available."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {selectedBook.status === "Available" &&
                    (selectedBook.is_borrowed ? (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setShowModal(false);
                          navigate(`/return/${selectedBook.id}`);
                        }}
                      >
                        Return
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setShowModal(false);
                            navigate(`/borrow/${selectedBook.id}`);
                          }}
                        >
                          Borrow
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setShowModal(false);
                            navigate(`/buy/${selectedBook.id}`);
                          }}
                        >
                          Buy
                        </button>
                      </>
                    ))}

                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}
    </>
  );
}
