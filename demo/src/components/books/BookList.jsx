import { useNavigate } from "react-router-dom";


export default function BookList({ books }) {
  const navigate = useNavigate();

  return (
    <div className="row">
      {books.map((book) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={book.id}>
          <div className="card h-100 shadow-sm">
            <img
              src={book.image}
              className="card-img-top p-2"
              style={{ height: "220px", objectFit: "contain" }}
            />

            <div className="card-body">
              <h6 className="card-title text-truncate">{book.title}</h6>
              <p className="text-muted small mb-2">{book.author}</p>
              <p className="fw-bold text-dark mb-1">₹{book.price}</p>


              <span
                className={`badge ${book.status === "Available"
                  ? "bg-success"
                  : "bg-danger"
                  }`}
              >
                {book.status}
              </span>
              {book.status === "Available" && (
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(`/borrow/${encodeURIComponent(book.key)}`)}
                  >
                    Read
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => navigate(`/buy/${encodeURIComponent(book.key)}`)}
                  >
                    Buy
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

