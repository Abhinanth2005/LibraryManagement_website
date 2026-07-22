export default function CategoryChart({ books }) {
  const categories = {};

  books.forEach((b) => {
    categories[b.author] = (categories[b.author] || 0) + 1;
  });

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4 className="mb-3 text-primary" style={{textShadow:'1px 1px 4px gray'}}>Books by Author</h4>

      <ul className="list-group">
        {Object.entries(categories).map(([cat, count]) => (
          <li
            key={cat}
            className="list-group-item d-flex justify-content-between"
          >
            <span>{cat}</span>
            <span className="badge bg-primary">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}