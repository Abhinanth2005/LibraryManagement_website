import Footer from "./Footer";

export default function StickyLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">{children}</div>
      <Footer />
    </div>
  );
}