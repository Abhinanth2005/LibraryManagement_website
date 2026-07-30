

import api from "./api";

export const getBooks = async (params = {}) => {

    const response = await api.get("/books/", {
        params,
    });

    return response.data;
};

export const getBook = async (id) => {

    const response = await api.get(`/books/${id}/`);

    return response.data;
};

export const getCategories = async () => {

    const response = await api.get("/categories/");

    return response.data;
};

export const getDashboard = async () => {

    const response = await api.get("/dashboard/");

    return response.data;
};

export const borrowBook = async (id) => {

    const response = await api.post(`/books/${id}/borrow/`);

    return response.data;
};

export const returnBook = async (id) => {

    const response = await api.post(`/books/${id}/return/`);

    return response.data;
};

export const buyBook = async (id) => {

    const response = await api.post(`/books/${id}/buy/`);

    return response.data;
};

export const getMyBorrowedBooks = async () => {

    const response = await api.get("/my-borrowed/");

    return response.data;
};

export const getMyPurchasedBooks = async () => {

    const response = await api.get("/my-purchases/");

    return response.data;
};

export const loginUser = async (data) => {

    const response = await api.post("/login/", data);

    return response.data;
};

export const logoutUser = async () => {

    const response = await api.post("/logout/");

    return response.data;
};

export const registerUser = async (data) => {

    const response = await api.post("/register/", data);

    return response.data;

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

