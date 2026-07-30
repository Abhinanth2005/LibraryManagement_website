import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, returnBook } from "../services/bookService";

export default function ReturnBook() {

    const { id } = useParams();

    const [book, setBook] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const loadBook = async () => {

            const data = await getBook(id);

            setBook(data);

        };

        loadBook();

    }, [id]);

    const handleReturn = async () => {

        try {

            await returnBook(book.id);

            alert("Book returned successfully.");

            navigate("/books");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to return book."
            );

        }

    };

    if (!book) return <p>Loading...</p>;

    return (
        <div className="container mt-4">

            <div className="card p-4">

                <img
                    src={book.cover}
                    style={{
                        width:200,
                        height:250,
                        objectFit:"cover"
                    }}
                />

                <h3>{book.title}</h3>

                <button
                    className="btn btn-success mt-3"
                    onClick={handleReturn}
                >
                    Confirm Return
                </button>

            </div>

        </div>
    );

}