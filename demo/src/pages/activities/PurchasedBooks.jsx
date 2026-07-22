export default function PurchasedBooks({ books }) {return(<div><h1>purchased</h1></div>)}
// export default function PurchasedBooks({ books }) {
//   const purchasedBooks = books.filter(
//     (b) => b.status === "Purchased"
//   );

//   return (
//     <>
//       {purchasedBooks.length === 0 ? (
//         <p className="text-muted">No purchases yet</p>
//       ) : (
//         <div className="row">
//           {purchasedBooks.map((book) => (
//             <div className="col-md-4 mb-3" key={book.id}>
//               <div className="card border-success shadow-sm">
//                 <div className="card-body">
//                   <h6>{book.title}</h6>
//                   <p className="small text-muted">{book.author}</p>
//                   <span className="badge bg-success">
//                     Purchased on {book.purchasedOn}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// export default function PurchasedBooks({ books }) {
//   if (!books) return <p>Loading...</p>;

//   const purchased = books.filter(
//     (b) => b.status === "Purchased"
//   );

//   return (
//     <div className="container mt-4">
//       <h4>Purchased Books</h4>

//       {/* {purchased.length === 0 ? (
//         <p className="text-muted">No purchases</p>
//       ) : (
//         purchased.map((book) => (
//           <div key={book.id} className="card mb-2 p-2">
//             <strong>{book.title}</strong>
//           </div>
//         ))
//       )} */}
//     </div>
//   );
// }
