import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Book Details</h2>
      <p>Book ID: {id}</p>
    </div>
  );
}