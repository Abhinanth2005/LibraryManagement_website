

export const getBooks = async () => {
  const res = await fetch(
    "https://openlibrary.org/search.json?q=programming"
  );
  const data = await res.json();

  return data.docs.slice(0, 20).map((item, index) => ({
    id: index + 1,            
    key: item.key,          
    title: item.title,
    author: item.author_name?.[0] || "Unknown",
    image: item.cover_i
      ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
      : "https://via.placeholder.com/150",
    status: Math.random("") > 0.5 ? "Available" : "Issued",
    price: Math.floor(Math.random() * 500) + 200,

  
  }));
};

// export const getBooks = async () => {
//   const stored = localStorage.getItem("books");
//   if (stored) {
//     return JSON.parse(stored);
//   }

//   const res = await fetch("https://openlibrary.org/search.json?q=programming");
//   const data = await res.json();

//   const books = data.docs.slice(0, 20).map((item) => ({
//     key: item.key, // ✅ UNIQUE ID
//     title: item.title,
//     author: item.author_name?.[0] || "Unknown",
//     image: item.cover_i
//       ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
//       : "https://via.placeholder.com/150",
//     price: Math.floor(Math.random() * 500) + 200,
//     status: "Available", // Available | Issued | Purchased
//     borrowedTill: null,
//     borrower: null,
//     buyer: null,
//   }));

//   localStorage.setItem("books", JSON.stringify(books));
//   return books;
// };

