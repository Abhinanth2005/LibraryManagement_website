const STORAGE_KEY = "myLibrary";

export const getMyLibrary = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveToMyLibrary = (entry) => {
  const library = getMyLibrary();
  library.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
};

export const hasActiveBorrow = (bookId) => {
  const library = getMyLibrary();
  return library.some(
    (item) =>
      item.bookId === bookId &&
      item.type === "BORROWED" &&
      new Date(item.returnDate) > new Date()
  );
};
