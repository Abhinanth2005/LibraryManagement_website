import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import BookList from "../components/books/BookList";
import CategoryChart from "../components/books/CategoryChart";
import Loader from "../components/common/Loader";
import BookForm from "../components/books/BookForm";
import { useNavigate } from "react-router-dom";
import StatusChart from "../components/books/StatusChart";



export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

useEffect(() => {
  if (!localStorage.getItem("user")) {
    navigate("/login", { replace: true });
  }
}, [navigate]);


  useEffect(() => {
    getBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <div className="card p-3 mb-4 shadow-sm">
        <h4 className="mb-3 text-primary " style={{ textShadow: '1px 1px 4px gray' }}>Library Books</h4>

        <input
          className="form-control"
          placeholder="Search books..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CategoryChart books={filteredBooks} />

      {/* <BookForm onSave={(b) => setBooks([...books, { ...b, id: Date.now() }])} /> */}
      <StatusChart books={filteredBooks} />


      <BookList books={filteredBooks} />
      
  
    </div>
  );
}