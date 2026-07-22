export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small>
              © {new Date().getFullYear()} Library Management System
            </small>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <small>
              contact +91 5566889899
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}