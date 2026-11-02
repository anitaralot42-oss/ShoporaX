
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

        {/* Copyright */}
        <p className="mb-2 mb-md-0">
          © {new Date().getFullYear()} ShoporaX. All rights reserved.
        </p>

        {/* Footer Links */}
        <div className="d-flex gap-3">
          <Link to="/about" className="text-light text-decoration-none">About Us</Link>
          <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
          <Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link>
        </div>

      </div>
    </footer>
  )
}

export default Footer
