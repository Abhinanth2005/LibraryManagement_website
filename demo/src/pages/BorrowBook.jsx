// import { saveToMyLibrary, hasActiveBorrow } from "../utils/libraryStorage";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getBook,
    borrowBook,
} from "../services/bookService";


export default function BorrowBook() {
    // const { key } = useParams();
    // const decodedKey = decodeURIComponent(key);
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    const [bname, setNameb] = useState("")
    const [bemail, setEmailb] = useState("")
    const [phnor, setPhnor] = useState("")
    const [borrow, setBorrow] = useState("")


    const [berror, setErrorb] = useState("")
    const [bemailerror, setEmailErrorb] = useState("")
    const [bpherror, setPhErrorr] = useState("")
    const [borrowerror, setBorrowError] = useState("")






    const handleBorrow = async(e) => {
        e.preventDefault()
        var isValid = true;
        if (bname.trim() === "") {
            setErrorb("enter name")
            isValid = false;
        }
        else if (!bname.match(/^[a-zA-Z]/)) {
            setErrorb("enter a valid name")
            isValid = false;
        }
        if (bemail.trim() === "") {
            setEmailErrorb("enter  email")
            isValid = false;
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(bemail)) {
            setEmailErrorb("enter a valid email")
            isValid = false;
        }

        if (phnor.length !== 10 || phnor === "") {
            setPhErrorr("enter a valid phone number")
            isValid = false;
        }
        if (borrow === "") {
            setBorrowError("Select borrow days");
            isValid = false;
        }

        if (isValid) {

            
            
            // form.current.reset()

            // const entry = {
            //     bookId: book.id,
            //     title: book.title,
            //     author: book.author,
            //     image: book.image,
            //     type: "BORROWED",
            //     timestamp: new Date().toISOString(),

            // };


            // const data = JSON.parse(localStorage.getItem("myLibrary")) || [];

            // const alreadyBorrowed = data.some(
            //     (item) =>
            //         item.bookId === book.id &&
            //         item.type === "BORROWED"
            // );

            // if (alreadyBorrowed) {
            //     alert("You have already borrowed this book ");
            //     return;
            // }
            // else{alert(`Book "${book.title}" Borrowed successfully!`);}
            // data.push(entry);
            // localStorage.setItem("myLibrary", JSON.stringify(data));

            // navigate("/books");


            try {

    await borrowBook(book.id);

    alert("Book borrowed successfully.");

    navigate("/books");

} catch (error) {

    alert(
        error.response?.data?.message ||
        "Unable to borrow the book."
    );

}

        }



    }









    // useEffect(() => {
    //     getBooks().then(data => {
    //         setBook(data.find(b => b.key === decodedKey));
    //     });
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
        return <p className="text-center mt-5">Loading!</p>;
    }



    return (
        <div className="container mt-4 d-flex flex-column min-vh-100">
            <h2 className="text-center fw-bold text-primary">Borrow Book</h2>



            <div className="card p-3">
                <div className="d-flex justify-content-center">
                    <div>
                        <img
                            src={book.cover}
                            className="card-img-top p-2"
                            style={{ height: "250px", width: "200px" }}
                        />

                        <h5 className="ms-2"><strong></strong> {book.title}</h5>
                    </div>
                </div>
                <hr />
                <form action="" onSubmit={handleBorrow}>
                    <input
                        className="form-control mb-2"
                        placeholder="enter your Full Name"
                        value={bname} onInput={(e) => { setNameb(e.target.value) }}
                    />
                    <p className="text-danger">{berror}</p>

                    <input
                        className="form-control mb-2"
                        placeholder="enter your Email"
                        value={bemail} onInput={(e) => { setEmailb(e.target.value) }}
                    />
                    <p className="text-danger">{bemailerror}</p>

                    <input
                        className="form-control mb-2"
                        placeholder="enter your Phone Number" type="number"
                        value={phnor} onInput={(e) => { setPhnor(e.target.value) }}
                    />
                    <p className="text-danger">{bpherror}</p>

                    <select
                        className="form-control mb-3" required
                        value={borrow}
                        onChange={(e) => {
                            setBorrow(e.target.value);
                        }}
                    >
                        <option value="" disabled> Select Borrow days
                        </option>
                        <option value="15" >15 </option>
                        <option value="30">30 </option>
                        <option value="45">45 </option>
                    </select>
                    <p className="text-danger">{borrowerror}</p>

                    <p>
                        <input type="checkbox" id="agree" defaultChecked required />
                        I agree to return the book within the selected period and accept charges of ₹2 per day for late returns.<br /> I acknowledge that I am responsible for the full cost in case of damage or loss.
                    </p>

                    <button
                        className="btn btn-warning" type="submit"
                    >
                        Confirm Borrow
                    </button>
                </form>
                {/* <BookForm
                    readOnly
                    initialData={{
                        title: book.title,
                        author: book.author || "Unknown",
                        image: book.image,
                        status: "Borrowed",
                    }}
                    onSave={() => handleBorrow()}
                /> */}

            </div>
        </div>
    );
}


