

import { getMyLibrary } from "../utils/libraryStorage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    setItems(getMyLibrary());
  }, []);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleConfirmReturn = () => {
    const updated = items.filter(
      (item) => item.bookId !== selectedBook.bookId
    );

    localStorage.setItem("myLibrary", JSON.stringify(updated));
    setItems(updated);

    alert(`"${selectedBook.title}" returned successfully`);

    setShowModal(false);
    setSelectedBook(null);
  };



  const borrowed = items.filter(i => i.type === "BORROWED");
  const purchased = items.filter(i => i.type === "PURCHASED");

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold text-primary mb-2">Borrowed Books</h2> <hr />
      {borrowed.map(b => (
        // <div key={b.bookId}>{b.title} <div></div></div>
        <div className="">

          <div className="row" key={b.bookId}>
            <div className="col-3">
              <img
                src={b.image}
                className="card-img-top p-2 ms-5 mb-2"
                style={{ height: "200px", width: "150px" }}
              />
            </div>
            <div className="col-9 d-flex align-items-center my-2 pb-2 ">
              <div className="ms-2 ps-2 me-2" style={{ width: "70%" }}><h3 className="ms-2"><strong>{b.title}</strong>  by {b.author}</h3>
                <p className="text-lowercase text-lowercase">{b.type} on {b.timestamp}</p>
                <div className="d-flex justify-content-end">
                  <button className=" btn btn-danger justify-content-end ms-3" onClick={() => handleOpenModal(b)}>return</button>
                  {showModal && selectedBook && (
                    <div
                      className="modal fade show d-block mt-5 px-3"
                      tabIndex="-1"
                      // style={{ width:"600px",height:"450px"}}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">

                          <div className="modal-header">
                            <h3 className="text-center">Return Book</h3>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>

                          <div className="modal-body">
                            <div className="text-center mb-3">
                              <img
                                src={selectedBook.image}
                                style={{ height: "150px" }}
                                alt="book image"
                              />
                            </div>

                            <h5><strong>Title:</strong> {selectedBook.title}</h5>
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            <p>
                              <strong>Borrowed On:</strong>{" "}
                              {selectedBook.timestamp}
                            </p>

                            <p className="text-danger fw-bold mt-3">
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
                </div></div>

            </div>
            <hr />
          </div>

        </div>


      ))}


      <hr />
      <h2 className="mt-4  text-success text-center fw-bold">Purchased Books</h2>
      <hr />
      {purchased.map(p => (
        // <div key={p.bookId}><h4>{p.title}</h4>
        <div className="">

          <div className="row" key={p.bookId}>
            <div className="col-3">
              <img
                src={p.image}
                className="card-img-top p-2"
                style={{ height: "200px", width: "150px" }}
              />
            </div>
            <div className="col-9 d-flex align-items-center my-2 pb-2 ">
              <div className="ms-2 ps-2" style={{ width: "70%" }}><h3 className="ms-2"><strong>{p.title}</strong>  by {p.author}</h3>
                <p className="text-lowercase text-lowercase">{p.type} on {p.timestamp}</p>
                <div className="d-flex justify-content-end">
                </div></div>

            </div>
            <hr />
          </div>

        </div>
      ))}

      <br />
      <br />
      <h5>Want any help?  <a href="" onClick={() => navigate(`/contacts`)}>click here</a></h5>
      <br />
    </div>
  );
}



