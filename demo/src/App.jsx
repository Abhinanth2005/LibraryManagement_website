import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import BorrowBook from "./pages/BorrowBook";
import BuyBook from "./pages/BuyBook";
import Activities from "./pages/Activities";
import Return from "./pages/activities/Return";


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/borrow/:key" element={<BorrowBook />} />
          <Route path="/buy/:key" element={<BuyBook />} />
          {/* <Route
  path="/buy/:id"
  element={<BuyBook books={books} setBooks={setBooks} />}
/> */}


  <Route path="/contacts" element={<Return/>} />



          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />

          <Route
            path="/activities"
            element={<Activities />}
          />

        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}