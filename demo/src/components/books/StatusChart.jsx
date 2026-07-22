export default function StatusBarChart({ books }) {
  const total = books.length;

  const availableCount = books.filter(
    (b) => b.status === "Available"
  ).length;

  const issuedCount = books.filter(
    (b) => b.status === "Issued"
  ).length;

  const availablePercent = total
    ? Math.round((availableCount / total) * 100)
    : 0;

  const issuedPercent = total
    ? Math.round((issuedCount / total) * 100)
    : 0;

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5 className="mb-4 text-primary">
        Book Availability Status
      </h5>

    
      <div className="mb-3">
        <div className="d-flex justify-content-between mb-1">
          <strong className="text-success">Available</strong>
          <span>{availablePercent}%</span>
        </div>
        <div className="progress" style={{ height: "18px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${availablePercent}%` }}
          />
        </div>
      </div>

    
      <div>
        <div className="d-flex justify-content-between mb-1">
          <strong className="text-danger">Issued</strong>
          <span>{issuedPercent}%</span>
        </div>
        <div className="progress" style={{ height: "18px" }}>
          <div
            className="progress-bar bg-danger"
            style={{ width: `${issuedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
