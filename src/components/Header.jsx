import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogoutBtn, Container } from './index.js';
import Logo from './Logo';

const Header = () => {
  const authStatus = useSelector((state) => state.auth?.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: "All posts", slug: '/all-posts', active: authStatus },
    { name: "Add posts", slug: '/add-posts', active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-gray-500 relative">
      <Container>
        <nav className="flex items-center justify-between relative">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Hamburger button */}
          <button
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md mr-2 text-white hover:bg-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`flex-col sm:flex-row sm:flex ml-auto gap-2 ${
              isMobileMenuOpen ? 'flex' : 'hidden'
            } sm:gap-2 sm:items-center bg-gray-500 sm:bg-transparent absolute sm:static top-full left-0 w-full sm:w-auto p-4 sm:p-0 z-10`}
          >
            {navItems.map((item) =>
              item.active && (
                <li key={item.slug}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full w-full text-left sm:w-auto sm:text-center"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate(item.slug);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
