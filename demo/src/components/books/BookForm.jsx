// import { useState } from "react";

// export default function BookForm({ onSave }) {
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     image: "",
//     status: "Available",
//   });

//   const submitHandler = (e) => {
//     e.preventDefault();
//     onSave(book);
//     setBook({ title: "", author: "", image: "", status: "Available" });
//   };

//   return (
//     <div className="card p-3 mb-4 shadow-sm">
//       <h4 className="mb-3 text-primary"  style={{textShadow:'1px 1px 4px gray'}}>Add Book</h4>

//       <form onSubmit={submitHandler}>
//         <input
//           className="form-control mb-2"
//           placeholder="Book Title"
//           value={book.title}
//           required
//           onChange={(e) => setBook({ ...book, title: e.target.value })}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Author"
//           value={book.author}
//           required
//           onChange={(e) => setBook({ ...book, author: e.target.value })}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Cover Image URL"
//           value={book.image}
//           onChange={(e) => setBook({ ...book, image: e.target.value })}
//         />

//         <select
//           className="form-select mb-3"
//           value={book.status}
//           onChange={(e) => setBook({ ...book, status: e.target.value })}
//         >
//           <option>Available</option>
//           <option>Issued</option>
//         </select>

//         <button className="btn btn-primary">Add Book</button>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function BookForm({
  onSave,
  initialData = null,
  readOnly = false,
}) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    image: "",
    status: "Available",
  });

  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [add, setAdd] = useState("")

  // const [error, setError] = useState("")
  // const [emailerror, setEmailError] = useState("")
  // const [adderror, setAddError] = useState("")
  // const handlesubmit = (e) => {
  //   e.preventDefault()
  //   var isValid = true;

  //   if (name.trim() === "") {
  //     setError("enter name please")
  //     isValid = false;
  //   }
  //   else if (!name.match(/^[a-zA-Z]/)) {
  //     setError("enter a valid name")
  //     isValid = false;
  //   }
  //   if (email.trim() === "") {
  //     setEmailError("enter  email")
  //     isValid = false;
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
  //     setEmailError("enter a valid email")
  //     isValid = false;
  //   }
  //   if(add.trim() ===""){
  //     setAddError("please enter the address")
  //   }
  //   if (isValid){
  //     alert("Message sended successfully")
  //     // form.current.reset()
  //   }
  // }

  // 🔹 Autofill when initialData is passed
  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    }
  }, [initialData]);

  const submitHandler = (e) => {
    e.preventDefault();
    onSave(book);
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4 className="mb-3 text-primary">Book Details</h4>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-2"
          placeholder="Book Title"
          value={book.title}
          disabled={readOnly}
          onChange={(e) =>
            setBook({ ...book, title: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Author"
          value={book.author}
          disabled={readOnly}
          onChange={(e) =>
            setBook({ ...book, author: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Cover Image URL"
          value={book.image}
          disabled={readOnly}
          onChange={(e) =>
            setBook({ ...book, image: e.target.value })
          }
        />

        {!readOnly && (
          <select
            className="form-select mb-3"
            value={book.status}
            onChange={(e) =>
              setBook({ ...book, status: e.target.value })
            }
          >
            <option>Available</option>
            <option>Issued</option>
          </select>
        )}

        <button className="btn btn-success">
          Confirm
        </button>
      </form>


      
    </div>
  );
}
